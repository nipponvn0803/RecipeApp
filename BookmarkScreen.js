import React, { Component } from 'react';
import {
  Button as BaseButton,
  Body as BaseBody,
  Card as BaseCard,
  CardItem as BaseCardItem,
  Container,
  DeckSwiper as BaseDeckSwiper,
  Left as BaseLeft,
  Text as BaseText,
  Thumbnail as BaseThumbnail,
  View as BaseView, Header, Left, Body, Button, Icon, Title, List, ListItem, Text, Picker, Form
} from "native-base";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

const styles = StyleSheet.create({
  coverPhoto: {
    flex: 1,
    width: null,
    height: null,
  },

   deckSwiper: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop: 20
  },

   deckSwiperTitle: {
    fontSize: 23,
  },

   boldText: {
    fontWeight: 'bold',
  },

   columnFlex: {
    flexDirection: 'column',
  },

   imageHorizontal: {
    width: 150,
    height: 150, 
    marginRight: 20,
  },

   textHorizontal: {
    marginTop: 10,
    fontWeight: "bold"
  }
});

export default class BookmarkScreen extends React.Component {
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
            <Title>Saved recipes</Title>
          </Body>
        </Header>
        <View style={styles.deckSwiper}>
              <View style={{flex: 0.8, height: 220}}>
              <ScrollView horizontal={true} >
                <View style={{ flexDirection: 'column' }}>
                  <Image style={styles.imageHorizontal} source={{uri:"https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}} >
                  </Image>
                  <BaseText style={styles.textHorizontal}>Beef Noodle Soup</BaseText>
                </View>

                
                <View style={ styles.columnFlex }>
                  <Image style={styles.imageHorizontal} source={{uri:"https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}} >
                  </Image>
                  <BaseText style={styles.textHorizontal}>Salmon Salad</BaseText>
                </View>

                <View style={ styles.columnFlex }>
                  <Image style={styles.imageHorizontal} source={{uri:"https://whattodoinhanoi.com/wp-content/uploads/2018/08/bun-thang-hanoi-vietnamese-chicken-pork-egg-noodle-soup-feature.jpg"}} >
                  </Image>
                  <BaseText style={styles.textHorizontal}>Bun Thang</BaseText>
                </View>

               </ScrollView>
              </View>
            </View>
          </Container>
      );
    }
  }