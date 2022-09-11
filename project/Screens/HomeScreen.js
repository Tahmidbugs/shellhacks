import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "../Components/BottomTab";
const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.container}>
        <Text style={{ color: "#8A8097", fontSize: 40 }}>
          Select community service
        </Text>
        <ScrollView>
          {services.map((service, index) => (
            <ShowServices
              service={service}
              key={service.id}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
      <BottomTab />
    </View>
  );
};

const ShowServices = ({ service, navigation }) => {
  const [ShowSubServices, setShowSubServices] = React.useState(false);
  return (
    <TouchableOpacity
      key={service.id}
      style={styles.button}
      onPress={() => {
        setShowSubServices(!ShowSubServices);
        navigation.navigate("FeedScreen", { serviceName: service.name });
      }}
    >
      <Text style={styles.buttonText}>{service.name}</Text>
    </TouchableOpacity>
  );
};

const services = [
  {
    id: 1,
    name: "Donations",
  },
  {
    id: 2,
    name: "Accomodations",
  },
  {
    id: 3,
    name: "Ride Requests",
  },
  {
    id: 4,
    name: "Employment",
  },
  {
    id: 5,
    name: "Exchange",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#8A8097",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    height: 50,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

export default HomeScreen;
