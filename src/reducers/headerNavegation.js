import { SET_HEADER } from './../constants'


export const setHeaderNavegation = (state = {} ,action) => {

    switch (action.type) {
        case SET_HEADER:
            return {...state, name: action.payload}  
    
        default:
            return state;
    }
}