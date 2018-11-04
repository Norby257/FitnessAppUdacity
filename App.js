import React from 'react';
import {Ionicons} from '@expo/vector-icons'
import AddEntry from './components/AddEntry'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import History from './components/History'
//   wrap everything in provider component and pass it  store and pass it 
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback, // only on android
  TouchableOpacity,
  TouchableWithoutFeedback,
  Slider 
} from 'react-native'

export default class App extends React.Component {


  render() {
    return (
    <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <AddEntry />
       
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
