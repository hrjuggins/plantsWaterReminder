
import React from 'react';
import { StyleSheet, Text, View, Image, Animated, Dimensions, Easing } from 'react-native';

export default class BackgroundShape extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      left: new Animated.Value(0)
    }
  }
  componentDidMount() {
    Animated.timing(
      this.state.left,
      {
        toValue: -450,
        duration: 800, 
        easing: Easing.ease,
      }
    ).start()
  }
  render() {
    return (
      <View style={styles.container}>
      <Animated.View style={{ position: 'absolute', left: this.state.left, flexDirection: 'row' }}>
      {
        [...Array(3)].map((_, i) => {
          return (
            <Image key={i} source={require('./assets/bgWave.png')} style={{ width: 355, height: 140 }}/>
          )
        })
      }
      </Animated.View>
      </View>
    )
  }
}


const styles = {
  container: {
    width: Dimensions.get('window').width, 
    // width: 6000,
    height: 550, 
    position: 'absolute', 
    zIndex: -9,
    flexDirection: 'row',
  },
}


