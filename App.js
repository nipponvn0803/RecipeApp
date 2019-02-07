import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Footer, FooterTab, Button, Text, Icon } from 'native-base';
import { Font, AppLoading } from "expo";
import { View, Text } from "react-native";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

export default class FooterTabsExample extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon ios='ios-search' android="md-search" />
            <Input placeholder="Search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <Content />

        <Footer>
          <FooterTab>
            <Button active>
              <Icon ios='ios-search' android="md-search" style={{fontSize: 20}}/>
              <Text>Search</Text>
            </Button>
            <Button>
              <Icon ios='ios-bookmark' android="md-bookmark" style={{fontSize: 20}}/>
              <Text>Saved</Text>
            </Button>
            <Button>
              <Icon ios='ios-book' android="md-book" style={{fontSize: 20}}/>
              <Text style={{fontSize: 9}}>Collection</Text>
            </Button>
            <Button>
              <Icon ios='ios-settings' android="md-settings" style={{fontSize: 20}}/>
              <Text>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );  
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Details' })
              ],
            }))
          }}
        />
      </View>
    );
  }  
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }  
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
}, {
    initialRouteName: 'Home',
});

