import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BottomTab from "../Components/BottomTab";
import firebase from "../firebase";
import Header from "../Components/Header";
const TopList = ({ navigation }) => {
  const [users, setUsers] = React.useState(null);
  React.useEffect(() => {
    const getUsers = () => {
      const db = firebase.firestore();
      const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });

      return unsubscribe;
    };
    getUsers();
    console.log(users);
  }, []);

  return (
    <View style={{ backgroundColor: "#201F32", flex: 1 }}>
      <Header navigation={navigation} title="" />
      <Text
        style={{
          color: "#635A6E",
          fontSize: 25,
          alignSelf: "center",
          fontWeight: "bold",
          marginBottom: 30,
          marginTop: 60,
        }}
      >
        Top donors to reach out to{" "}
      </Text>
      {users && (
        <ScrollView>
          <Text
            style={{
              marginLeft: 20,
              color: "#6F6CBD",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Available Donors List
          </Text>

          {users
            .filter((user) => user.skills[0] === true)
            .map((user) => (
              <ReachDonor navigation={navigation} donor={user} />
            ))}

          <Text
            style={{
              marginLeft: 20,
              color: "#6F6CBD",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Tutors List
          </Text>
          {users
            .filter((user) => user.skills[1] === true)
            .map((user) => (
              <ReachDonor navigation={navigation} donor={user} />
            ))}
          <Text
            style={{
              marginLeft: 20,
              color: "#6F6CBD",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Volunteers List
          </Text>
          {users
            .filter((user) => user.skills[2] === true)
            .map((user) => (
              <ReachDonor navigation={navigation} donor={user} />
            ))}

          <Text
            style={{
              marginLeft: 20,
              color: "#6F6CBD",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Blood Donors List
          </Text>
          {users
            .filter((user) => user.skills[3] === true)
            .map((user) => (
              <ReachDonor navigation={navigation} donor={user} />
            ))}
          <Text
            style={{
              marginLeft: 20,
              color: "#6F6CBD",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Food Donors List
          </Text>
          <Text
            style={{
              marginLeft: 20,
              color: "#6F6CBD",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Clothes Donors List
          </Text>
          <Text
            style={{
              marginLeft: 20,
              color: "#6F6CBD",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Medicine Donors List
          </Text>
          <Text
            style={{
              marginLeft: 20,
              color: "#6F6CBD",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Animal adoptor List
          </Text>
        </ScrollView>
      )}
      <BottomTab />
    </View>
  );
};

const ReachDonor = ({ navigation, donor }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity style={styles.button}>
        <Image
          source={{ uri: donor.profile_picture }}
          style={{ height: 30, width: 30, borderRadius: 20 }}
        />
        <Text
          style={{
            color: "#777295",
            fontSize: 20,
            marginLeft: 20,
            fontWeight: "bold",
            fontWeight: "bold",
          }}
        >
          {donor.username}
        </Text>
        <TouchableOpacity
          style={{
            width: 100,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: 10,
            marginLeft: 129,
          }}
          onPress={() =>
            navigation.navigate("MessageScreen", { username: donor.username })
          }
        >
          <AntDesign name="message1" size={24} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    margin: 10,
    height: 50,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

const donors = [
  { id: 1, name: "otabek" },
  { id: 2, name: "tahmid" },
  { id: 3, name: "sabastian" },
  { id: 4, name: "muzammil" },
];

const tutors = [
  { id: 5, name: "Isaac" },
  { id: 6, name: "Habibi" },
  { id: 7, name: "Abdur" },
];

const volunteers = [
  { id: 5, name: "Musa" },
  { id: 6, name: "Otak" },
  { id: 7, name: "Mirsho" },
];

const bloodDonors = [
  { id: 5, name: "Ramz" },
  { id: 6, name: "Umar" },
  { id: 7, name: "Bilol" },
];
export default TopList;
