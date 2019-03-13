import { ADD_PLANT, REMOVE_PLANT, UPDATE_PLANT, WATER_PLANT, CURRENT_DAY } from './PlantActionTypes.js';

export const addPlant = plant => {
    return {
        type: ADD_PLANT,
        payload: plant
    }
}
export const removePlant = id => {
    return {
        type: REMOVE_PLANT,
        payload: id
    }
}
export const updatePlant = plant => {
    return {
        type: UPDATE_PLANT,
        payload: plant
    }
}
export const waterPlant = plant => {
    return {
        type: WATER_PLANT,
        payload: plant
    }
}
export const currentDay = day => {
    return {
        type: CURRENT_DAY,
        payload: day
    }
}