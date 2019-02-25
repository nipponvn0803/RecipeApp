import React, { Component } from "react";
import { View, Text } from "react-native";

export default class PageScreen extends React.Component {
  static navigationOptions = {
    title: "Page"
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Bookmark Screen</Text>
      </View>
    );
  }
}
