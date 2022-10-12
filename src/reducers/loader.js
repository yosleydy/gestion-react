import { SET_LOADER } from './../constants'

export const loader = (state = {} ,action) => {

    switch (action.type) {
        case SET_LOADER:
            return {...state, loader: action.payload}   
    
        default:
            return state;
    }
}