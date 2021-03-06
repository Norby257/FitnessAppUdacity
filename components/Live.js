import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchbaleOpacity, StyleSheet } from 'react-native'
import {Foundation} from '@expo/vector-icons'
import {purple, white} from '../utils/colors'
import { TouchableOpacity } from '../utils/colors';

 export default class Live extends Component {
  state = {
    coords: null,
    status: undetermined,
    direction: ''
  }

  askPermission = () => { 

  }
  render() {
    const { status, coords, direction } = this.state
   
    //   conditional rendering dependent on if user gives permission 

    if (status === null) {
     return <ActivityIndicator style={{marginTop: 30}} />
    }
     if (status === 'denied') {
      return (
        <View style={styles.center}>
       <Foundation name='alert' size={50} />

          <Text>You denied your location; you can fix this by visiting settings</Text>
        </View>
      )
    }
     if (status === 'undetermined') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>You need to enable location services for this app</Text>

          <TouchableOpacity style={styles.button} onPress={this.askPermission}>
          <Text style={styles.buttonText}>
          Enable 
          </Text>
          </TouchableOpacity>
        </View>
      )
    }
     return (
      <View style={styles.container}>
       <View style={styles.directionContainer}>
        <Text style={styles.header}>You're Heading</Text>
        <Text style={styles.direction}> North</Text>
      </View>
      

      </View>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText :{
    color: white,
    fontSize: 20,
  }
}) 