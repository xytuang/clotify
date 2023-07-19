import { configureStore } from '@reduxjs/toolkit'
import { uiReducer } from './reducers/uiReducer'

const store = configureStore({
    reducer: {
        uiView: uiReducer
    }
})

export default store