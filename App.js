import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { createStackNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';


import { Container, Header, Content, Form, Item, Input, Tab, Tabs } from 'native-base';

import FooterTabsExample from './FooterTabsExample.js';


import * as firebase from 'firebase';
import {config} from './key.js';
firebase.initializeApp(config);

export class Authen extends React.Component {
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
        console.log("?? " + user.email)
      }
      else {
        console.log("out")
      }
    })
  }

  signupUser = (email, password, username) => {
    if (this.state.password.length <= 6) {
      alert('Please enter at least 6 characters.')
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      (user)=>{
        if(user){
          user.updateProfile({
            displayName: username // some displayName,
          }).then(function() {
            // Update successful.
            console.log(user.displayName);
          })
        }
    })
    .catch(function(error) {
      // Handle Errors here.

    });
  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      alert(e.toString())
      return;
    }
  }

  redirectAfterLogin = () => {
    var user = firebase.auth().currentUser;
    
    var name, email, photoUrl, uid, emailVerified;
    
    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
      // alert("Welcome" + name );
      alert("Welcome " + email );
      console.log("in " + user.displayName + user.email);
      console.log("in " + user.email);
      const loginAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Footer' }),
        ],
      });
      this.props.navigation.dispatch(loginAction);                
    }
  }
  
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Tab1">
            <View>
              <Form>
                  <Item>
                  <Input placeholder="Email" onChangeText={email => this.setState({email})}/>
                  </Item>
                  <Item last>
                  <Input placeholder="Password" onChangeText={password => this.setState({password})}/>
                  </Item>
                  <TouchableOpacity
                  onPress={() => {
                      this.loginUser(this.state.email, this.state.password)
                      this.redirectAfterLogin()
                  }}>
                  <Text>SIGN IN</Text>
                  </TouchableOpacity>
              </Form>
            </View>
          </Tab>
          <Tab heading="Tab2">
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
                  <TouchableOpacity
                    onPress={() => {
                      this.signupUser(this.state.email, this.state.password, this.state.username)
                      this.redirectAfterLogin()
                    }}>
                    <Text>SIGN UP</Text>
                  </TouchableOpacity>
                </Form>
            </View>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export const RootStack = createStackNavigator(
  {
    Authen: {
      screen: Authen,
      navigationOptions: {
        title: 'Authentication',
        header: null //this will hide the header
      },
    },
    Footer: {
      screen: FooterTabsExample,
      navigationOptions: {
        title: 'Home',
        header: null //this will hide the header
      },
    },
  },
  {
    initialRouteName: 'Authen',
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   }
  );

export const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
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
          <AppContainer>

          </AppContainer>
          
    );  
  }
}
