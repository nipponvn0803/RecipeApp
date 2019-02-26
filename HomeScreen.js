import React, { Component } from "react";
import {
  Button as BaseButton,
  Body as BaseBody,
  Card as BaseCard,
  CardItem as BaseCardItem,
  Container,
  Content,
  DeckSwiper as BaseDeckSwiper,
  Footer,
  FooterTab,
  Header,
  Icon,
  Item,
  Input,
  Left as BaseLeft,
  Text as BaseText,
  Thumbnail as BaseThumbnail,
  View as BaseView,
  Spinner,
  Toast
} from "native-base";
import {
  AppRegistry,
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  ListView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import firebase from "./initFirebase.js";
import {db} from "./initFirebase.js";
import PropTypes from 'prop-types';
import ItemComponent from './ItemComponent.js';

var firebaseDbh = firebase.database();
const styles = StyleSheet.create({
  coverPhoto: {
    resizeMode: 'cover', 
    flex: 1,
      width: null,
      height: null,
  },

  deckSwiper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40
  },

  deckSwiperTitle: {
    fontSize: 23,
    marginBottom: 20
  },

  boldText: {
    fontWeight: "bold"
  },

  columnFlex: {
    flexDirection: "column"
  },

  imageHorizontal: {
    width: 150,
    height: 150,
    marginRight: 15,
    marginTop: 7,
    borderRadius:10,
  },

  textHorizontal: {
    marginRight: 15,
    marginTop: 10
  }
});

//Cards in DeckSwiper, Homescreen
const cards = [
  {
    text: "Glutinous Rice",
    name: "One",
    image: require("./img/1.jpg")
  },

  {
    text: "Noodle",
    name: "One",
    image: require("./img/2.jpg")
  },

  {
    text: "Vietnamese Sandwiches",
    name: "One",
    image: require("./img/3.jpg")
  }
];

let itemsRef = db.ref('/recipes');

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      loading: true, 
      items: [],
      image: [],
      ingredients: [],
      name: [],
      key: []
    };
  }
  
  componentDidMount() {
    itemsRef.on('value', (snapshot) => {
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({items});
        for (let i = 0; i < this.state.items.length; i++) {
          this.setState({
            image : this.state.image.concat(this.state.items[i].image),
            ingredients : this.state.ingredients.concat(this.state.items[i].ingredients),
            name : this.state.name.concat(this.state.items[i].name),
            key : this.state.key.concat(this.state.items[i].key)
          })
          
        }
     });
    }
  
  displayDataNew(dataLength) {
    let viewArray = [];
    let num = 1;
    for (let i = 0; i < dataLength; i++) {
      viewArray.push(
        <View key={num++} style={{ flexDirection: 'column' }}>
          <Image style={styles.imageHorizontal} source={{uri:this.state.image[i]}} ></Image>
          <BaseText style={styles.textHorizontal}>{this.state.name[i]}</BaseText>    
        </View>             
      )
    }
    return viewArray
  }

  render() {
    // if (this.state.loading) {
    //   return (
    //     <View>
    //       <ActivityIndicator />
    //       <Spinner color="#3B8686" />
    //     </View>
    //   );
    // }
    return (
      <Container>
        {/* hide status bar */}
        <StatusBar hidden />
        <Header
          style={{
            backgroundColor: "#3B8686",
            flexDirection: "column",
            height: 120
          }}
          searchBar
          rounded
        >
          <BaseText
            style={{
              fontSize: 23,
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
              marginTop: 20
            }}
          >
            RecipeApp
          </BaseText>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Search" />
          </Item>
          <BaseButton transparent>
            <BaseText>Search</BaseText>
          </BaseButton>
        </Header>

        {/* min height make content appear */}
        <Content contentContainerStyle={{ minHeight: 1300, flex: 1 }}>
          <Image
            source={require("./img/cover.png")}
            style={styles.coverPhoto}
          />
          <View style={styles.deckSwiper}>
            <View style={{ flex: 0.8 }}>
              <BaseText style={[styles.deckSwiperTitle, styles.boldText]}>
                Collection
              </BaseText>
              <BaseDeckSwiper
                dataSource={cards}
                renderItem={item => (
                  <BaseCard style={{ elevation: 3 }}>
                    <BaseCardItem cardBody>
                      <Image
                        style={{ height: 150, flex: 1 }}
                        source={item.image}
                      />
                    </BaseCardItem>
                    {/* Heart */}
                    {/* <BaseCardItem>
                        <Icon name="heart" style={{ color: '#ED4A6A' }} />
                        <BaseText>{item.name}</BaseText>
                      </BaseCardItem> */}
                    <BaseCardItem>
                      <BaseLeft>
                        <BaseBody>
                          <BaseText>{item.text}</BaseText>
                        </BaseBody>
                      </BaseLeft>
                    </BaseCardItem>
                  </BaseCard>
                )}
              />
            </View>
          </View>
              
          <View style={styles.deckSwiper}>
            <View style={{ flex: 0.8 }}>
              <BaseText style={[styles.deckSwiperTitle, styles.boldText]}>New recipes</BaseText>
              <View>
                <ScrollView horizontal={true} >           
                  {this.displayDataNew(this.state.items.length)}
                </ScrollView>
              </View>
            </View>
          </View>

          <View style={styles.deckSwiper}>
            <View style={{ flex: 0.8 }}>
              <BaseText style={[styles.deckSwiperTitle, styles.boldText]}>Popular recipes</BaseText>
              <View>
                <ScrollView horizontal={true} >           
                  {this.displayDataNew(this.state.items.length)}
                </ScrollView>
              </View>
            </View>
          </View>
          
        </Content>
      </Container>
    );
  }
}
