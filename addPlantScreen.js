import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput, Switch, AsyncStorage, Picker  } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import moment from 'moment'
import { Font } from 'expo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPlant } from './PlantActions.js'

import colours from './colours.js'
import HomeScreen from './homeScreen.js';
import BackgroundShape from './backgroundShape.js'

export class AddNewPlant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                fontLoaded: false,
                id: '',
                plant: {
                    id: '',
                    type: 'flower',
                    name: 'Planty',
                    reminder: false,
                    interval: "7",
                    lastWateredDate: '',
                    nextWateredDate: '',
                    image: ''
                }
        }
        this.setDates = this.setDates.bind(this)
    }
    async componentDidMount() {
        await Font.loadAsync({
          'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
        });
        this.setState({ fontLoaded: true });
        this.createId()
        console.log(this.state.plant)
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.plant.interval != prevState.plant.interval) {
            this.setDates()
        } 
    }
    createId() {
      let newId = Math.random().toString(36).substring(7)
      this.setState({
          id: newId,
          plant: {...this.state.plant, id: newId}
      })
    }
    setDates() {
        let today = new Date();
        let nextdate = moment(today).add(this.state.plant.interval, 'day');
        this.setState({
            plant: {...this.state.plant, lastWateredDate: today, nextWateredDate: nextdate}
        })
    }
    submitAdd() {
        this.props.addPlant(this.state)
        this.props.navigation.navigate('Home')
    }
    
    render () {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
            <BackgroundShape />
                <Text style={styles.heading}>NEW PLANT</Text>
                <View style={styles.main}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                          style={{height: 40}}
                          placeholder="Name"
                          onChangeText={(text) => {this.setState({plant: {...this.state.plant, name: text}})}}
                        />
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Type</Text>
                        <Picker
                          style={{ width: 150, marginRight: -20 }}
                          selectedValue={this.state.plant.type}
                          onValueChange={(itemValue, itemIndex) => {this.setState({plant: {...this.state.plant, type: itemValue, image: `./assets/${itemValue}.png`}})}}>
                          <Picker.Item label="Succulent" value="succulent" />
                          <Picker.Item label="Flower" value="flower" />
                          <Picker.Item label="Plant pot" value="plantpot" />
                          <Picker.Item label="Bamboo" value="bamboo" />
                          <Picker.Item label="Other" value="other" />
                        </Picker>
                    </View>
                    <View style={[styles.field]}>
                        <Text style={styles.label}>Watering Interval</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                              style={{height: 40}}
                              keyboardType = 'numeric'
                              placeholder="7"
                              onChangeText={(text) => {this.setState({plant: {...this.state.plant, interval: text}})}}
                            />
                            <Text>d</Text>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Reminder</Text>
                        <Switch 
                          onValueChange={ (value) => this.setState({plant: {...this.state.plant, reminder: value}})} 
                          value={this.state.plant.reminder}
                          style={{ padding: 0 }}
                          trackColor={colours.green}
                        /> 
                    </View>
                </View>
            <TouchableOpacity onPress={() => this.submitAdd()} style={styles.addButton}>
                <Text style={{ color: colours.green, fontSize: 15 }}>DONE!</Text>
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
        addPlant
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPlant)



const styles = StyleSheet.create({
 container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fafafa',
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 25
  },
  heading: {
      marginBottom: 0,
      color: 'white',
  },
  main: {
    alignSelf: 'stretch',
    height: '75%',
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: colours.green,
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
    elevation: 5,
    padding: 35,
  },
  field: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 50
  },
  label: {
     fontFamily: 'Montserrat-Black',
     color: colours.darkblue,
  },
  addButton: {
    alignSelf: 'stretch',
    height: 50,
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colours.green,
  }
});
