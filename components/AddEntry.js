import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {getMetricMetaInfo} from '../utils/helpers'

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

    incremement = (metric ) => {
       const{max, step} = getMetricMetaInfo(metric)
       this.setState((state)=> {
           const count = state[metric] + step
           return {
               // prev state and current state merged 
               ...state, 
               [metric]: count > max ?  max : count 
           }
       })
    }
    decrement = (metric ) => {
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
    render() {
        return (
            <View>
                {getMetricMetaInfo('bike').getIcon()}
            </View>
        )
    }
}
