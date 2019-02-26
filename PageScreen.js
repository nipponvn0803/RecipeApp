import React, { Component } from "react";
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
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
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
import { db } from "./initFirebase.js";
let itemsRef = db.ref("/recipes");
export default class PageScreen extends React.Component {
  static navigationOptions = {
    title: "Page"
  };
  constructor(props) {
    super();

    this.state = {
      myText: "Save Recipe"
    };
  }
  updateText = () => {
    this.setState({ myText: "Recipe Saved" });
  };

  render() {
    return (
      <Container>
        <ScrollView>
          {/* hide status bar */}
          <StatusBar hidden />
          <Header
            style={{
              backgroundColor: "#3B8686",
              flexDirection: "column",
              height: 80
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
          </Header>

          <Image
            source={require("./img/1.jpg")}
            style={{ width: 360, height: 250 }}
          />
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                marginTop: 25,
                marginLeft: 15
              }}
            >
              Beef Noodle Soup
            </Text>
          </View>
          <TouchableHighlight
            style={{
              backgroundColor: "#DDDDDD",
              width: 150,
              height: 40,
              marginTop: 10,
              marginLeft: 15,
              alignItems: "center",
              padding: 10,
              borderRadius: 20
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 16 }}
              onPress={this.updateText}
            >
              {this.state.myText}
            </Text>
          </TouchableHighlight>
          <Text style={{ marginTop: 30, marginLeft: 15, fontSize: 14 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginTop: 40,
              paddingLeft: 20,
              paddingRight: 20
            }}
          />
          <Text
            style={{
              marginTop: 30,
              marginLeft: 15,
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            Ingredients:{" "}
          </Text>
          <Text style={{ marginTop: 30, marginLeft: 15, fontSize: 14 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginTop: 40,
              paddingLeft: 20,
              paddingRight: 20
            }}
          />
          <Text
            style={{
              marginTop: 30,
              marginLeft: 15,
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            Method:{" "}
          </Text>
          <Text style={{ fontSize: 18, marginLeft: 15, marginTop: 10 }}>
            Step 1:{" "}
          </Text>
          <Text style={{ marginTop: 30, marginLeft: 15, fontSize: 14 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <Text style={{ fontSize: 18, marginLeft: 15, marginTop: 10 }}>
            Step 2:{" "}
          </Text>
          <Text style={{ marginTop: 30, marginLeft: 15, fontSize: 14 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <Text style={{ fontSize: 18, marginLeft: 15, marginTop: 10 }}>
            Step 3:{" "}
          </Text>
          <Text style={{ marginTop: 30, marginLeft: 15, fontSize: 14 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <Text style={{ fontSize: 18, marginLeft: 15, marginTop: 10 }}>
            Step 4:{" "}
          </Text>
          <Text style={{ marginTop: 30, marginLeft: 15, fontSize: 14 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <View />
        </ScrollView>
      </Container>
    );
  }
}
