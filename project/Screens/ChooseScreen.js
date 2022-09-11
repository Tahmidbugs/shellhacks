import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import firebase from "../firebase";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";

const ChooseScreen = ({ navigation }) => {
  let arr = new Array(tagList.length);
  arr.fill(false, 0, tagList.length);
  const [selectedTags, setSelectedTags] = React.useState(arr);
  const uploadTofirebase = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .update({
        skills: selectedTags,
      })
      .then(() => {
        navigation.navigate("FeedScreen");
      });
  };

  return (
    <View style={{ backgroundColor: "#201F32", flex: 1 }}>
      <Header navigation={navigation} title={"continue"} />

      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          In what way do you wish to serve the community?
        </Text>
        <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <View>
          <TouchableOpacity
            style={{
              width: 180,
              padding: 10,
              borderRadius: 10,
              marginTop: 40,
              alignItems: "center",
              backgroundColor: "#6F6CBD",
            }}
            onPress={() => {
              uploadTofirebase(selectedTags);
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 180,
              padding: 10,
              borderRadius: 10,
              marginTop: 50,
              alignItems: "center",
              backgroundColor: "#6F6CBD",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Skip</Text>
            <Text style={{}}>(I am in need of help)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Tags = ({ selectedTags, setSelectedTags }) => {
  return (
    <>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 15 }}>
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

const Header = ({ navigation, title }) => {
  return (
    <SafeAreaView style={styles.HeaderContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          name="left"
          size={21}
          color="#6F6CBD"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
      <Text></Text>
      <Text style={styles.HeaderText}>{title}</Text>
    </SafeAreaView>
  );
};

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
    margin: 15,

    backgroundColor: selectedTags[index] ? "#6F6CBD" : "#525167",
    borderColor: selectedTags[index] ? "#6F6CBD" : "#525167",
    borderWidth: 1,
    alignItems: "center",
    padding: 15,
    marginTop: 2,
  }),
  tagText: (selectedTags, index) => ({
    color: selectedTags[index] ? "black" : "white",
    fontWeight: "700",
  }),
  container: {
    marginHorizontal: 10,
    backgroundColor: "#DBD1EE",
  },
  HeaderContainer: {
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
  HeaderText: {
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
    marginTop: 60,
    height: 40,
    borderRadius: 8,
  },
});

const tagList = [
  "Donations",
  "Tutoring",
  "Volunteering",
  "Mentoring",
  "Teaching",
  "Recruiter",
  "Counseling",
  "Other",
];

export default ChooseScreen;
