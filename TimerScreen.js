import React, { Component } from 'react';
import { Alert, ListView , TimePickerAndroid, View, StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Picker, Form  } from 'native-base';

export default class TimerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: [],
      selectedMinute: 0,
      selectedSecond: 0,
      combineTimer: 0,
      showingTimer: 0,
      timerRunning: false,
      iconActive:"pause",
      timer1: null
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
    clearInterval(timer1)
  }
  addRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  //Create List from 0 to 59
  createWheel = () => {
    let count = []

    for (let i = 0; i < 60; i++) {
      if (i<10) {
        count.push(<Picker.Item label={`0${i}`} value={`0${i}`} key={`0${i}`}  />)
      } else {
        count.push(<Picker.Item label={`${i}`} value={`${i}`} key={`${i}`}  />)
      }
      
    }
    return count
  }

  startTimer = () => {
    this.setState({
      combineTimer:  
      Number.parseInt(this.state.selectedMinute, 10) * 60 
      + Number.parseInt(this.state.selectedSecond, 10) 
    })

    this.setState({
      showingTimer: this.state.selectedMinute + ':' + 
      this.state.selectedSecond
    })

    timer1 = setInterval(() => {
      minutes = Number.parseInt(this.state.combineTimer / 60, 10)
      seconds = Number.parseInt(this.state.combineTimer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.setState({
        showingTimer: minutes + ":" + seconds
      })

      this.setState({
        listViewData: [...this.state.listViewData, this.state.showingTimer.toString()]
      })

      this.setState({
        timerRunning: true
      })

      if (this.state.listViewData.length > 1) {
        this.setState({
          listViewData: this.state.listViewData.splice(1, 1)
        })
      }

 
      if (--this.state.combineTimer < 0) {
        clearInterval(timer1)
        Vibration.vibrate([1000, 2000, 3000], true);
        Alert.alert(
          'Alert',
          'TImer finished!',
          [
            {text: 'OK', onPress: () => Vibration.cancel()},
          ],
          {cancelable: false},
        );
      }
    }, 1000);

  }
  togglePlayPause = () => {
    var remainingTime;
    if (this.state.timerRunning == true) {
      clearInterval(timer1)
      this.setState({
        timerRunning: false,
        iconActive: "play"
      })
    } else if (this.state.timerRunning == false) {
      timer1 = setInterval(() => {
        minutes = Number.parseInt(this.state.combineTimer / 60, 10)
        seconds = Number.parseInt(this.state.combineTimer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        this.setState({
          showingTimer: minutes + ":" + seconds
        })
  
        this.setState({
          listViewData: [...this.state.listViewData, this.state.showingTimer.toString()]
        })
  
        this.setState({
          timerRunning: true
        })
  
        if (this.state.listViewData.length > 1) {
          this.setState({
            listViewData: this.state.listViewData.splice(1, 1)
          })
        }
  
   
        if (--this.state.combineTimer < 0) {
          clearInterval(timer1)
          Vibration.vibrate([1000, 2000, 3000], true);
          Alert.alert(
            'Alert',
            'TImer finished!',
            [
              {text: 'OK', onPress: () => Vibration.cancel()},
            ],
            {cancelable: false},
          );
        }
      }, 1000);
      this.setState({
        timerRunning: true,
        iconActive: "pause"
      })
    }
  }

    render() {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      return (
        <Container>
        <Header noLeft style={{ backgroundColor: '#3B8686', height: 60 }}>
        <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Timer</Title>
          </Body>
        </Header>

        <Content>
          <Form style={{flexDirection:"row"}}>
            <Picker
              note
              mode="dropdown"
              placeholder="Minutes"
              style={{ width: 120 }}
              selectedValue={this.state.selectedMinute}
              onValueChange={(value) => {
                this.setState({selectedMinute: value});
              }}
            >
              {this.createWheel()}
            </Picker>
            <Picker
              note
              mode="dropdown"
              placeholder="Seconds"
              style={{ width: 120 }}
              selectedValue={this.state.selectedSecond}
              onValueChange={(value) => {
                this.setState({selectedSecond: value});
              }}
            >
              {this.createWheel()}
            </Picker>
          </Form>

          <View style={{flex:1,flexDirection: 'column', padding: 20,  justifyContent: 'center', alignItems: 'center'}}>
              {/* Testing purpose */}
            {/* <Text>{this.state.showingTimer}</Text>
            <Text>{this.state.combineTimer}</Text>
            <Text>{this.state.listViewData}</Text> */}
            <TouchableOpacity onPress={this.startTimer} style={styles.button}>
              <Text style={styles.loginButton}>Add Timer</Text>
            </TouchableOpacity>
          </View>
    
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Text> {data} </Text>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={this.togglePlayPause}>
                <Icon active name={this.state.iconActive} />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
          />
        </Content>
      </Container>
      
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    button: {
      marginTop: '5%',
      width: '70%',
      paddingVertical: 14,
      borderRadius: 25,
      backgroundColor: '#3B8686'
    },
    loginButton: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
      color: '#fff'
    },
  });