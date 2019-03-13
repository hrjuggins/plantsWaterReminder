import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity, Animated, TextInput, Alert } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { withNavigation } from 'react-navigation';
import Moment from 'react-moment'
import moment from 'moment'
import { Font } from 'expo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removePlant, updatePlant, waterPlant } from './PlantActions.js'

import colours from './colours.js'
import HomeScreenPlant from './homeScreenPlant.js';
import WaterButton from './waterButton.js'
import ProgressBar from './progressBar.js'
import BackgroundShape from './backgroundShape.js'

export class PlantScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      animWidth: new Animated.Value(0),
      animHeight: new Animated.Value(0),
      animOpacity: new Animated.Value(1),
      editView: false,
      plant: {
      }
    }
    this.removePlant = this.removePlant.bind(this)
    this.removeFunction = this.removeFunction.bind(this)
    this.editViewTrigger = this.editViewTrigger.bind(this)
    this.waterAnimation = this.waterAnimation.bind(this)
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
    });
    this.setState({ 
      fontLoaded: true, 
      plant: {
        ...this.state.plant, 
        id: this.props.navigation.state.params.data.id,
        name: this.props.navigation.state.params.data.name,
        interval: this.props.navigation.state.params.data.interval
      } 
    });
  }
  removeFunction() {
    let data = this.props.navigation.state.params.data;
    this.props.removePlant(data.id)
    this.props.navigation.navigate('Home')
  }
  removePlant() {
    let data = this.props.navigation.state.params.data;
    Alert.alert(
      'Delete Plant',
      `Are you sure you want to remove ${data.name} from your plants list?`,
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.removeFunction()},
      ],
      {cancelable: false},
    );
  }
  editViewTrigger() {
    if (this.state.editView) {
      this.setState({ editView: false })
    } else {
      this.setState({ editView: true })
    }
  }
  updatePlant() {
    this.props.updatePlant(this.state.plant)
    this.editViewTrigger()
  }
  waterAnimation() {
    this.state.animWidth.setValue(0)
    this.state.animHeight.setValue(0)
    this.state.animOpacity.setValue(1)
    Animated.sequence([
      Animated.parallel([
        Animated.timing(                  // Animate over time
          this.state.animWidth,            // The animated value to drive
          {
            toValue: 1000,                   
            duration: 700,              
          }
        ),
          Animated.timing(                  // Animate over time
          this.state.animHeight,            // The animated value to drive
          {
            toValue: 1000,                   
            duration: 700,              
          }
        )
      ]),
      Animated.timing(                  // Animate over time
          this.state.animOpacity,            // The animated value to drive
          {
            toValue: 0,                   
            duration: 500,              
          }
      )
    ]).start();    
  }
  render() {
    let data = this.props.navigation.state.params.data
    const plantsArray = Object.keys(this.props.plantsState.plants).map(key => this.props.plantsState.plants[key])
    const filteredPlantsArray = plantsArray.filter(item => item.id !== this.props.navigation.state.params.data.id)
    
    // Days until watered
    let a = moment(data.nextWateredDate);
    let b = moment(this.props.plantsState.currentDate).startOf('day')
    let c = a.diff(b, 'days')
    console.log(c)
    
    const images = {
      'plantpot': require('./assets/plantpot.png'), 
      'flower': require('./assets/flower.png'),
      'succulent': require('./assets/succulent.png'),
      'bamboo': require('./assets/bamboo.png'),
      'other': require('./assets/other.png')
    }
    const image = data.type
    
    return (
      <View style={styles.container}>
      <BackgroundShape />
        <Text style={styles.heading}>DETAIL</Text>
        <View style={styles.mainplant}>
          {
            this.state.fontLoaded && !this.state.editView ? (
            <Text style={{ color: colours.darkblue, marginBottom: 5, fontFamily: 'Montserrat-Black', fontSize: 30 }}>{data.name.toUpperCase()}</Text>
            ) : 
            <TextInput
              style={{height: 40}}
              placeholder="Name"
              onChangeText={(text) => {this.setState({plant: {...this.state.plant, name: text}})}}
            />
          }
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'stretch', }}>
            <View></View>
            <Image source={images[image]} style={{ height: '65%', width: undefined, aspectRatio: 3/4 }}/>
            <ProgressBar int={data.interval} diff={c}/>
          </View>
          <View style={styles.bottombuttons}>
            <View></View>
            <TouchableOpacity 
              onPress={() => this.removePlant()}
            >
              <Image 
                source={require('./assets/trash.png')}
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>
            { !this.state.editView ? (
            <TouchableOpacity 
              onPress={() => this.editViewTrigger()}
            >
                <Image 
                  source={require('./assets/edit.png')}
                  style={{ width: 35, height: 35 }}
                />
            </TouchableOpacity>
              ): 
            <TouchableOpacity 
              onPress={() => this.updatePlant()}
            >
                <Image 
                  source={require('./assets/done.png')}
                  style={{ width: 35, height: 35 }}
                />
            </TouchableOpacity>
            }
            <View></View>
            <View style={styles.animatedFill}><Animated.View style={[styles.animatedInner, {width: this.state.animWidth, height: this.state.animHeight, opacity: this.state.animOpacity }]}></Animated.View></View>
            <WaterButton data={data} onPressAnimation={this.waterAnimation}/>
            <View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            { !this.state.editView ? (
              <Text style={{ color: colours.darkblue, fontSize: 20  }}>{ c }d </Text>
              ):
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={{height: 40}}
                  keyboardType = 'numeric'
                  placeholder="7"
                  onChangeText={(text) => {this.setState({plant: {...this.state.plant, interval: text}})}}
                />
                <Text>d</Text>
              </View>
            }
              <Image 
                  source={require('./assets/alert.png')}
                  style={{ width: 35, height: 35 }}
              />
            </View>
            <View></View>
            <View></View>
          </View>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={ filteredPlantsArray }
          renderItem={({item}) => <HomeScreenPlant item={item} style={{ height: '90%', width: undefined,  aspectRatio: 3/4 }}/>}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.plantlist}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    const { plantsState } = state
    return { plantsState }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        removePlant,
        updatePlant, waterPlant
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(PlantScreen)

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 25,
      height: '100%'
  },
  heading: {
      marginBottom: 5,
      color: 'white',
  },
  mainplant: {
    alignSelf: 'stretch',
    height: '65%',
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
    shadowColor: colours.green,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,  
    elevation: 5,
    overflow: 'hidden'
  },
  plantlist: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    marginLeft: 20,
    marginRight: 25,
    paddingRight: 40,
    height: '100%',
  },
  bottombuttons: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  animatedFill: {
    position: 'absolute',
    zIndex: -99,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  animatedInner: {
    backgroundColor: colours.lightblue,
    borderRadius: 50,
  }
});
