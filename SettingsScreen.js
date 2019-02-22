import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button } from "react-native";
import * as firebase from 'firebase';
import { createStackNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';


export default class SettingsScreen extends React.Component {    
  logout = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert("Sigout successully");
    }).catch(function(error) {
      // An error happened.
    });
  }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
              onPress={this.logout}
              title="Sign out"
              />
        </View>
      );
    }
  }