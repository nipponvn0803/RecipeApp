import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

import { Container, Header, Content, Form, Item, Input } from 'native-base';

import {config} from './key.js';
firebase.initializeApp(config);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        console.log(user)
      }
    })
  }

  signupUser = (email, password, username) => {
    try {
      if (this.state.password.length <= 6) {
        alert('Please enter at least 6 characters.')
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: this.state.username
      }).then(function() {
        // Update successful.
        alert(user.displayName)
      }).catch(function(error) {
        // An error happened.
      });
    } catch (e) {
      alert(e.toString())
      return;
    }
  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
      var user = firebase.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;
      
      if (user != null) {
        name = user.displayName;
        email = user.email;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                         // this value to authenticate with your backend server, if
                         // you have one. Use User.getToken() instead.
        alert("Welcome" + name);
                         
      }
    } catch (e) {
      alert(e.toString())
      return;
    }
  }

  render() {
    return (
      <View>
        <Form>
            <Item>
              <Input placeholder="Username" onChangeText={username => this.setState({username})}/>
            </Item>
            <Item>
              <Input placeholder="Email" onChangeText={email => this.setState({email})}/>
            </Item>
            <Item last>
              <Input placeholder="Password" onChangeText={password => this.setState({password})}/>
            </Item>
            <TouchableOpacity style={styles.button}
              onPress={() => this.loginUser(this.state.email, this.state.password)}>
              <Text style={styles.loginButton}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
              onPress={() => this.signupUser(this.state.email, this.state.password)}>
              <Text style={styles.loginButton}>SIGN UP</Text>
            </TouchableOpacity>
          </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});