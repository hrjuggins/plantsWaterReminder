import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper' // 1.5.4
const { width, height } = Dimensions.get('window')

import BackgroundShape from './backgroundShape.js'
import colours from './colours.js'

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 }
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this)
  }
  onMomentumScrollEnd (e, state, context) {
    this.setState({ index: context.state.index });
    console.log(this.state.index);
  }
  render() {
    const index = this.state.index;
    let button = null;
    if (index !== 3) {
      button = <TouchableOpacity
        style={styles.button}
        onPress={() => {this.refs.swiper.scrollBy(1)}}>
        <Text style={{ color: colours.green, fontSize: 15 }}>CONTINUE</Text>
      </TouchableOpacity>
    } else {
      button = <TouchableOpacity
        style={[styles.button, { backgroundColor: colours.green }]}
        onPress={() => {this.props.navigation.navigate('Home')}}>
        <Text style={{ color: 'white', fontSize: 15 }}>GOT IT!</Text>
      </TouchableOpacity>
    }
    return (
      <View style={styles.container}>
        <BackgroundShape />
        <Text style={styles.heading}>HOW TO START</Text>
        <View style={styles.main}>
            <Swiper 
                style={styles.swiper}
                dot={<View style={{backgroundColor: 'white', borderWidth: 0.5, borderColor: 'black', width: 10, height: 10, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                activeDot={<View style={{backgroundColor: '#0be485', width: 15, height: 15, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                paginationStyle={{ bottom: 20 }}
                loop={true}
                ref='swiper'
                showsButtons={false}
                index={0}
                onMomentumScrollEnd = {this.onMomentumScrollEnd}>
                <View style={styles.slide}>
                    <View style={styles.content}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Home')}} style={styles.skip}><Text style={{ color: colours.green }}>SKIP</Text></TouchableOpacity>
                        <View style={styles.title}><Text style={{fontSize: 38, fontWeight: 'bold', color: '#001056' }}>WELCOME!  </Text></View>
                        <Image source={require('./assets/plant.png')} style={{ height: '65%', width: undefined, aspectRatio: 3/4 }}/>
                        <Text style={styles.detail}>Plants App is the application that doesn&#39;t allow your plants to go thirsty anymore</Text>
                    </View>
                </View>
                <View style={styles.slide}>
                    <View style={styles.content}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Home')}} style={styles.skip}><Text style={{ color: colours.green }}>SKIP</Text></TouchableOpacity>
                        <View style={styles.title}><Text style={{fontSize: 38, fontWeight: 'bold', color: '#001056' }}>ADD A PLANT  </Text></View>
                        <Image source={require('./assets/plant.png')} style={{ height: '65%', width: undefined, aspectRatio: 3/4 }}/>
                        <Text style={styles.detail}>Add a new plant for your garden</Text>
                    </View>
                </View>
                <View style={styles.slide}>
                    <View style={styles.content}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Home')}} style={styles.skip}><Text style={{ color: colours.green }}>SKIP</Text></TouchableOpacity>
                        <View style={styles.title}><Text style={{fontSize: 32, fontWeight: 'bold', color: '#001056' }}>CHECK STATUS  </Text></View>
                        <Image source={require('./assets/plant.png')} style={{ height: '65%', width: undefined, aspectRatio: 3/4 }}/>
                        <Text style={styles.detail}>Watch your plants mood. The more sad, the more thirsty... Check out well</Text>
                    </View>
                </View>
                <View style={styles.slide}>
                    <View style={styles.content}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Home')}} style={styles.skip}><Text style={{ color: colours.green }}>SKIP</Text></TouchableOpacity>
                        <View style={styles.title}><Text style={{fontSize: 38, fontWeight: 'bold', color: '#001056' }}>WATER TIME  </Text></View>
                        <Image source={require('./assets/plant.png')} style={{ height: '65%', width: undefined, aspectRatio: 3/4 }}/>
                        <Text style={styles.detail}>Water is life. So water your plants to be happy</Text>
                    </View>
                </View>
            </Swiper>
        </View>
        {button}
      </View>
    )
  }
}

const styles = {
  container: {
      flex: 1, 
      alignItems: 'center',
      backgroundColor: '#fafafa',
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 25
  },
  heading: {
      marginBottom: 5,
      color: 'white',
  },
  main: {
      alignSelf: 'stretch',
      height: '85%',
  },
  slide: {
      alignItems: 'center',
  },    
  content: {
      alignSelf: 'stretch',
      height: '90%',
      margin: 10,
      marginLeft: 30,
      marginRight: 30,
      elevation: 5,
      backgroundColor: '#fafafa',
      borderRadius: 5,
      shadowColor: colours.green,
      shadowOffset: { width: 0, height: 0.2 },
      shadowOpacity: 0.8,
      shadowRadius: 1,  
      elevation: 5,
      padding: 35,
      alignItems: 'center'
  },
  skip: {
      alignSelf: 'stretch',
      alignItems: 'flex-end'
  },
  title: {
     alignSelf: 'stretch',
     alignItems: 'center'
  },
  detail: {
      textAlign: 'center',
      color: '#001056'
  },
  button: {
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
}