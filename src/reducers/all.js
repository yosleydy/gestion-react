import { RESET_ALL } from './../constants'

export const all = (state = {} ,action) => {   
    switch (action.type) {
        case RESET_ALL:
            return state = {}
    
        default:
            return state;
    }
}