import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image
} from "react-native";

import firebase from './initFirebase.js';

var firebaseDbh = firebase.database();

// Rendering a row
const WORow = ({ name, reps }) => (
  <View>
    <Text>{name}</Text>
    <View>
      <Image source={{ uri: "https://facebook.github.io/react/logo-og.png" }} />
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
    return <WORow name={rd.name} reps={rd.image} />;
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
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => this.renderRow(rowData)}
        />
      </View>
    );
  }
}
