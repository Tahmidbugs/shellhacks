import LoginScreen from "./Screens/LoginScreen";
import Registration from "./Screens/RegisterScreen";
import ZipCodeScreen from "./Screens/ZipCodeScreen";
import HomeScreen from "./Screens/HomeScreen";
import { SignedInStack, SignedOutStack } from "./Navigation";
import FeedScreen from "./Screens/FeedScreen";
import ProfileSet from "./Screens/ProfileSet";
import ChooseScreen from "./Screens/ChooseScreen";
import EditProfile from "./Screens/EditProfile";
export default function App() {
  return <SignedOutStack />;
}
