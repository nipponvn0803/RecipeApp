import React, { Component } from 'react';
import {} from 'react-native';
import { Button, Container, Header, Content, List, ListItem, Separator,  Text, Title, Icon, Left, Body, Right, Switch } from 'native-base';
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
        <Container>
        <Header noLeft style={{ backgroundColor: '#3B8686', height: 60 }}>
        <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
        </Header>
        <Content>
          <Separator bordered>
            <Text style={{ fontSize: 14 }}>Account</Text>
          </Separator>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "black" }}>
                <Icon active name="contact" />
              </Button>
            </Left>
            <Body>
              <Text>Username</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "black" }}>
                <Icon active name="key" />
              </Button>
            </Left>
            <Body>
              <Text>Password</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "black" }}>
                <Icon active name="log-out" />
              </Button>
            </Left>
            <Body>
              <Text>Sign out</Text>
            </Body>
          </ListItem>
          <Separator bordered>
            <Text style={{ fontSize: 14 }}>About</Text>
          </Separator>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "black" }}>
                <Icon active name="information-circle-outline" />
              </Button>
            </Left>
            <Body>
              <Text>About us</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>

      );
    }
  }