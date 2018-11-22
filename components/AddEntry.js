import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Platform, StyleSheet} from 'react-native'
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from '../utils/helpers'
import  {clearLocalNotification, setLocalNotification} from '../utils/notifications'

import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'
import {submitEntry, removeEntry} from '../utils/api'
import {connect} from 'react-redux'
import {addEntry} from '../actions'
import {white, purple} from '../utils/colors'
import {NavigationActions} from 'react-native'
 

function SubmitBtn ({onPress}) {
    return (
        <TouchableOpacity
       onPress={onPress} 
       style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
       
        <Text style={styles.submitBtnTxt}> Submit </Text>
        </TouchableOpacity>

    )
}
 class AddEntry extends Component {
    //state 
    //   get data for the specific day 
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    incremement = (metric) => {
        //   set max of metric, and increment amount
       const{max, step} = getMetricMetaInfo(metric)
       //    call setState with function to get currentState
       this.setState((state)=> {
           const count = state[metric] + step
           return {
               // prev state and current state merged 
               //   use params to get all the state propertoes
               ...state, 
               [metric]: count > max ?  max : count 
           }
       })
    }
    decrement = (metric) => {
        this.setState((state)=> {
            const count = state[metric] - getMetricMetaInfo(metric).step
            return {
                // prev state and current state merged 
                ...state, 
                [metric]: count <  0  ? 0 : count,
            }
        })
     }

     //  slide for sleep and eat 
     slide = (metric, value) => {
         this.setState(()=> ({
             [metric]: value,


         }))
     }

     submit = () => {
         const key = timeToString()
        const entry = this.state 
        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0

        }))
        //   update redux 
       //    to schedule a local notifcation use this:
       //   Notifications.scheduleLocalNotificationsAysnc 
        //   navigate to home 
        this.toHome()
        submitEntry({key, entry})
        //   save to "DB" - react native local storage 
        //   clean local notification 
        clearLocalNotification()
        .then(setLocalNotification)

     }

    reset = () => { 
        const key = timeToString() 
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))
        //   update REdux 
        //   route to Home 
        // update DB 
        this.toHome()
        removeEntry(key)
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddEntry'

        }))
    }
    render() {
        //  up to 4:15 in the add entry render 
        const metaInfo = getMetricMetaInfo()

        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons
                                name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
                                
                    size={100}
                    />
                    <Text>  You have already logged your information for today!</Text>
                   < TextButton style={{padding: 10}} onPress={this.reset}>
                   Reset
                   </TextButton>
                    
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metaInfo).map((key)=> {
                    const {getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]
                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {type === 'slider'
                       ? <UdaciSlider
                        value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                       /> 
                       : <UdaciSteppers
                       value={value}
                       onIncrement={()=> this.incremement(key)}
                       onDecrement={()=> this.decrement(key)}
                       {...rest}
                       />}
                       </View>
                    )
                })}
                <SubmitBtn onPress={this.submit }/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },

    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7, 
        height: 45, 
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'

    },
    submitBtnTxt: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
        
    }
    
})

function mapStateToProps(state){ 
    const key = timeToString()
    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}
//   so that addentry has access to dispatch 
export default connect(
    mapStateToProps
)(AddEntry)