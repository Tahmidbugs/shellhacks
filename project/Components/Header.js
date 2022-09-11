import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";

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
      <Text style={styles.HeaderText}>{title}</Text>
      <Text></Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default Header;
