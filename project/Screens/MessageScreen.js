import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import MessageHeader from "../Components/MessageHeader";
import { Formik } from "formik";
import firebase from "firebase";
const MessageScreen = ({ navigation, route }) => {
  const { username } = route.params;
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    const db = firebase.firestore();
    if (mounted) {
      db.collectionGroup("messages").onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ messages: doc.message })));
      });
    }
    console.log(messages);
    return () => (mounted = false);
  }, []);

  return (
    <View style={{ backgroundColor: "#201F32", flex: 1 }}>
      <MessageHeader navigation={navigation} title={username} />
      {/* {messages.map((message) => (
        <TouchableHighlight>
          <Text style={{ color: "white" }}>{message.message}</Text>
        </TouchableHighlight>
      ))} */}
      <TouchableHighlight
        style={{
          backgroundColor: "green",
          maxWidth: 250,
          margin: 10,
          marginLeft: 120,
          borderRadius: 15,
          marginTop: 30,
          padding: 15,
        }}
      >
        <Text style={{ color: "white" }}>
          Hello. I am reaching out because you showed an interest in helping
          with community service. Please write back to me, I can really use your
          help
        </Text>
      </TouchableHighlight>
      <Text style={{ color: "grey", marginLeft: 310, fontWeight: "bold" }}>
        Delivered
      </Text>

      <AppForm navigation={navigation} />
    </View>
  );
};

const AppForm = ({ navigation }) => {
  const uploadMessageToFirebase = (values) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("messages")
      .add({
        message: values.message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setMessages([...messages, values.message]);
  };

  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={(values) => {
        console.log(values);
        uploadMessageToFirebase(values);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your message"
              placeholderTextColor="#8A8097"
              onChangeText={handleChange("message")}
              autoFocus={false}
              value={values.message}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 540,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },
  inputContainer: {
    width: "80%",
    height: 50,
    backgroundColor: "#2C2B3A",
  },
  input: {
    width: "100%",
    height: "100%",
    color: "white",
    paddingLeft: 10,
  },
  button: {
    width: "20%",
    height: 50,
    backgroundColor: "#2C2B3A",

    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
export default MessageScreen;
