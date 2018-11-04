import React, {Component} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {getMetricMetaInfo, timeToString} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'

function SubmitBtn ({onPress}) {
    return (
        <TouchableOpacity
       onPress={onPress} >
        <Text> Submit </Text>
        </TouchableOpacity>

    )
}
export default class AddEntry extends Component {
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
        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0

        }))
        //   update redux 
        //   navigate to home 

        //   save to "DB"
        //   clean local notification 

     }

    reset = () => { 
        const key = timeToString() 
        //   update REdux 
        //   route to Home 
        // update DB 
    }
    render() {
        //  up to 4:15 in the add entry render 
        const metaInfo = getMetricMetaInfo()

        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons
                    name='ios-happy-outline'
                    size={100}
                    />
                    <Text>  You have already logged your information for today!</Text>
                   < TextButton onPress={this.reset}>
                   Reset
                   </TextButton>
                    
                </View>
            )
        }
        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metaInfo).map((key)=> {
                    const {getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]
                    return (
                        <View key={key}>
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
