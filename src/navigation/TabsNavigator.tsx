import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Icons from "@expo/vector-icons/MaterialIcons";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigator";
// import CustomBottomTabs from "../components/CustomBottomTabs";
import { COLORS, SPACING } from "../theme/Theme";
import AccountScreen from "../screens/AccountScreen";
import TodoScreen from "../screens/TodoScreen";
export type TabsStackParamList = {
  HomeScreen: undefined;
  AccountScreen : undefined;
  Todoscreen : undefined
};
const TabsStack = createBottomTabNavigator<TabsStackParamList>();
export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<"TabsStack">
  >;

const TabsNavigator = () => {
  return (
    <TabsStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          height: 6 * 10,
        },
      }}
      //   tabBar={(props : any) => <CustomBottomTabs {...props} />}
    >
       <TabsStack.Screen
        name="Todoscreen"
        component={TodoScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return (
              <View
                style={
                  props.focused
                    ? { backgroundColor: '#000', borderRadius: 12 }
                    : {}
                }
              >
                <Icons name="movie-filter" {...props} />
              </View>
            );
          },
        }}
      />
      {/* <TabsStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return (
              <View
                style={
                  props.focused
                    ? { backgroundColor: '#000', borderRadius: 12 }
                    : {}
                }
              >
                <Icons name="movie-filter" {...props} />
              </View>
            );
          },
        }}
      /> */}
     
       <TabsStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return (
              <View
                style={
                  props.focused
                    ? { backgroundColor: '#000', borderRadius: 12 }
                    : {}
                }
              >
                <Icons name="person" {...props} />
              </View>
            );
          },
        }}
      />
    </TabsStack.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 * 10,
  },
});
export default TabsNavigator;
