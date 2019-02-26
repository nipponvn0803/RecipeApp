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

let itemsRef = db.ref("/recipes");

const stylesHome = StyleSheet.create({
  textBig: {
    marginTop: 30,
    marginLeft: 15,
    fontSize: 18,
    color: "black"
  },
  textSmall: {
    fontSize: 20,
    marginLeft: 15,
    marginTop: 10,
    color: "black"
  }
})

class HomeScreens extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      items: [],
      image: [],
      ingredients: [],
      name: [],
      key: [],
      overall: [],
      step1: [],
      step2: [],
      step3: [],
      step4: [],
      step5: [],
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
          key: this.state.key.concat(this.state.items[i].id),
          overall: this.state.overall.concat(this.state.items[i].Overall),
          step1: this.state.step1.concat(this.state.items[i].Step1),
          step2: this.state.step2.concat(this.state.items[i].Step2),
          step3: this.state.step3.concat(this.state.items[i].Step3),
          step4: this.state.step4.concat(this.state.items[i].Step4),
          step5: this.state.step5.concat(this.state.items[i].Step5),
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
                itemid: this.state.key[i],
                image: this.state.image[i],
                name: this.state.name[i],
                overall: this.state.overall[i],
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
  state = {
    toggle: true
  };
  switch() {
    const newState = !this.state.toggle;
    this.setState({ toggle: newState });
  }
  render() {
    const { toggle } = this.state;
    const textValue = toggle ? "Save Recipe" : "Recipe Saved";
    const colorbg = toggle ? "#cf3c3e" : "#000000";
    const { navigation } = this.props;
    const itemid = navigation.getParam("itemid", "1");
    const name = navigation.getParam("name", "Beef Noodle Soup");
    const image = navigation.getParam("iamge", "https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
    const overall = navigation.getParam("overall");
    const step1 = navigation.getParam("step1");

    return (
      <Container>
        <ScrollView>
          {/* hide status bar */}
          <StatusBar hidden />
        
          <Image
            source={{uri:image}}
            style={{ width: 360, height: 250 }}
          />
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                marginTop: 25,
                marginLeft: 15,
                color: "black"
              }}
            >
              {name}
            </Text>
          </View>
          <Image
            source={require("./img/star.png")}
            style={{ width: 140, height: 32, marginLeft: 15, marginTop: 25 }}
          />

          <TouchableHighlight
            style={{
              backgroundColor: colorbg,
              width: 150,
              height: 40,
              marginTop: 30,
              marginLeft: 15,
              alignItems: "center",
              padding: 10,
              borderRadius: 20
            }}
            onPress={() => this.switch()}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
              {textValue}
            </Text>
          </TouchableHighlight>
          <Text
            style={{
              marginTop: 30,
              marginLeft: 15,
              fontSize: 18,
              color: "black"
            }}
          >
            {JSON.stringify(overall)}
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
              fontSize: 22,
              fontWeight: "bold",
              color: "black"
            }}
          >
            Ingredients:{" "}
          </Text>
          <Text
            style={{
              marginTop: 30,
              marginLeft: 15,
              fontSize: 18,
              color: "black"
            }}
          >
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
              fontSize: 22,
              fontWeight: "bold",
              color: "black"
            }}
          >
            Method:{" "}
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 15,
              marginTop: 10,
              color: "black"
            }}
          >
            Step 1:{" "}
          </Text>
          <Text
            style={{
              marginTop: 30,
              marginLeft: 15,
              fontSize: 18,
              color: "black"
            }}
          >
            {JSON.stringify(step1)}
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 15,
              marginTop: 10,
              color: "black"
            }}
          >
            Step 2:{" "}
          </Text>
          <Text
            style={{
              marginTop: 30,
              marginLeft: 15,
              fontSize: 18,
              color: "black"
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 15,
              marginTop: 10,
              color: "black"
            }}
          >
            Step 3:{" "}
          </Text>
          <Text
            style={{
              marginTop: 30,
              marginLeft: 15,
              fontSize: 18,
              color: "black"
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 15,
              marginTop: 10,
              color: "black"
            }}
          >
            Step 4:{" "}
          </Text>
          <Text
            style={{
              marginTop: 30,
              marginLeft: 15,
              fontSize: 18,
              color: "black"
            }}
          >
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
        title: "Details"
      }
    }
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