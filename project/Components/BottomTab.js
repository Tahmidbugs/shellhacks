import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

const BottomTab = () => {
  const [activeTab, setActiveTab] = React.useState("Home");
  const navigation = useNavigation();
  return (
    <View
      style={{
        color: "black",
        alignItems: "center",
        padding: 20,
        flexDirection: "row",
        backgroundColor: "black",
        justifyContent: "space-around",
      }}
    >
      {bottomTabIcons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setActiveTab(icon.name);
            navigation.navigate(icon.navigation);
          }}
        >
          <Image
            source={{
              uri: activeTab === icon.name ? icon.active : icon.inactive,
            }}
            style={[
              styles.Icon,
              icon.name === "Profile" ? styles.Profile() : null,
              activeTab == "Profile" && icon.name === activeTab
                ? styles.Profile(activeTab)
                : null,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const bottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
    navigation: "FeedScreen",
  },
  {
    name: "Add",
    active:
      "https://cdn1.vectorstock.com/i/1000x1000/97/80/add-icon-vector-21679780.jpg",
    inactive:
      "https://cdn1.vectorstock.com/i/1000x1000/97/80/add-icon-vector-21679780.jpg",
    navigation: "CreatePost",
  },
  {
    name: "TopList",
    active:
      "https://png.pngtree.com/element_our/md/20180517/md_5afd61ef4cbc7.jpg",
    inactive:
      "https://png.pngtree.com/element_our/md/20180517/md_5afd61ef4cbc7.jpg",
    navigation: "TopList",
  },
  {
    name: "Profile",
    active:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHXJexU8T3fYobb9B7aPWEeXa1scKM4cweQ&usqp=CAU",
    inactive:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHXJexU8T3fYobb9B7aPWEeXa1scKM4cweQ&usqp=CAU",
    navigation: "EditProfile",
  },
];

const styles = StyleSheet.create({
  Icon: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  Profile: (activeTab = "") => ({
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: activeTab === "Profile" ? 2 : 0,
    borderColor: "white",
  }),
});

export default BottomTab;
