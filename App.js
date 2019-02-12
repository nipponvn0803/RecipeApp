import React, { Component } from 'react';
import { Button as BaseButton, Body as BaseBody, Card as BaseCard, CardItem as BaseCardItem, Container, Content, DeckSwiper as BaseDeckSwiper, Footer, FooterTab, Header, Icon, Item, Input, Left as BaseLeft, Text as BaseText, Thumbnail as BaseThumbnail, View as BaseView } from 'native-base';
import { Font, AppLoading } from "expo";
import { AppRegistry, View, Text, Button, Image, StyleSheet, StatusBar } from "react-native";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions, createBottomTabNavigator } from 'react-navigation';
import {Ionicons as FirstIonicon} from "@expo/vector-icons";

const styles = StyleSheet.create({
  coverPhoto: {
    flex: 1,
    width: null,
    height: null,
  },
});

//Cards in DeckSwiper, Homescreen
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: require('./img/cover.png'),
  },

  {
    text: 'Card One',
    name: 'One',
    image: require('./img/test1.png'),
  },

  {
    text: 'Card One',
    name: 'One',
    image: require('./img/test2.jpg'),
  },
];

// HomeScreen
class HomeScreen extends React.Component {
  render() {
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

        {/* min height make content appear */}
        <Content contentContainerStyle={{ height: 600 }}>
          <Image
            resizeMode="contain"
            source={require('./img/cover.png')}
            style={styles.coverPhoto} >
          </Image>
          
          <View style={{height:400, flex: 0.8}}>
            <BaseDeckSwiper
              dataSource={cards}
              renderItem={item =>
                <BaseCard style={{ elevation: 3 }}>
                  <BaseCardItem>
                    <BaseLeft>
                      <BaseBody>
                        <BaseText>{item.text}</BaseText>
                        <BaseText note>NativeBase</BaseText>
                      </BaseBody>
                    </BaseLeft>
                  </BaseCardItem>
                  <BaseCardItem cardBody>
                    <Image style={{ height: 150, flex: 0.8 }} source={item.image} />
                  </BaseCardItem>
                  <BaseCardItem>
                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                    <BaseText>{item.name}</BaseText>
                  </BaseCardItem>
                </BaseCard>
              }
            />
          </View>
        </Content>

      </Container>
    );
  }
}

class BookmarkScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Bookmark Screen</Text>
      </View>
    );
  }
}

class CollectionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Collection Screen</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createAppContainer (
  createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Bookmark: { screen: BookmarkScreen },
  Collection: { screen: CollectionScreen },
  Settings: { screen: SettingsScreen },
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = FirstIonicon;
      let iconName;
      if (routeName === 'Home') {
        iconName = `md-home`;
      } else if (routeName === 'Bookmark') {
        iconName = `md-bookmark`;
      } else if (routeName === 'Collection') {
        iconName = `md-book`;
      } else if (routeName === 'Settings') {
        iconName = `md-settings`;
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#3B8686' ,
    inactiveTintColor: 'gray',
  },
})
);

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
          <TabNavigator>

          </TabNavigator>
    );  
  }
}