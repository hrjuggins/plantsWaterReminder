import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput, Switch, AsyncStorage, Image, Dimensions } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Moment from 'react-moment'
import FlatListWithEnd from 'react-native-flatlist-with-end'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import colours from './colours.js'
import HomeScreenPlant from './homeScreenPlant.js';
import AddNewPlant from './addPlantScreen.js';
import { currentDay } from './PlantActions.js'
import BackgroundShape from './backgroundShape.js'

class HomeScreen extends React.Component {
    componentWillMount() {
        this.props.currentDay()
    }
    componentDidMount() {
        console.log(this.props.plantsState)
    }
    render() {
        const { navigate } = this.props.navigation;
        const plantsArray = Object.keys(this.props.plantsState.plants).map(key => this.props.plantsState.plants[key])
        return (
          <View style={styles.container}>
          <BackgroundShape />
            <Text style={styles.heading}>MY PLANTS</Text>
            <View style={styles.inner}>
                <FlatListWithEnd
                  data={ plantsArray }
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => <HomeScreenPlant item={item} />}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  renderEndComponent={() => {
                    return (
                    <TouchableOpacity 
                        onPress={() => {
                            navigate('Add')
                        }}
                        style={ styles.addButton }
                    >
                        <Text style={{ textAlign: 'center', fontSize: 15, color: colours.green }}>Add new plant</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 45, color: colours.green }}>+</Text>
                    </TouchableOpacity>
                  )}}
                />
                
            </View>
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
        currentDay
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
      zIndex: 1,
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 25
  },
  heading: {
      marginBottom: 5,
      color: 'white',
  },
  inner: {
    flex: 1,
  },
  addButton: {
      height: 200,
      width: 150,
      margin: 10,
      padding: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffffb5',
      borderRadius: 5,
      borderStyle: 'dashed',
      borderColor: colours.green,
      borderWidth: 2,
  }
});
