import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../firebase";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import BottomTab from "../Components/BottomTab";

const FeedScreen = ({ navigation }) => {
  const [template, setTemplate] = React.useState(null);
  const [Posts, setPosts] = React.useState([]);
  const [likePressed, setLikePressed] = React.useState(false);
  let arr = new Array(tagList.length);
  arr.fill(false, 0, tagList.length);
  const [selectedTags, setSelectedTags] = React.useState(arr);

  const [currentLoggedInUser, setCurrentLoggedInUser] = React.useState(null);
  React.useEffect(() => {
    let mounted = true;
    const db = firebase.firestore();
    //get where array contains

    if (mounted) {
      db.collection("posts").onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }

    return () => (mounted = false);
  }, [likePressed]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ backgroundColor: "#201F32", flex: 1 }}>
      <View style={{ backgroundColor: "#201F32", flex: 1, marginTop: 50 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
        {/* {template && <UploadPost navigation={navigation} template={template} />}
        {!template && <UploadPost navigation={navigation} />} */}

        <ScrollView>
          <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          {Posts.filter((post) => {
            // console.log(post.tags);
            if (JSON.stringify(selectedTags) == JSON.stringify(arr)) {
              return post;
            }

            if (JSON.stringify(selectedTags) == JSON.stringify(post.tags)) {
              return post;
            }
          }).map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </ScrollView>
      </View>
      <BottomTab />
    </View>
  );
};

const Post = ({ post }) => {
  console.log("Posts", post);
  return (
    <View
      style={{
        marginTop: "2%",
        marginBottom: "2%",
        marginHorizontal: "2%",
        borderWidth: 1,
        borderColor: "#6F6CBD",
        borderRadius: 10,
        backgroundColor: "#130A01",
        padding: "5%",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: post.profile_picture }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 2,
            borderColor: "#6F6CBD",
          }}
        />

        <View style={{ marginLeft: "2%" }}>
          <Text style={{ fontSize: 20, color: "white" }}>{post.username}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 18, marginTop: "4%", color: "white" }}>
        {post.caption}
      </Text>
      {post.imageURL && (
        <Image
          style={{ width: 350, height: 300, marginTop: "5%" }}
          source={{ uri: post.imageURL }}
        />
      )}
      {post.topCaption != "" && (
        <Text
          style={{
            position: "absolute",
            fontWeight: "900",
            fontSize: 20,
            top: 130,
            alignSelf: "center",
            color: "white",
            textShadowColor: "black",
            textShadowRadius: 5,
          }}
        >
          {post.topCaption}
        </Text>
      )}
      {post.bottomCaption != "" && (
        <Text
          style={{
            position: "absolute",
            fontWeight: "900",
            fontSize: 20,
            top: 370,
            alignSelf: "center",
            color: "white",
            textShadowColor: "black",
            textShadowRadius: 5,
          }}
        >
          {post.bottomCaption}
        </Text>
      )}
      <PostReaction post={post} />
    </View>
  );
};
const PostReaction = ({ post }) => {
  const [up, setUp] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const currentValue = React.useState(new Animated.Value(0))[0];
  const handleUp = () => {
    setUp(!up);
    if (!up) {
      setVisible(true);
    }
    console.log(post);
    if (!up) {
      Animated.spring(currentValue, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(currentValue, {
          toValue: 0,
          friction: 2,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
        });
      });
    }
    const db = firebase.firestore();
    db.collection("users")
      .doc(post.op_email)
      .collection("posts")
      .doc(post.id)
      .update({
        up: !up
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  const handledown = () => {
    setDown(!down);
    if (!down) {
      setVisible2(true);
    }
    if (!down) {
      Animated.spring(currentValue, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(currentValue, {
          toValue: 0,
          friction: 2,
          useNativeDriver: true,
        }).start(() => {
          setVisible2(false);
        });
      });
    }
    const db = firebase.firestore();
    db.collection("users")
      .doc(post.op_email)
      .collection("posts")
      .doc(post.id)
      .update({
        down: !down
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginTop: "2%",
          justifyContent: "space-around",
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={handleUp}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          {visible && (
            <AnimatedImage
              style={[
                {
                  position: "absolute",
                  top: post.imageURL ? -220 : -100,
                  alignSelf: "center",
                  left: 80,
                  zIndex: 3,
                  height: 100,
                  width: 100,
                  transform: [
                    {
                      scale: currentValue,
                    },
                  ],
                },
              ]}
              source={require("../assets/up_clicked.png")}
            />
          )}
          {up ? (
            <>
              <Image
                source={require("../assets/up_clicked.png")}
                style={{ height: 30, width: 30 }}
              />
            </>
          ) : (
            <>
              <Image
                source={require("../assets/up_unclicked.png")}
                style={{ height: 30, width: 30 }}
              />
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handledown}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          {visible2 && (
            <AnimatedImage
              style={[
                {
                  position: "absolute",
                  top: post.imageURL ? -220 : -100,
                  alignSelf: "center",
                  left: -100,
                  zIndex: 3,
                  height: 100,
                  width: 100,
                  transform: [
                    {
                      scale: currentValue,
                    },
                  ],
                },
              ]}
              source={require("../assets/down_clicked.png")}
            />
          )}
          {down ? (
            <Image
              source={require("../assets/down_clicked.png")}
              style={{ height: 30, width: 30 }}
            />
          ) : (
            <Image
              source={require("../assets/down_unclicked.png")}
              style={{ height: 30, width: 30 }}
            />
          )}
        </TouchableOpacity>
      </View>
      {(up || down) && (
        <View
          style={{
            flexDirection: "row",

            justifyContent: "space-around",
            marginTop: 0,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "orange" }}>({post.up.length})</Text>
          <Text style={{ color: "orange" }}>({post.down.length})</Text>
        </View>
      )}
    </View>
  );
};

const UploadPost = ({ navigation, template }) => {
  return (
    <View style={{}}>
      <Header navigation={navigation} />
      <AppForm navigation={navigation} template={template} />
    </View>
  );
};

const Header = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          name="left"
          size={21}
          color="#6F6CBD"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>Donation Page</Text>
      <Text></Text>
    </SafeAreaView>
  );
};

const AppForm = ({ navigation, template }) => {
  const validationSchema = Yup.object().shape({
    caption: Yup.string().max(
      2000,
      "Caption must not be over 2000 characters!"
    ),
  });

  const [topCaption, setTopCaption] = React.useState(
    template?.topCaption || ""
  );
  const [bottomCaption, setBottomCaption] = React.useState(
    template?.bottomCaption || ""
  );
  const [imageURI, setImageURI] = React.useState(template?.imageURI || null);

  const [thumbnail, setThumbnail] = React.useState(imageURI);

  const [currentLoggedInUser, setCurrentLoggedInUser] = React.useState(null);
  const getUserCredentials = async () => {
    const user = await firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
      .doc(user.email)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          //   console.log("Document data:", doc.data());
          setCurrentLoggedInUser(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  React.useEffect(() => {
    getUserCredentials();
  }, []);

  const UploadPostToFirebase = async (
    imageURL,
    caption,
    tags,
    topCaption,
    bottomCaption
  ) => {
    const db = firebase.firestore();
    db.collection("posts")
      .add({
        imageURL: imageURL,
        caption: caption,
        tags: tags,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        profile_picture: currentLoggedInUser.profile_picture,
        username: currentLoggedInUser.username,
        topCaption: topCaption,
        bottomCaption: bottomCaption,
        op_email: firebase.auth().currentUser.email,
        up: [],
        down: [],
        rofl: [],
      })
      .then(() => {
        console.log("Document successfully uploaded!");
        navigation.goBack();
      })
      .catch((error) => console.log("baal", error));
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", result.uri, true);
          xhr.send(null);
        });
        const metadata = { contentType: "image/jpg" };
        const current = new Date().toLocaleTimeString();
        const postedby = firebase.auth().currentUser.email;
        const imgRef = firebase
          .storage()
          .ref()
          .child(`${postedby}at${current}`);

        await imgRef.put(blob, metadata);

        // We're done with the blob, close and release it
        blob.close();

        // Image permanent URL

        const imageURL = await imgRef.getDownloadURL();
        setThumbnail(imageURL);
        console.log(imageURL);
      }
    } catch (error) {
      console.log("error reading image", error);
    }
  };
  const [showdropdown, setShowdropdown] = React.useState(false);

  return (
    <View>
      <Formik
        initialValues={{ caption: "" }}
        onSubmit={(values) => {
          UploadPostToFirebase(
            thumbnail,
            values.caption,
            selectedTags,
            topCaption,
            bottomCaption
          );
        }}
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
          handleBlur,
        }) => (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  marginTop: 20,
                  marginHorizontal: 30,
                  height: "100%",
                  maxWidth: "100%",
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderRadius: 15,
                  borderColor: "#6F6CBD",
                }}
              >
                <TextInput
                  name="caption"
                  placeholder="Add a post caption"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor={"#6F6CBD"}
                  style={{
                    color: "#6F6CBD",
                    fontSize: 18,
                    marginVertical: 15,
                    marginHorizontal: 10,
                  }}
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                />
                {thumbnail && (
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={{ uri: thumbnail }}
                      style={{ width: 250, height: 250 }}
                    />
                    {topCaption != "" && (
                      <Text
                        style={{
                          position: "absolute",
                          fontWeight: "900",
                          fontSize: 14,
                          top: 10,
                          alignSelf: "center",
                          color: "white",
                          textShadowColor: "black",
                          textShadowRadius: 5,
                        }}
                      >
                        {topCaption}
                      </Text>
                    )}
                    {bottomCaption != "" && (
                      <Text
                        style={{
                          position: "absolute",
                          fontWeight: "900",
                          fontSize: 14,
                          top: 220,
                          alignSelf: "center",
                          color: "white",
                          textShadowColor: "black",
                          textShadowRadius: 5,
                        }}
                      >
                        {bottomCaption}
                      </Text>
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        setThumbnail(null);
                        setTopCaption("");
                        setBottomCaption("");
                      }}
                      style={{ position: "absolute", top: -15, left: 20 }}
                    >
                      <Ionicons name="close-circle" size={30} color="#6F6CBD" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <View
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <TouchableOpacity
                onPress={() => setShowdropdown(!showdropdown)}
                style={{ marginBottom: 20, alignItems: "center" }}
              >
                {!showdropdown && (
                  <AntDesign name="downcircle" size={24} color="#6F6CBD" />
                )}
                {showdropdown && (
                  <AntDesign name="upcircle" size={24} color="#6F6CBD" />
                )}
                <Text style={{ color: "#6F6CBD" }}>Upload</Text>
              </TouchableOpacity>

              {showdropdown && (
                <TouchableOpacity onPress={selectImage}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome name="photo" size={24} color="#6F6CBD" />
                    <Text
                      style={{
                        color: "#6F6CBD",
                        marginLeft: 10,
                        fontWeight: "700",
                      }}
                    >
                      Add an image
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            {showdropdown && (
              <>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={{ color: "black", fontWeight: "700" }}>
                    Upload post
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

const Tags = ({ selectedTags, setSelectedTags }) => {
  return (
    <>
      <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 10 }}>
        <FontAwesome name="tags" size={24} color="#6F6CBD" />
        <Text
          style={{
            color: "#6F6CBD",
            fontWeight: "800",
            marginLeft: 10,
            marginTop: 5,
            fontSize: 17,
          }}
        >
          Tags :
        </Text>
        {tagList.map((tag, index) => (
          <TouchableOpacity
            style={styles.tag(selectedTags, index)}
            key={index}
            onPress={() => {
              setSelectedTags((selectedTags) => {
                return [
                  ...selectedTags.slice(0, index),
                  !selectedTags[index],
                  ...selectedTags.slice(index + 1),
                ];
              });
            }}
          >
            <Text style={styles.tagText(selectedTags, index)}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const tagList = [
  "Donations",
  "Food",
  "Clothes",
  "Accomodation",
  "Employment",
  "Rides",
  "Tutoring",
  "Other",
];

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: "#DBD1EE",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    height: 100,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  headerText: {
    color: "#6F6CBD",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 27.5,
  },
  Profile: (activeTab = "") => ({
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: activeTab === "Profile" ? 2 : 0,
    borderColor: "black",
  }),
  submitButton: {
    width: 150,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#6F6CBD",
    marginTop: 10,
    height: 40,
    borderRadius: 8,
  },
  tag: (selectedTags, index) => ({
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: 10,
    marginLeft: 14,
    backgroundColor: selectedTags[index] ? "#6F6CBD" : "#525167",
    borderColor: selectedTags[index] ? "#6F6CBD" : "#525167",
    borderWidth: 1,
    alignItems: "center",
    padding: 5,
    marginTop: 2,
  }),
  tagText: (selectedTags, index) => ({
    color: selectedTags[index] ? "black" : "white",
    fontWeight: "700",
  }),
});

export default FeedScreen;
