import { SET_SUMMARY } from './../constants'

export const summaryJuridico = (payload) => {
    console.log('summary juridico: '+payload);
    return {
        type: SET_SUMMARY,
        payload: payload
    }
}