import React from 'react';
import {Ionicons, FontAwesome} from '@expo/vector-icons'
import AddEntry from './components/AddEntry'
import {createStore} from 'redux'
import {createBottomTabNavigator, TabNavigator, createStackNavigator} from 'react-navigation'
import {purple, white} from './utils/colors'
import {Provider} from 'react-redux'
import {Constants} from 'expo' 
import reducer from './reducers'
import History from './components/History'
import Live from './components/Live'
import EntryDetail from './components/EntryDetail'

import {
  Text,
  View,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback, // only on android
  TouchableOpacity,
  TouchableWithoutFeedback,
  Slider
 
} from 'react-native'

//   wrap everything in provider component and pass it  store and pass it 
//   fix AddEntry vs addEntry 

function UdaciStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.StatusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const Tabs = createBottomTabNavigator(
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

const MainNavigator = createStackNavigator({
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


export default class App extends React.Component {


  render() {
    return (
    <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
       <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
       
       <MainNavigator />
       
       
      </View>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: "#E53224",
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  
  }
});
