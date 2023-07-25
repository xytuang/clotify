import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './reducers/stateReducer'


const store = configureStore({
    reducer: {
        status: playerReducer
    }
})

export default store