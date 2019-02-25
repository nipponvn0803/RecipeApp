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
import firebase from "./initFirebase.js";
var firebaseDbh = firebase.database();
const WORow = ({ name, ingrs, img }) => (
  <View style={{ flexDirection: "row" }}>
    <Text
      style={{
        fontSize: 26,
        fontWeight: "bold",
        marginLeft: 15,
        marginTop: 20
      }}
    >
      {name}
    </Text>
  </View>
);
export default class PageScreen extends React.Component {
  static navigationOptions = {
    title: "Page"
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
            <ListView
              dataSource={this.state.dataSource}
              renderRow={rowData => this.renderRow(rowData)}
            />
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
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Save Recipe
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
