import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDsFiT1Ik8TuE-ZyvNbbI5lpwMKiuQcmlo",
  authDomain: "gothope-d484d.firebaseapp.com",
  projectId: "gothope-d484d",
  storageBucket: "gothope-d484d.appspot.com",
  messagingSenderId: "185853448680",
  appId: "1:185853448680:web:b3860fc444c61d8f5f145d",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth };
export { firestore };
export default firebase;
