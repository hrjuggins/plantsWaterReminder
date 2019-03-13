import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { Svg } from 'expo';
const { Circle, Rect, Path } = Svg;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { waterPlant } from './PlantActions.js'

import colours from './colours.js'

export class WaterButton extends React.Component{
  constructor(props) {
    super(props)
  }
  onPressButton() {
    this.props.waterPlant(this.props.data)
    this.props.onPressAnimation()
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => this.onPressButton()}  
        >
          <Image source={require('./assets/water.png')} style={{ width: 35, height: 35 }}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
    const { plantsState } = state
    return { plantsState }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      waterPlant
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(WaterButton)


const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colours.green, 
    width: 55,
    height: 55,
    borderRadius: 50, 
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
}


