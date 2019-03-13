import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput, Switch, AsyncStorage, Image  } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HomeScreen from './homeScreen.js';

export class SplashScreen extends React.Component {
    componentDidMount() {
        setTimeout(
            () => {
                this.props.navigation.navigate('Intro')
            }, 6500
        )
    }
    render() {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
                <Image source={require('./assets/splash.gif')} style={{ flex: 1, alignSelf: 'stretch', width: null, height: null, }} />  
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    const { plantsState } = state
    return { plantsState }
}

export default connect(mapStateToProps)(SplashScreen)
