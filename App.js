import React, { Component } from 'react';
import { Button as BaseButton, Body as BaseBody, Card as BaseCard, CardItem as BaseCardItem, Container, Content, DeckSwiper as BaseDeckSwiper, Footer, FooterTab, Header, Icon, Item, Input, Left as BaseLeft, Text as BaseText, Thumbnail as BaseThumbnail, View as BaseView } from 'native-base';
import { Font, AppLoading } from "expo";
import { AppRegistry, View, Text, Button, Image, StyleSheet, StatusBar, ScrollView } from "react-native";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions, createBottomTabNavigator } from 'react-navigation';
import {Ionicons as FirstIonicon} from "@expo/vector-icons";

const styles = StyleSheet.create({
  coverPhoto: {
    flex: 1,
    width: null,
    height: null,
  },

  deckSwiper: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center',
  },

  deckSwiperTitle: {
    fontSize: 23,
  },

  boldText: {
    fontWeight: 'bold',
  },

  columnFlex: {
    flexDirection: 'column',
  },

  imageHorizontal: {
    width: 150,
    height: 150, 
    marginRight: 20,
  },

  textHorizontal: {
    marginTop: 10,
  }
});

//Cards in DeckSwiper, Homescreen
const cards = [
  {
    text: 'Vegan',
    name: 'One',
    image: require('./img/cover.png'),
  },

  {
    text: 'Seafood',
    name: 'One',
    image: require('./img/test1.png'),
  },

  {
    text: 'Low fat',
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
        <Header style={{ backgroundColor: '#3B8686', flexDirection: 'column', height: 120, }} searchBar rounded>
          <BaseText style={ { fontSize: 23, fontWeight: 'bold', color: 'white', marginBottom: 20, marginTop: 20,}}>RecipeApp</BaseText>
          <Item>
            <Icon ios='ios-search' android="md-search" />
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
            source={require('./img/cover.png')}
            style={styles.coverPhoto} >
          </Image>
          <View style={styles.deckSwiper}>
            <View style={{flex: 0.8}}>
              <BaseText style={[styles.deckSwiperTitle, styles.boldText]}>Collection</BaseText>
              <BaseDeckSwiper
                dataSource={cards}
                renderItem={item =>
                  <BaseCard style={{ elevation: 3 }}>
                    <BaseCardItem cardBody>
                      <Image style={{ height: 150, flex: 1 }} source={item.image} />
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
                }
              />
            </View>
          </View>

          <View style={styles.deckSwiper}>
            <View style={{flex: 0.8, height: 220}}>
            <BaseText style={[styles.deckSwiperTitle, styles.boldText]}>New recipes</BaseText>
            <ScrollView horizontal={true} >
              <View style={{ flexDirection: 'column' }}>
                <Image style={styles.imageHorizontal} source={require('./img/cover.png')} >
                </Image>
                <BaseText style={styles.textHorizontal}>Name 1</BaseText>
              </View>

              <View style={ styles.columnFlex }>
                <Image style={styles.imageHorizontal} source={require('./img/cover.png')} >
                </Image>
                <BaseText style={styles.textHorizontal}>Name 2</BaseText>
              </View>

              <View style={ styles.columnFlex }>
                <Image style={styles.imageHorizontal} source={require('./img/cover.png')} >
                </Image>
                <BaseText style={styles.textHorizontal}>Name 3</BaseText>
              </View>

              <View style={ styles.columnFlex }>
                <Image style={styles.imageHorizontal} source={require('./img/cover.png')} >
                </Image>
                <BaseText style={styles.textHorizontal}>Name 4</BaseText>
              </View>

              <View style={ styles.columnFlex }>
                <Image style={styles.imageHorizontal} source={require('./img/cover.png')} >
                </Image>
                <BaseText style={styles.textHorizontal}>Name 5</BaseText>
              </View>
              
            </ScrollView>
            </View>
          </View>

          <View style={styles.deckSwiper}>
            <View style={{flex: 0.8, height: 220}}>
            <BaseText style={[styles.deckSwiperTitle, styles.boldText]}>Popular recipes</BaseText>
            <ScrollView horizontal={true} >
              <View style={{ flexDirection: 'column' }}>
                <Image style={styles.imageHorizontal} source={require('./img/cover.png')} >
                </Image>
                <BaseText style={styles.textHorizontal}>Name 1</BaseText>
              </View>

              <View style={ styles.columnFlex }>
                <Image style={styles.imageHorizontal} source={require('./img/cover.png')} >
                </Image>
                <BaseText style={styles.textHorizontal}>Name 2</BaseText>
              </View>

              <View style={ styles.columnFlex }>
                <Image style={styles.imageHorizontal} source={require('./img/cover.png')} >
                </Image>
                <BaseText style={styles.textHorizontal}>Name 3</BaseText>
              </View>

              <View style={ styles.columnFlex }>
                <Image style={styles.imageHorizontal} source={require('./img/cover.png')} >
                </Image>
                <BaseText style={styles.textHorizontal}>Name 4</BaseText>
              </View>

              <View style={ styles.columnFlex }>
                <Image style={styles.imageHorizontal} source={require('./img/cover.png')} >
                </Image>
                <BaseText style={styles.textHorizontal}>Name 5</BaseText>
              </View>
              
            </ScrollView>
            </View>
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