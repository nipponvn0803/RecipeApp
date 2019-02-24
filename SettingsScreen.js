import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button } from "react-native";
import * as firebase from 'firebase';

import { redirectAfterSignOut } from './FooterTabsExample.js';

export default class SettingsScreen extends React.Component {    
  logout = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert("Sigout successully"); 
      redirectAfterSignOut();
    }).catch(function(error) {
      // An error happened.
    });
  }

  handleSignOut() {
    this.logout;
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