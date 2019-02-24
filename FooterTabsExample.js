import React, { Component } from "react";
import { Font, AppLoading } from "expo";
import {
  AppRegistry,
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView
} from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
  createBottomTabNavigator
} from "react-navigation";
import { Ionicons as FirstIonicon } from "@expo/vector-icons";

import HomeScreen from "./HomeScreen.js";
import BookmarkScreen from "./BookmarkScreen.js";
import TimerScreen from "./TimerScreen.js";
import SettingsScreen from "./SettingsScreen.js";
import PageScreen from "./PageScreen";
const TabNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeScreen },
      Bookmark: { screen: BookmarkScreen },
      Timer: { screen: TimerScreen },
      Settings: { screen: SettingsScreen },
      // Page: { screen: PageScreen }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = FirstIonicon;
          let iconName;
          if (routeName === "Home") {
            iconName = `md-home`;
          } else if (routeName === "Bookmark") {
            iconName = `md-bookmark`;
          } else if (routeName === "Timer") {
            iconName = `md-clock`;
          } else if (routeName === "Settings") {
            iconName = `md-settings`;
          } //else if (routeName === "Page") {
          //iconName = `md-book`;
          //}

          // You can return any component that you like here!
          return <IconComponent name={iconName} size={25} color={tintColor} />;
        }
      }),
      tabBarOptions: {
        activeTintColor: "#3B8686",
        inactiveTintColor: "gray"
      }
    }
  )
);

export function redirectAfterSignOut() {
  const signOutAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Authen' }),
    ],
  });
  this.props.navigation.dispatch(signOutAction);  
}

export default class FooterTabsExample extends Component {
  render() {
    return <TabNavigator />;
  }
}
