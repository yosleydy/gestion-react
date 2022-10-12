import { SET_ERROR } from './../constants'

export const setError = (payload,props) => {
    return {
        type: SET_ERROR,
        payload: payload,
        props: props,
    }
}

