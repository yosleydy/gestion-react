import { SET_SEARCH } from './../constants'

export const setSearch = (payload) => {
    return {
        type: SET_SEARCH,
        payload: payload,
    }
}