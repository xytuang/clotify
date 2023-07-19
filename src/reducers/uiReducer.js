const initialState = {
    view: 'home'
}

export const setView = view => {
    return {
        type: 'SET_NEW_VIEW',
        view: view
    }
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SET_NEW_VIEW':
        return {
            ...state,
            view: action.view
        }
    default:
        return state
    }
}

