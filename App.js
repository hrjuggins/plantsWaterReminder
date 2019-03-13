import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Font } from 'expo';

import HomeScreen from './homeScreen.js'
import AddNewPlant from './addPlantScreen.js'
import HomeScreenPlant from './homeScreenPlant.js'
import PlantScreen from './plantScreen.js'
import SplashScreen from './splashScreen.js'
import Intro from './intro.js'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import plantReducer from './PlantReducer.js'

const persistConfig = {
key: 'root',
storage: storage,
stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, plantReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);

const RootStack = createStackNavigator({
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        title: 'Splash',
        header: null //this will hide the header
      },  
    },
    Intro: {
      screen: Intro,
    },
    Home: {
      screen: HomeScreen,
    },
    Add: {
      screen: AddNewPlant,
    },
    Plant: {
      screen: PlantScreen
    }
  },
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#00d27e',
        elevation: 0,
        borderBottomColor:'transparent',
        borderBottomWidth: 0,
        shadowColor: 'transparent'
      },
      headerTintColor: '#00d27e',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
