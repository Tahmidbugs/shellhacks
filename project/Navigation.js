import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import Registration from "./Screens/RegisterScreen";
import ZipCodeScreen from "./Screens/ZipCodeScreen";
import DonationScreen from "./Screens/FeedScreen";
import FeedScreen from "./Screens/FeedScreen";
import ProfileSet from "./Screens/ProfileSet";
import CreatePost from "./Screens/CreatePost";
import TopList from "./Screens/TopList";
import MessageScreen from "./Screens/MessageScreen";
import ChooseScreen from "./Screens/ChooseScreen";
import EditProfile from "./Screens/EditProfile";
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="LoginScreen"
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const SignedOutStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="ProfileSet"
      >
        <Stack.Screen name="TopList" component={TopList} />
        <Stack.Screen name="ProfileSet" component={ProfileSet} />
        <Stack.Screen name="FeedScreen" component={FeedScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ZipCodeScreen" component={ZipCodeScreen} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
        <Stack.Screen name="ChooseScreen" component={ChooseScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
