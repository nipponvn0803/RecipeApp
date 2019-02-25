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
import { StackActions, NavigationActions } from "react-navigation";
var firebaseDbh = firebase.database();
const styles = StyleSheet.create({
  coverPhoto: {
    flex: 1,
    width: null,
    height: null
  },

  deckSwiper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },

  deckSwiperTitle: {
    fontSize: 23
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
    marginLeft: 20,
    marginTop: 7
  },

  textHorizontal: {
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

const WORow = ({ name, ingrs, img }) => (
  <View style={{ flexDirection: "row" }}>
    <Image style={styles.imageHorizontal} source={require("./img/1.jpg")} />
    <BaseText style={{ marginLeft: 10, marginTop: 25, fontWeight: "bold" }}>
      {name}
    </BaseText>
  </View>
);
class Collection extends React.Component {
  static navigationOptions = {
    title: "Collection"
  };
}
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = { loading: true, dbh: firebaseDbh, dataSource: ds };
  }
  componentDidMount() {
    var dbref = this.state.dbh.ref("recipes");
    this.setState({ dbulref: dbref });
    dbref.on("value", e => {
      var rows = [];
      if (e && e.val() && e.val().map) {
        e.val().map(v => rows.push(v));
      }
      var ds = this.state.dataSource.cloneWithRows(rows);
      this.setState({
        dataSource: ds,
        loading: false
      });
    });
  }
  componentDidUnMount() {
    this.state.dbulref.off("value");
  }
  renderRow(rd) {
    return <WORow name={rd.name} ingrs={rd.ingredients} img={rd.image} />;
  }
  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator />
          <Spinner color="#3B8686" />
        </View>
      );
    }
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
            RecipeApp!!!
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
        <Content contentContainerStyle={{ minHeight: 1150, flex: 1 }}>
          <Image
            resizeMode="contain"
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
          <View>
            <BaseText
              style={{ marginLeft: 20, fontWeight: "bold", fontSize: 22 }}
            >
              New recipes
            </BaseText>

            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Page")}
              >
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={rowData => this.renderRow(rowData)}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <BaseText
              style={{ marginLeft: 20, fontWeight: "bold", fontSize: 22 }}
            >
              Popular recipes
            </BaseText>

            <View>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={rowData => this.renderRow(rowData)}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
