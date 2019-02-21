import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

import { Container, Header, Content, Form, Item, Input } from 'native-base';

import config from './key.js';
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
      .then(user => {
        const userInfo = firebase.auth().currentUser;
        if (userInfo) {
          // User sign up successful.
          const { username } = this.state;
          user.updateProfile({
            displayName: username
          }).then(function() {
            alert(user.displayName)
          }, function(error) {
            alert(error.toString())
            return;
          });
          console.log(user)
        } else {
          // No user is signed in.
          alert(e.toString())
          return;
        }
        //console.log(user)
      }, error => {
        alert(error.toString())
        return;
      })
    } catch (e) {
      alert(e.toString())
      return;
    }
  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        const userInfo = firebase.auth().currentUser;
        if (userInfo) {
          // User is signed in.
          alert(user.displayName)
        } else {
          // No user is signed in.
          alert(e.toString())
          return;
        }
        console.log(user)
      }, error => {
        alert(error.toString())
        return;
      })
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    marginTop: 26,
    width: '70%',
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#ff6262'
  },
  loginButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
});