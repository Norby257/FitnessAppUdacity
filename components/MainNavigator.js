import React from "react"
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons"

import {
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation"

import {Platform} from 'react-native'

import History from './History'
import Live from './Live'
import EntryDetail from './EntryDetail'
import AddEntry from './AddEntry'

import {purple, white} from '../utils/colors'

export const Tabs = createBottomTabNavigator(
    {
      History: History,
      AddEntry: AddEntry,
      Live: Live
     
    },
  
  
  
  
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          const { routeName } = navigation.state;
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return routeName === 'History' ? (
            <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
          ) : (
            <FontAwesome name="plus-square" size={30} color={tintColor} />
  
           
          );
        },
      }),
      tabBarOptions: {
        showIcon: true,
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      },
    }
  );
  
  export const MainNavigator = createStackNavigator({
    Home: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      },
    },
    EntryDetail: {
      screen: EntryDetail,
      navigationOptions:{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      },
    },
  });
  
