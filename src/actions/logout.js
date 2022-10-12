import { LOGOUT_RESET } from './../constants'

export const logout = () =>{
    return {
        type: LOGOUT_RESET,
    }
}