import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Footer, FooterTab, Button as BaseButton, Text as BaseText, Icon } from 'native-base';
import { Font, AppLoading } from "expo";
import { AppRegistry, View, Text, Button, Image, StyleSheet, StatusBar } from "react-native";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    width: null,
    height: null,
  },
});

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

const AppContainer = createAppContainer(AppNavigator);


export default class FooterTabsExample extends Component {
  
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  // load font after native base
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
        {/* hide status bar */}
        <StatusBar hidden />
        <Header style={{ backgroundColor: '#3B8686' }} searchBar rounded>
          <Item>
            <Icon ios='ios-search' android="md-search" />
            <Input placeholder="Search" />
          </Item>
          <BaseButton transparent>
            <BaseText>Search</BaseText>
          </BaseButton>
        </Header>

        {/* <AppContainer>
        </AppContainer> */}
        {/* min height make content appear */}
        <Content contentContainerStyle={{ minHeight: 300 }}>
          <Image
            resizeMode="contain"
            source={require('./img/cover.png')}
            style={styles.canvas} >
          </Image>
        </Content>

        <Footer>
          <FooterTab style={{ backgroundColor: '#3B8686' }}>
            <BaseButton active style={{ backgroundColor: '#3B8686' }}>
              <Icon ios='ios-search' android="md-search" style={{fontSize: 20}}/>
              <BaseText>Search</BaseText>
            </BaseButton>
            <BaseButton>
              <Icon ios='ios-bookmark' android="md-bookmark" style={{fontSize: 20}}/>
              <BaseText>Saved</BaseText>
            </BaseButton>
            <BaseButton>
              <Icon ios='ios-book' android="md-book" style={{fontSize: 20}}/>
              <BaseText style={{fontSize: 9}}>Collection</BaseText>
            </BaseButton>
            <BaseButton>
              <Icon ios='ios-settings' android="md-settings" style={{fontSize: 20}}/>
              <BaseText>Settings</BaseText>
            </BaseButton>
          </FooterTab>
        </Footer>
      </Container>
    );  
  }
}