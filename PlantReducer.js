import { combineReducers } from 'redux';
import Moment from 'react-moment'
import moment from 'moment'

import { ADD_PLANT, REMOVE_PLANT, UPDATE_PLANT, WATER_PLANT, CURRENT_DAY } from './PlantActionTypes'

const INITIAL_STATE = {
    currentDate: '',
    plant: '',
    plants: {
        1: {
            id: 1, 
            type: 'plantpot', 
            name: 'Planty',
            reminder: true,
            interval: "7", 
            lastWateredDate: new Date(),
            nextWateredDate: '',
            currentDate: ''
        }
    }
}

const plantReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_PLANT:
            console.log(action.payload)
            return {
                plants: {
                    ...state.plants,
                    [action.payload.id]: action.payload.plant
                }
            }
        case UPDATE_PLANT:
            let today = new Date();
            let nextdate = moment(today).add(action.payload.interval, 'day');
            return {
                plants: {
                    ...state.plants,
                    [action.payload.id]: {
                        ...state.plants[action.payload.id],
                        name: state.plants[action.payload.id].name = action.payload.name,
                        interval: state.plants[action.payload.id].interval = action.payload.interval,
                        nextWateredDate: state.plants[action.payload.id].nextWateredDate = nextdate
                    }
                }
            }
        case REMOVE_PLANT: {
            let newState = Object.assign({}, state.plants)
            delete newState[action.payload]
            return {
                ...state,
                plants: {
                    ...newState
                }
            }
        }
        case WATER_PLANT: {
            let today = new Date();
            let nextdate = moment(today).add(action.payload.interval, 'day');
            return {
                ...state,
                plants: {
                    ...state.plants,
                    [action.payload.id]: {
                        ...state.plants[action.payload.id],
                        lastWateredDate: state.plants[action.payload.id].lastWateredDate = today,
                        nextWateredDate: state.plants[action.payload.id].nextWateredDate = nextdate
                    }
                    
                }
            }   
        }
        case CURRENT_DAY: {
            let today = new Date()
            state.currentDate = today
            return {
                ...state
            }
        }
        default:
            return state
    }
}

export default combineReducers({
    plantsState: plantReducer,
})