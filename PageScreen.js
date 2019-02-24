/* import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  StatusBar
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
  Toast
} from "native-base";

  import firebase from "./initFirebase.js";

  var firebaseDbh = firebase.database();

// Rendering a row
const WORow = ({ name, ingrs, img }) => (
  <View style={styles.deckSwiper}>
  <View style={{ flex: 0.8, height: 220 }}>
    <BaseText style={[styles.deckSwiperTitle, styles.boldText]}>
      New recipes
    </BaseText>
    <ScrollView horizontal={true}>
      <View style={{ flexDirection: "column" }}>
        <Image
          style={styles.imageHorizontal}
          source={require("./img/cover.png")}
        />
        <BaseText style={styles.textHorizontal}>Name 1</BaseText>
      </View>

      <View style={styles.columnFlex}>
        <Image
          style={styles.imageHorizontal}
          source={require("./img/cover.png")}
        />
        <BaseText style={styles.textHorizontal}>Name 2</BaseText>
      </View>

      <View style={styles.columnFlex}>
        <Image
          style={styles.imageHorizontal}
          source={require("./img/cover.png")}
        />
        <BaseText style={styles.textHorizontal}>Name 3</BaseText>
      </View>

      <View style={styles.columnFlex}>
        <Image
          style={styles.imageHorizontal}
          source={require("./img/cover.png")}
        />
        <BaseText style={styles.textHorizontal}>Name 4</BaseText>
      </View>

      <View style={styles.columnFlex}>
        <Image
          style={styles.imageHorizontal}
          source={require("./img/cover.png")}
        />
        <BaseText style={styles.textHorizontal}>Name 5</BaseText>
      </View>
    </ScrollView>
  </View>
</View>
);

export default class Workout extends Component {
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
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <Container>
        <StatusBar hidden />
        <Header
          style={{
            backgroundColor: "#3B8686",
            flexDirection: "column",
            height: 60
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
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => this.renderRow(rowData)}
          />
        </View>
      </Container>
    );
  }
}
*/
