import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { createStackNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';


import { Container, Header, Content, Form, Item, Input, Root, Tab, Tabs, Toast, Label } from 'native-base';

import FooterTabsExample from './FooterTabsExample.js';


import firebase from './initFirebase.js';

//ignore timer warning
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


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
  
  secretLogin = () => {
      const loginAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Footer' }),
        ],
      });
      this.props.navigation.dispatch(loginAction);                
  }

  secretBackLogin = () => {
    const loginAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Authen' }),
      ],
    });
    this.props.navigation.dispatch(loginAction);                
}

  render() {
    return (
      <Root>
      <Container>
        <Tabs tabBarPosition="bottom" >
          <Tab heading="SIGN IN" tabStyle={{backgroundColor: '#3B8686'}} activeTabStyle={{backgroundColor: '#3B8686'}}>
            <View>
              <ImageBackground 
              source={{uri:'https://images.pexels.com/photos/255501/pexels-photo-255501.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'}} 
              style={styles.backgroundImage}>
              <View style={styles.overlay}/>
              <View style={styles.formContainer}>
                <Form style={{marginTop: '50%', flex: 0.8}}>
                      <Item floatingLabel>
                        <Label style={{ color: "#999999" }}>Email</Label>
                        <Input 
                        style={{ color: "#FFFFFF" }}
                        onChangeText={email => this.setState({email})} />
                      </Item>
                      <Item floatingLabel>
                        <Label style={{ color: "#999999" }}>Password</Label>
                        <Input 
                        secureTextEntry={true}
                        style={{ color: "#FFFFFF" }}
                        onChangeText={password => this.setState({password})}/>
                      </Item>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}
                        onPress={() => {
                            this.loginUser(this.state.email, this.state.password)
                            this.redirectAfterLogin()
                        }}>
                          <Text style={styles.loginButton}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.facebookButton}
                        onPress={() => {
                          
                        }}>
                          <Text style={styles.loginButton}>Sign In via Facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.facebookButton}
                        onPress={() => {
                          this.secretLogin()
                        }}>
                          <Text style={styles.loginButton}>Bypass Login</Text>
                        </TouchableOpacity>
                      </View>
                </Form>
              </View>
                
              </ImageBackground>
            </View>
          </Tab>
          <Tab heading="SIGN UP" tabStyle={{backgroundColor: '#3B8686'}} activeTabStyle={{backgroundColor: '#3B8686'}}>
            <View>
              <ImageBackground 
                source={{uri:'https://images.pexels.com/photos/1437584/pexels-photo-1437584.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'}} 
                style={styles.backgroundImage}>
                <View style={styles.overlay}/>
                <View style={styles.formContainer}>
                  <Form style={{marginTop: '50%', flex: 0.8}}>
                      <Item floatingLabel>
                        <Label style={{ color: "#999999" }}>Username</Label>
                        <Input 
                        style={{ color: "#FFFFFF" }}
                        onChangeText={username => this.setState({username})}/>
                      </Item>
                      <Item floatingLabel>
                        <Label style={{ color: "#999999" }}>Email</Label>
                        <Input 
                        style={{ color: "#FFFFFF" }}
                        onChangeText={email => this.setState({email})}/>
                      </Item>
                      <Item floatingLabel>
                        <Label style={{ color: "#999999" }}>Password</Label>
                        <Input 
                        secureTextEntry={true}
                        style={{ color: "#FFFFFF" }}
                        onChangeText={password => this.setState({password})}/>
                      </Item>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}
                          onPress={() => {
                            this.signupUser(this.state.email, this.state.password, this.state.username)
                            this.redirectAfterLogin()
                          }}>
                          <Text style={styles.loginButton}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.facebookButton}
                        onPress={() => {

                        }}>
                          <Text style={styles.loginButton}>Sign Up via Facebook</Text>
                        </TouchableOpacity>
                      </View>

                    </Form>
                  </View>
                </ImageBackground>
            </View>
          </Tab>
        </Tabs>
      </Container>
      </Root>
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

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%', 
    height: '100%'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.55
  },
  formContainer: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  button: {
    marginTop: '10%',
    width: '70%',
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#ff6262'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  facebookButton: {
    marginTop: '10%',
    width: '70%',
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#3b5998'
  }
});