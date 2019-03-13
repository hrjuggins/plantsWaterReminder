import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Font } from 'expo';
import moment from 'moment'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removePlant, updatePlant, waterPlant } from './PlantActions.js'

import colours from './colours.js'
import ProgressBar from './progressBar.js'

import plantpot from './assets/plantpot.png'
 
export class HomeScreenPlant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  triggerProgressBarUpdate() {
    this.refs.child.fillPercentage()
  }
  render() {
    let data = this.props.item
    // Days until watered
    let a = moment(data.nextWateredDate);
    let b = moment(this.props.plantsState.currentDate).startOf('day')
    let c = a.diff(b, 'days')
    
    const images = {
      'plantpot': require('./assets/plantpot.png'), 
      'flower': require('./assets/flower.png'),
      'succulent': require('./assets/succulent.png'),
      'bamboo': require('./assets/bamboo.png'),
      'other': require('./assets/other.png')
    }
    const image = data.type
    
    return (
      <TouchableOpacity 
        onPress={() => this.props.navigation.navigate('Plant', {data: data})}
        style={[styles.container , this.props.style]}
      >
        {
          this.state.fontLoaded ? (
          <Text style={{ color: colours.darkblue, marginBottom: 5, fontFamily: 'Montserrat-Black' }}>{data.name.toUpperCase()}</Text>
          ) : null
        }
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch', alignItems: 'center' }}>
          <View></View>
          <Image source={images[image]} style={{ height: '85%', width: undefined, aspectRatio: 3/4 }}/>
          <ProgressBar style={{ height: '100%', width: 10 }} int={data.interval} diff={c}/>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
    const { plantsState } = state
    return { plantsState }
}

export default withNavigation(connect(mapStateToProps)(HomeScreenPlant))

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 150,
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: colours.green,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,  
    elevation: 5
  },
});
