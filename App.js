import React from 'react';
import {Ionicons} from '@expo/vector-icons'
import AddEntry from './components/AddEntry'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback, // only on android
  TouchableOpacity,
  TouchableWithoutFeedback // does not change background and does not work with text
} from 'react-native'

export default class App extends React.Component {
  handlePress = () => {
    alert('Hello!')
  }

  render() {
    return (
      <View style={styles.container}>
        
         
        <AddEntry />
      </View>
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
