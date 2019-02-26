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
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { db } from "./initFirebase.js";
import PropTypes from "prop-types";
import ItemComponent from "./ItemComponent.js";
import { createStackNavigator, createAppContainer } from "react-navigation";
const styles = StyleSheet.create({
  coverPhoto: {
    resizeMode: "cover",
    flex: 1,
    width: null,
    height: null
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
    borderRadius: 10
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
let id = [];
let itemsRef = db.ref("/recipes");

class HomeScreens extends React.Component {
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
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
      for (let i = 0; i < this.state.items.length; i++) {
        this.setState({
          image: this.state.image.concat(this.state.items[i].image),
          ingredients: this.state.ingredients.concat(
            this.state.items[i].ingredients
          ),
          name: this.state.name.concat(this.state.items[i].name),
          key: this.state.key.concat(this.state.items[i].id)
        });
      }
    });
  }

  displayDataNew(dataLength) {
    let viewArray = [];
    let num = 1;

    for (let i = 0; i < dataLength; i++) {
      viewArray.push(
        <View key={num++} style={{ flexDirection: "column" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Page", {
                itemid: this.state.key[i]
              });
            }}
          >
            <Image
              style={styles.imageHorizontal}
              source={{ uri: this.state.image[i] }}
            />
            <BaseText style={styles.textHorizontal}>
              {this.state.name[i]}
            </BaseText>
          </TouchableOpacity>
        </View>
      );
    }
    return viewArray;
  }

  render() {
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
              <BaseText style={[styles.deckSwiperTitle, styles.boldText]}>
                New recipes
              </BaseText>
              <View>
                <ScrollView horizontal={true}>
                  {this.displayDataNew(this.state.items.length)}
                </ScrollView>
              </View>
            </View>
          </View>

          <View style={styles.deckSwiper}>
            <View style={{ flex: 0.8 }}>
              <BaseText style={[styles.deckSwiperTitle, styles.boldText]}>
                Popular recipes
              </BaseText>
              <View>
                <ScrollView horizontal={true}>
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

class PageScreen extends React.Component {
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
    const { navigation } = this.props;
    const itemid = navigation.getParam("itemid");
    return (
      <Container>
        <ScrollView>
          {/* hide status bar */}
          <StatusBar hidden />

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
              itemId: {JSON.stringify(itemid)}
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

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreens,
      navigationOptions: {
        header: null //this will hide the header
      }
    },
    Page: {
      screen: PageScreen,
      navigationOptions: {
        title: "Details",
      }
    },
  },
  {
    initialRouteName: "Home"
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Homescreen extends React.Component {
  render() {
    return <AppContainer />;
  }
}

