import { SET_LOADER} from './../constants'

export const setLoader = (payload) =>{
 
    /*var fecha = new Date();
    fecha.setMinutes(fecha.getMinutes()+EXPIRATION_TIME)
    localStorage.setItem("time",fecha);*/

    return {
        type: SET_LOADER,
        payload: payload,
    
    }
}