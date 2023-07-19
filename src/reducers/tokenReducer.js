const initialState = {
    token: ''
}

export const setToken = (token) => {
    return {
        type: 'SET_NEW_TOKEN',
        token: token
    }
}

const tokenReducer = (state = initialState, action) => {
    switch(action.type){
    case 'SET_NEW_TOKEN': {
        return {
            token: action.token
        }
    }
    default:
        return state
    }
}

export default tokenReducer