import React, { Component } from 'react';
import { Font, AppLoading } from "expo";
import { AppRegistry, View, Text, Button, Image, StyleSheet, StatusBar, ScrollView } from "react-native";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions, createBottomTabNavigator } from 'react-navigation';
import {Ionicons as FirstIonicon} from "@expo/vector-icons";

import HomeScreen from './HomeScreen.js';
import BookmarkScreen from './BookmarkScreen.js';
import CollectionScreen from './CollectionScreen.js';
import SettingsScreen from './SettingsScreen.js';

const TabNavigator = createAppContainer (
  createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Bookmark: { screen: BookmarkScreen },
  Collection: { screen: CollectionScreen },
  Settings: { screen: SettingsScreen },
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = FirstIonicon;
      let iconName;
      if (routeName === 'Home') {
        iconName = `md-home`;
      } else if (routeName === 'Bookmark') {
        iconName = `md-bookmark`;
      } else if (routeName === 'Collection') {
        iconName = `md-book`;
      } else if (routeName === 'Settings') {
        iconName = `md-settings`;
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#3B8686' ,
    inactiveTintColor: 'gray',
  },
})
);

export default class FooterTabsExample extends Component {
  
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  // load font after native base
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
          <TabNavigator>

          </TabNavigator>
    );  
  }
}