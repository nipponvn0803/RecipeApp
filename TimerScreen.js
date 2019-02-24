import React, { Component } from 'react';
import { View, Text } from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class TimerScreen extends React.Component {
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
            <Title>Timer</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
      </Container>
      );
    }
  }