//This screen asks the users for the zip code

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
} from "react-native";

const ZipCodeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: "#8A8097", fontSize: 40, textAlign: "center" }}>
          Set your location
        </Text>
        <Forms navigation={navigation} />
      </View>
    </View>
  );
};

const Forms = ({ navigation }) => {
  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your zip code"
          placeholderTextColor="#8A8097"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Proceed</Text>
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
  formContainer: {
    width: "100%",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
    height: 50,
    backgroundColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8A8097",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    color: "#8A8097",
  },
  button: {
    width: 320,
    backgroundColor: "#503E68",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ZipCodeScreen;
