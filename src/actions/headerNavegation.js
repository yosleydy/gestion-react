import { SET_HEADER } from './../constants'

export const setHeaderNavegation = (payload) => {
    return {
        type: SET_HEADER,
        payload: payload,
    }
}