
import { LOGOUT_RESET } from './../constants'

export const logout = (state = {},action) => {
    switch (action.type) {
        case LOGOUT_RESET:
            return {};
    
        default:
            return state;
    }
}