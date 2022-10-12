import { SET_SUMMARY } from './../constants'

export const summary = (payload) => {
    return {
        type: SET_SUMMARY,
        payload: payload
    }
}