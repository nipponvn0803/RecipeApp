import React, { Component } from 'react';
import { Button as BaseButton, Body as BaseBody, Card as BaseCard, CardItem as BaseCardItem, Container, Content, DeckSwiper as BaseDeckSwiper, Footer, FooterTab, Header, Icon, Item, Input, Left as BaseLeft, Text as BaseText, Thumbnail as BaseThumbnail, View as BaseView } from 'native-base';
import { AppRegistry, View, Text, Button, Image, StyleSheet, StatusBar, ScrollView } from "react-native";

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
  

export default class HomeScreen extends React.Component {
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