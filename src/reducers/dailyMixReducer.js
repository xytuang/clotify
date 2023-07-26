export const setDailyMix = mix => {
    return {
        type: 'SET_MIX_SUCCESS',
        mix: mix
    }
}

export const dailyMixReducer = (state = {}, action) => {
    switch (action.type) {
    case 'SET_MIX_SUCCESS':
        return {
            ...state,
            mix: action.mix
        }
    default:
        return state
    }
}

export default dailyMixReducer