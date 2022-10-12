import { SET_SUMMARY } from './../constants'


export const summary = (state = {} ,action) => {

    switch (action.type) {
        case SET_SUMMARY:
            if(typeof action.payload.IdReport != 'undefined'){
            return {...state, idReport: action.payload.IdReport, binnacle: action.payload.binnacle, length: action.payload.binnacle.length,  report: action.payload.report }  
            }else{
                return {...state, idReport: action.payload[0].idReport, report: action.payload[0] }  
            }
        default:
            return state;
    }
}