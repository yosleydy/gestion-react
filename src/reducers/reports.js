import { SET_REPORT, RESET_REPORTS } from './../constants'

export const reports = (state = {} ,action) => {

    switch (action.type) {
        case SET_REPORT:
 
                return {...state, report: true, reports: action.payload, length: action.payload.length , noContent: false} 
   
             
        case RESET_REPORTS:
            return {...state, report: false}   
    
        default:
            return state;
    }
}