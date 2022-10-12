
import axios from 'axios'
import { AUTHENTICATION_ENDPOINT, SET_ERROR } from '../constants';
import history from './../history';

import {ALERTS_LABELS} from './../constants'

export function loginAuthetication (username,password) {   

      return dispath => {
   
        axios({
          method: 'post',
          url:AUTHENTICATION_ENDPOINT,
          data: {
            username: username,
            password: password
          },

        }).then((response) => {
              localStorage.setItem('user', response.data.usuarioDigitel.nombre);
              localStorage.setItem('main', JSON.stringify(response.data.Menu));
              history.push('/rt-front/home');      

            })
            .catch(error => {  
              let errorObject=JSON.parse(JSON.stringify(error));
              console.log("error" + errorObject)
              
              var diag = ALERTS_LABELS.COMUNICATION_FAILED;
              if(errorObject.response === undefined){
                  diag = ALERTS_LABELS.COMUNICATION_FAILED;
              }else if (errorObject.response.status === 401){
               
                  diag = ALERTS_LABELS.AUTHENTICATION_FAILED;
              }

              const propsAlert = {
                  title : ALERTS_LABELS.TITLE_ERROR ,
                  dialog : diag,
                  leftButton : null,
                  rightButton : ALERTS_LABELS.ACCEPT,
                }
                dispath({
                  type: SET_ERROR,
                  payload: true,
                  props: propsAlert,
              })
            });      
    }
  }
