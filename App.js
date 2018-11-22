import React from 'react';
import {Ionicons, FontAwesome} from '@expo/vector-icons'
import {createStore} from 'redux'
import {createBottomTabNavigator, TabNavigator, createStackNavigator} from 'react-navigation'
import {Provider} from 'react-redux'
import {Constants} from 'expo' 
import reducer from './reducers'
import {purple, white} from './utils/colors'

import {MainNavigator} from './components/MainNavigator'
import {setLocalNotification} from './utils/notifications'
import {
  Text,
  View,
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


export default class App extends React.Component {
componentDidMount() {
  setLocalNotification()
}

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
