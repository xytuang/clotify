import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './reducers/stateReducer'
import dailyMixReducer from './reducers/dailyMixReducer'


const store = configureStore({
    reducer: {
        status: playerReducer,
        mix: dailyMixReducer
    }
})

export default store