import React from 'react'
import {View, StyleSheet, AsyncStorage} from 'react-native'
import {FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'
import {white, red, orange, blue, lightPurp, pink} from './colors'
import {Notifications, Permissions} from 'expo'
import { Notification } from 'expo';

const NOTIFICATION_KEY = 'UdaciFitness:notifications'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
 
  }
 
 
  export function createNotification() {
    //  returns object that shows notification 
    return {
     title: 'Log your stats',
     body: 'log your status today',
     ios: {
       sound: true
     }
    }
 
 
 }
 
 export function setLocalNotification() {
   // check if we already sent one so we don't spam user 
   // use async storate to check that 
   AsyncStorage.getItem(NOTIFICATION_KEY)
   .then(JSON.parse)
   .then((data) => {
     if (data === null) {
       Permissions.askAsync(Permissions.NOTIFICATIONS)
       .then(({status}) => {
        if(status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync() 
 
          let tomorrow = newDate() 
          tomorrow.setDate(tomorrow.getDate() +1 )
          tomorrow.setHours(20)
          tomorrow.setMinutes(0)
          Notifcations.scheduleLocalNotificationsAsync(
            createNotification(), 
            {
              time: tomorrow,
              repeat: 'day'
            }
          ) 
 
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
 
        }
       })
     }
   })
 
 }