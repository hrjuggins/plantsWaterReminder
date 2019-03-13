import React from "react";
import { StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo';

import colours from './colours.js'

export default class ProgressBar extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       fill: 50,
       int: 0,
       diff: 0
     }
   }
   componentWillReceiveProps(nextProps) {
     let fill = (nextProps.diff / nextProps.int) * 100
     Animated.timing(                  // Animate over time
        this.state.fill,            // The animated value to drive
        {
          toValue: fill,                   
          duration: 10000,              
        }
      )
    this.setState({fill: fill, int: nextProps.int, diff: nextProps.diff})
  }
  render() {
    let fillColour
    if (this.state.fill < 15) {
      fillColour = '#ff5d00';
    } else if (this.state.fill < 45 ) {
      fillColour = '#ffa300';
    } else if (this.state.fill < 75 ) {
      fillColour = '#faeb00';
    } else {
      fillColour = colours.green
    }
    console.log('fill', this.state.fill)
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.progress}>
          <Animated.View style={{ backgroundColor: fillColour, height: `${ this.state.fill }%`, width: '100%' }}>
          </Animated.View>
          <View style={{ height: '100%', width: '50%', zIndex: 9, position: 'absolute', top: 15 }}>
          {
                  [...Array(6)].map((_, i) => {
                  return (
                    <LinearGradient
                      key={i}
                      colors={[colours.darkblue, 'transparent']}
                      locations={[0.1,0.1]}
                      style={{
                        height: '18%',
                        width: '60%',
                      }}
                    />
                  )
                  })
                }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: 20,
    justifyContent: 'center'
  },
  progress: {
    width: '100%',
    height: '70%',
    backgroundColor: "white",
    borderRadius: 55,
    borderWidth: 2,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
});
