import { createStackNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';

import Authen from './AuthenScreen.js';
import FooterTabsExample from './FooterTabsExample.js';

export const RootStack = createStackNavigator(
    {
      Authen: {
        screen: Authen,
        navigationOptions: {
          title: 'Authentication',
          header: null //this will hide the header
        },
      },
      Footer: {
        screen: FooterTabsExample,
        navigationOptions: {
          title: 'Home',
          header: null //this will hide the header
        },
      },
    },
    {
      initialRouteName: 'Authen',
    },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
     }
    );
  
  export const AppContainer = createAppContainer(RootStack);