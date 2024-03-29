import React, { useEffect, useState } from "react";
import { NavigatorScreenParams } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import TabsNavigator, { TabsStackParamList } from "./TabsNavigator";
import LoginScreen from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";

export type RootStackParamList = {
  Login: any;
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  Register: any;
 
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ animation: "none" }}>
       <RootStack.Screen name="Login"
     options={{
          headerShown: false,
        }} component={LoginScreen}/> 
          <RootStack.Screen name="Register"
     options={{
          headerShown: false,
        }} component={Register}/> 
          
      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
