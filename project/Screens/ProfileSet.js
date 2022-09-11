import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../firebase";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import one from "../assets/1.png";
const oneUri = Image.resolveAssetSource(one).uri;
import two from "../assets/2.png";
const twoUri = Image.resolveAssetSource(two).uri;
import three from "../assets/3.png";
const threeUri = Image.resolveAssetSource(three).uri;
import four from "../assets/4.png";
const fourUri = Image.resolveAssetSource(four).uri;
import five from "../assets/5.png";
const fiveUri = Image.resolveAssetSource(five).uri;
import six from "../assets/6.png";
const sixUri = Image.resolveAssetSource(six).uri;
import seven from "../assets/7.png";
const sevenUri = Image.resolveAssetSource(seven).uri;
import eight from "../assets/8.png";
const eightUri = Image.resolveAssetSource(eight).uri;
import nine from "../assets/9.png";
const nineUri = Image.resolveAssetSource(nine).uri;

const ProfileSet = ({ navigation }) => {
  const [thumbnail, setThumbnail] = React.useState(oneUri);
  const [pickAvatar, setPickAvatar] = React.useState(false);

  const showModal = () => {
    setPickAvatar(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#201F32" }}>
      <Text
        style={{
          color: "#73728F",
          fontSize: 30,
          marginTop: 100,
          fontWeight: "bold",
          alignSelf: "center",
        }}
      >
        Let's get you started!
      </Text>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          marginTop: 60,
          borderTopEndRadius: 100,
          borderTopStartRadius: 100,
        }}
      >
        <SetProfilePic thumbnail={thumbnail} onChangeProfile={showModal} />
        <SetUserCredentials thumbnail={thumbnail} navigation={navigation} />
        {pickAvatar && (
          <ModalContent
            setThumbnail={setThumbnail}
            setPickAvatar={setPickAvatar}
          />
        )}
      </View>
    </View>
  );
};
const UploadCredentialsToFirebase = async (
  thumbnail,
  username,
  bio,
  zipCode,
  navigation
) => {
  const db = firebase.firestore();
  db.collection("users")
    .doc(firebase.auth().currentUser.email)
    .update({
      profile_picture: thumbnail,
      username: username,
      bio: bio,
      zipCode: zipCode,
    })
    .then(navigation.navigate("FeedScreen"));
};
const SetUserCredentials = ({ thumbnail, navigation }) => (
  <View style={{ marginTop: 20 }}>
    <Formik
      initialValues={{ username: "", bio: "", zipCode: "" }}
      onSubmit={(values) => {
        UploadCredentialsToFirebase(
          thumbnail,
          values.username,
          values.bio,
          values.zipCode,
          navigation
        );
      }}
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
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                borderColor: "#73728F",
                borderTopWidth: 1,
                borderBottomWidth: 1,
                height: 60,
              }}
            >
              <Text
                style={{
                  color: "#73728F",
                  fontSize: 16,
                  fontWeight: "600",
                  marginRight: 40,
                  marginLeft: 10,
                }}
              >
                username
              </Text>
              <TextInput
                name="username"
                placeholder="Pick a username"
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor={"#525167"}
                style={{
                  color: "#73728F",
                  fontSize: 16,
                  //   backgroundColor: "#2B1701",
                }}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                returnKeyType="default"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                borderColor: "#73728F",
                paddingBottom: 15,
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "#73728F",
                  fontSize: 16,
                  fontWeight: "600",
                  marginRight: 83,
                  marginLeft: 10,
                }}
              >
                bio
              </Text>
              <TextInput
                name="bio"
                placeholder="Enter a bio of your choice"
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor={"#525167"}
                style={{
                  color: "#73728F",
                  //   backgroundColor: "#2B1701",
                  fontSize: 16,
                }}
                onChangeText={handleChange("bio")}
                onBlur={handleBlur("bio")}
                value={values.bio}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <Text
                style={{
                  color: "#73728F",
                  fontSize: 16,
                  fontWeight: "600",
                  marginRight: 50,
                  marginLeft: 10,
                }}
              >
                zip code
              </Text>
              <TextInput
                name="zipCode"
                placeholder="Enter your Zip Code"
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor={"#525167"}
                style={{
                  color: "#73728F",
                  //   backgroundColor: "#2B1701",
                  fontSize: 16,
                }}
                onChangeText={handleChange("zipCode")}
                onBlur={handleBlur("zipCode")}
                value={values.zipCode}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              width: 160,
              height: 40,
              borderRadius: 12,
              backgroundColor: "#73728F",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 17,
                fontWeight: "600",
              }}
            >
              Save and continue
            </Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  </View>
);

const ModalContent = ({ setThumbnail, setPickAvatar }) => {
  const avatararray = new Array(9).fill(false);
  const [avatars, setAvatars] = React.useState(avatararray);
  const selectImage = async () => {
    try {
      //   setPickAvatar(true);
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
      }
    } catch (error) {
      console.log("error reading image", error);
    }
  };
  return (
    <View
      style={{
        backgroundColor: "#201F32",
        flex: 1,
        marginTop: 80,
        flexDirection: "row",
        width: "100%",
        height: "30%",
        paddingBottom: 20,
      }}
    >
      <TouchableOpacity onPress={() => setPickAvatar(false)}>
        <AntDesign
          name="closecircle"
          size={30}
          color="#73728F"
          style={{ position: "absolute", left: 180, top: -20 }}
        />
      </TouchableOpacity>
      <ScrollView horizontal={true}>
        <TouchableOpacity
          style={{ margin: 15 }}
          onPress={() => {
            setThumbnail(oneUri);
            avatararray[0] = true;

            setAvatars(avatararray);
          }}
        >
          <Image source={{ uri: oneUri }} style={{ height: 100, width: 100 }} />
          {avatars[0] && (
            <MaterialIcons
              name="check-circle"
              size={24}
              color="black"
              style={{ position: "absolute", top: 10, right: 10 }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => {
            setThumbnail(twoUri);
            avatararray[1] = true;
            setAvatars(avatararray);
          }}
        >
          <Image
            source={require("../assets/2.png")}
            style={{ height: 100, width: 100 }}
          />
          {avatars[1] && (
            <MaterialIcons
              name="check-circle"
              size={24}
              color="black"
              style={{ position: "absolute", top: 10, right: 10 }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => {
            setThumbnail(threeUri);
            avatararray[2] = true;
            setAvatars(avatararray);
          }}
        >
          <Image
            source={require("../assets/3.png")}
            style={{ height: 100, width: 100 }}
          />
          {avatars[2] && (
            <MaterialIcons
              name="check-circle"
              size={24}
              color="black"
              style={{ position: "absolute", top: 10, right: 10 }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => {
            setThumbnail(fourUri);
            avatararray[3] = true;
            setAvatars(avatararray);
          }}
        >
          <Image
            source={require("../assets/4.png")}
            style={{ height: 100, width: 100 }}
          />
          {avatars[3] && (
            <MaterialIcons
              name="check-circle"
              size={24}
              color="black"
              style={{ position: "absolute", top: 10, right: 10 }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => {
            setThumbnail(fiveUri);
            avatararray[4] = true;
            setAvatars(avatararray);
          }}
        >
          <Image
            source={require("../assets/5.png")}
            style={{ height: 100, width: 100 }}
          />
          {avatars[4] && (
            <MaterialIcons
              name="check-circle"
              size={24}
              color="black"
              style={{ position: "absolute", top: 10, right: 10 }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => {
            setThumbnail(sixUri);
            avatararray[5] = true;
            setAvatars(avatararray);
          }}
        >
          <Image
            source={require("../assets/6.png")}
            style={{ height: 100, width: 100 }}
          />
          {avatars[5] && (
            <MaterialIcons
              name="check-circle"
              size={24}
              color="black"
              style={{ position: "absolute", top: 10, right: 10 }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => {
            setThumbnail(sevenUri);
            avatararray[6] = true;
            setAvatars(avatararray);
          }}
        >
          <Image
            source={require("../assets/7.png")}
            style={{ height: 100, width: 100 }}
          />
          {avatars[6] && (
            <MaterialIcons
              name="check-circle"
              size={24}
              color="black"
              style={{ position: "absolute", top: 10, right: 10 }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => {
            setThumbnail(eightUri);
            avatararray[7] = true;
            setAvatars(avatararray);
          }}
        >
          <Image
            source={require("../assets/8.png")}
            style={{ height: 100, width: 100 }}
          />
          {avatars[7] && (
            <MaterialIcons
              name="check-circle"
              size={24}
              color="black"
              style={{ position: "absolute", top: 10, right: 10 }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => {
            setThumbnail(nineUri);
            avatararray[8] = true;
            setAvatars(avatararray);
          }}
        >
          <Image
            source={require("../assets/9.png")}
            style={{ height: 100, width: 100 }}
          />
          {avatars[8] && (
            <MaterialIcons
              name="check-circle"
              size={24}
              color="black"
              style={{ position: "absolute", top: 10, right: 10 }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 10 }} onPress={selectImage}>
          <Image
            source={require("../assets/10.png")}
            style={{ height: 100, width: 100 }}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const SetProfilePic = ({ thumbnail, onChangeProfile }) => (
  <View
    style={{ marginTop: 50, alignItems: "center", justifyContent: "center" }}
  >
    <Image
      source={{
        uri: thumbnail,
      }}
      style={{
        height: 100,
        width: 100,
        borderRadius: 50,
        borderColor: "#73728F",
        borderWidth: 5,
      }}
    />
    <TouchableOpacity onPress={onChangeProfile}>
      <Text
        style={{
          color: "#73728F",
          marginTop: 30,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        Select your avatar
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 50,
  },
});

export default ProfileSet;
