import { SET_ERROR } from './../constants'


export const error = (state = {} ,action) => {

    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.payload, errorData: action.props}  
    
        default:
            return state;
    }
}