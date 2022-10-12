import { SET_SEARCH } from './../constants'


export const search = (state = {} ,action) => {

    switch (action.type) {
        case SET_SEARCH:
            return {...state, search: action.payload}  
    
        default:
            return state;
    }
}