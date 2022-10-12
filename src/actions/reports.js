
import axios from 'axios'
import { LIST_REPORT_ENDPOINT, 
         REPORT_ENDPOINT, 
         TAKE_REPORT_ENDPOINT, 
         CHANGE_REPORT_STATUS_ENDPOINT,
         SET_ERROR, 
         SET_REPORT, RESET_REPORTS,
         LEGAL_REPORT_ENDPOINT, CHANGE_LEGAL_REPORT_STATUS_ENDPOINT, 
         TAKE_LEGAL_REPORT_ENDPOINT, PDF_ENDPOINT} from '../constants';
import { setHeaderNavegation } from '../actions/headerNavegation';
import { setLoader } from '../actions/loader';
import { summary } from '../actions/summary';
import { resetAll } from '../actions/all';
import { setSearch } from '../actions/search';

import { ALERTS_LABELS, CLOSE } from './../constants'



export const reports = (payload) =>{
     return {
        type: SET_REPORT,
        payload: payload,    
    }
}

export const reportsJuridico = (payload) =>{
  return {
     type: SET_REPORT,
     payload: payload,    
 }
}

export const resetReports = () =>{
    return {
        type: RESET_REPORTS,
        payload: false,
    }
}

export function getReports (username,reportstatus,reportlevel,processName) {   

      return dispath => {
        axios({
          method: 'get',
          url:LIST_REPORT_ENDPOINT,
          headers:{
            username : username,
            reportstatus : reportstatus,
            reportlevel : reportlevel,
          },

        }).then((response) => {
            
            dispath(reports(response.data));
            dispath(setHeaderNavegation(processName));
            dispath(setLoader(false))
            if(response.data.length === 0){
              const propsAlert = {
                title : ALERTS_LABELS.TITLE_SUCCESS,
                dialog : ALERTS_LABELS.WITH_OUT_RESULTS,
                leftButton : null,
                rightButton : ALERTS_LABELS.ACCEPT,
                leftWay : CLOSE,
                rightWay : CLOSE
              }
              dispath({
                type: SET_ERROR,
                payload: true,
                props: propsAlert,
            })
            }

    

        }).catch(error => {
              let errorObject=JSON.parse(JSON.stringify(error));
              console.log("error" + errorObject)
              const propsAlert = {
                  title : ALERTS_LABELS.TITLE_ERROR,
                  dialog : ALERTS_LABELS.GET_REPORT_LIST_FAILED,
                  leftButton : null,
                  rightButton : ALERTS_LABELS.ACCEPT,
                  leftWay : CLOSE,
                  rightWay : CLOSE
                }
                dispath({
                  type: SET_ERROR,
                  payload: true,
                  props: propsAlert,
              })
            });      
    }
  }


  export function getReport (idReport,userName,processName,endpoint) {   

    return dispath => {

        var URL = '';

        if(endpoint === 1){
            URL = REPORT_ENDPOINT;
        }else{
            URL = TAKE_REPORT_ENDPOINT;
        }
 
      axios({
        method: 'get',
        url: URL,
        headers:{
          idReport : idReport,
          userName : userName,
        },
      }).then((response) => {
          dispath(summary(response.data));
          dispath(setHeaderNavegation(processName))         
          dispath(setLoader(false))
      }).catch(error => {
        
            let errorObject=JSON.parse(JSON.stringify(error));
            console.log("error" + errorObject)
            dispath(setLoader(false))
            const propsAlert = {
                title : ALERTS_LABELS.TITLE_ERROR,
                dialog : ALERTS_LABELS.GET_REPORT_FAILED,
                leftButton : null,
                rightButton : ALERTS_LABELS.ACCEPT,
                leftWay : CLOSE,
                rightWay : CLOSE
              }
              dispath({
                type: SET_ERROR,
                payload: true,
                props: propsAlert,
            })
          });      
  }
}

export function foundReport (userName,processName,idReport) {   
    return dispath => {

      axios({
        method: 'get',
        url: REPORT_ENDPOINT,
        headers:{
          idReport : idReport,
          userName : userName,
        },
      }).then((response) => {

        console.log("estatus" + response.data.report[0].reportStatus)
        
        if(response.data.report[0].reportStatus === 3 || response.data.report[0].reportStatus === 1){         
            dispath(summary(response.data));
            dispath(setHeaderNavegation(processName))         
            dispath(setLoader(false))
        }else{
            dispath(getReport(idReport,userName,processName,2))
        }

      }).catch(error => {
        
            let errorObject=JSON.parse(JSON.stringify(error));
            console.log("error" + errorObject)
            dispath(setLoader(false))
            dispath(setSearch(true))
            const propsAlert = {
                title : ALERTS_LABELS.TITLE_ERROR,
                dialog : ALERTS_LABELS.GET_REPORT_FAILED,
                leftButton : null,
                rightButton : ALERTS_LABELS.ACCEPT,
                leftWay : CLOSE,
                rightWay : CLOSE
              }
              dispath({
                type: SET_ERROR,
                payload: true,
                props: propsAlert,
            })
          });      
  }
}

export function getChangeReportStatus (idReport,newReportStatus,newPayStatus,textComment,userName) {   

    return dispath => {

      axios({
        method: 'get',
        url: CHANGE_REPORT_STATUS_ENDPOINT,
        headers:{
            idReport : idReport,
          newReportStatus : newReportStatus,
          newPayStatus : newPayStatus,
          textComment : textComment,
          userName : userName,
        },
      }).then((response) => {
        console.log(response)
        dispath(reports(response.data));
        dispath(setLoader(false))
        dispath(resetAll()) 
        dispath(getReports(localStorage.getItem('user'),0,1,'Gestión de pagos'))
           
         
      }).catch(error => {
        
            let errorObject=JSON.parse(JSON.stringify(error));
            console.log("error" + errorObject)

            const propsAlert = {
                title : ALERTS_LABELS.TITLE_ERROR,
                dialog : ALERTS_LABELS.REPORT_STATUS_FAILED,
                leftButton : null,
                rightButton : ALERTS_LABELS.ACCEPT,
                leftWay : CLOSE,
                rightWay : CLOSE
              }
              dispath({
                type: SET_ERROR,
                payload: true,
                props: propsAlert,
            })
            dispath(setLoader(false))
          });      
  }
}

/*******************juridico************************** */
export function getReportsJuridico (userName,processName,status) {   
  let data=[];
  let arreglo=[];

  return dispath => {
    axios({
      method: 'get',
      url:LEGAL_REPORT_ENDPOINT+'?userName='+userName,
    }).then((response) => {

      if(processName === 'Reporte Comprobantes Pendientes'){
        data = response.data.filter(reporte => reporte.retentionStatus === 0)
        data = data.filter(reporte => reporte.retentionAgent === 'S')
     }else if(processName === 'Reporte Comprobantes Procesados'){
         data = response.data.filter(reporte => reporte.retentionStatus >= 1)
         data = data.filter(reporte => reporte.retentionAgent === 'S')
     }else if(status === 4){
        //arreglo = response.data.filter(reporte => reporte.payStatus === 0);
        //arreglo = arreglo.filter(reporte => reporte.retentionStatus === 0);
        //arreglo = arreglo.filter(reporte => reporte.reportStatus <= 1);
        arreglo = response.data.filter(reporte => reporte.reportStatus === 0);
        data = arreglo;

      }else{
        data = response.data.filter(reporte => reporte.reportStatus === status);
      }
        dispath(reportsJuridico(data));
        dispath(setHeaderNavegation(processName));
        dispath(setLoader(false));

        if(data.length === 0){
          const propsAlert = {
            title : ALERTS_LABELS.TITLE_SUCCESS,
            dialog : ALERTS_LABELS.WITH_OUT_RESULTS,
            leftButton : null,
            rightButton : ALERTS_LABELS.ACCEPT,
            leftWay : CLOSE,
            rightWay : CLOSE
          }
          dispath({
            type: SET_ERROR,
            payload: true,
            props: propsAlert,
        })
      }

    }).catch(error => {
          let errorObject=JSON.parse(JSON.stringify(error));
          console.log("error" + errorObject)

          const propsAlert = {
              title : ALERTS_LABELS.TITLE_ERROR,
              dialog : ALERTS_LABELS.GET_REPORT_LIST_FAILED,
              leftButton : null,
              rightButton : ALERTS_LABELS.ACCEPT,
              leftWay : CLOSE,
              rightWay : CLOSE
            }
            dispath({
              type: SET_ERROR,
              payload: true,
              props: propsAlert,
          })
        });      
  }
}

export function getReportJuridico (idReport,userName,processName,endpoint) {
  const name = processName.split('|')[0].trim();
    return dispath => {

        var URL = '';

        if(endpoint === 6){
          URL = LEGAL_REPORT_ENDPOINT+'?userName='+userName+'&id='+idReport;

      axios({
        method: 'get',
        url: URL,
      }).then((response) => { 
        if(typeof response.data.report == 'undefined'){
          dispath(summary(response.data));
        }else{
        dispath(summary(response.data.report));
      }
        dispath(setHeaderNavegation(processName));
        dispath(setLoader(false))
        
      }).catch(error => {
        let errorObject=JSON.parse(JSON.stringify(error));
        console.log("error" + errorObject)
        if(name === 'Consultar Reporte'){
          dispath(setLoader(false))
          dispath(setSearch(true))
        }
        const propsAlert = {
            title : ALERTS_LABELS.TITLE_ERROR,
            dialog : ALERTS_LABELS.GET_REPORT_FAILED,
            leftButton : null,
            rightButton : ALERTS_LABELS.ACCEPT,
            leftWay : CLOSE,
            rightWay : CLOSE
          }
          dispath({
            type: SET_ERROR,
            payload: true,
            props: propsAlert,
        })
      });

    }else if(endpoint === 9){
      dispath(getReportJuridico2(idReport,userName,processName))
   }

  }

}


export function getReportJuridico2 (idReport,userName,processName) {
  const name = processName.split('|')[0].trim();
    return dispath => {
        var URL = TAKE_LEGAL_REPORT_ENDPOINT;
        
      axios({
        method: 'get',
        url: URL,
        headers:{
          idReport : idReport,
          userName : userName,
        },
      }).then((response) => { 
        if(typeof response.data.report == 'undefined'){
          dispath(summary(response.data));
        }else{
        dispath(summary(response.data.report));
      }
        dispath(setHeaderNavegation(processName));
        dispath(setLoader(false))
        
      }).catch(error => {
        let errorObject=JSON.parse(JSON.stringify(error));
        console.log("error" + errorObject)
        if(name === 'Consultar Reporte'){
          dispath(setLoader(false))
          dispath(setSearch(true))
        }
        const propsAlert = {
            title : ALERTS_LABELS.TITLE_ERROR,
            dialog : ALERTS_LABELS.GET_REPORT_FAILED,
            leftButton : null,
            rightButton : ALERTS_LABELS.ACCEPT,
            leftWay : CLOSE,
            rightWay : CLOSE
          }
          dispath({
            type: SET_ERROR,
            payload: true,
            props: propsAlert,
        })
      }); 

  }

}





export function foundReportJuridico (idReport,userName,processName) {   
  return dispath => {
    var URL2 = LEGAL_REPORT_ENDPOINT+'?userName='+userName+'&id='+idReport;
    axios({
      method: 'get',
      url: URL2,
    }).then((response) => {

      if(response.data[0].reportStatus === 0){         
        dispath(getReportJuridico(idReport,userName,processName,9))
      }else{
          dispath(summary(response.data));
          dispath(setHeaderNavegation(processName))         
          dispath(setLoader(false))
      }

    }).catch(error => {
      
          let errorObject=JSON.parse(JSON.stringify(error));
          console.log("error" + errorObject)
          dispath(setLoader(false))
          dispath(setSearch(true))
          const propsAlert = {
              title : ALERTS_LABELS.TITLE_ERROR,
              dialog : ALERTS_LABELS.GET_REPORT_FAILED,
              leftButton : null,
              rightButton : ALERTS_LABELS.ACCEPT,
              leftWay : CLOSE,
              rightWay : CLOSE
            }
            dispath({
              type: SET_ERROR,
              payload: true,
              props: propsAlert,
          })
        });      
}
}

export function getPdf (idReport) {

var url = PDF_ENDPOINT+'?id='+idReport;
return dispath => {
  axios({
    method: 'get',
    url:url,
  }).then((response) => {
     let cantidadPdf = response.data.length;
    for(let i=0; i<=cantidadPdf;i++){

    if(typeof response.data[i] !== 'undefined'){
      let binaryString = window.atob(response.data[i].pdf);
      let binaryLength = binaryString.length;
      let bytes = new Uint8Array(binaryLength);
    
      for (let i = 0; i < binaryLength; i++) {
          let ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
      }

      var arrBuffer = bytes;

      var newBlob = new Blob([arrBuffer]);

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }
    var dataPdf = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.href = dataPdf;
    link.download = response.data[i].pdfName;
    link.click();
    window.URL.revokeObjectURL(dataPdf);
    link.remove();
    }
   }
    
  }).catch(error => {
    let errorObject=JSON.parse(JSON.stringify(error));
    console.log("error" + errorObject)
    const propsAlert = {
        title : ALERTS_LABELS.TITLE_ERROR,
        dialog : ALERTS_LABELS.GET_REPORT_PDF_FAILED,
        leftButton : null,
        rightButton : ALERTS_LABELS.ACCEPT,
        leftWay : CLOSE,
        rightWay : CLOSE
      }
      dispath({
        type: SET_ERROR,
        payload: true,
        props: propsAlert,
    })
  }); 
 }
}


export function getChangeLegalReportStatus (idReport,newReportStatus,newPayStatus,newRetentionStatus,textComment,userName) {
  
  
  return dispath => {
    axios({
      method: 'get',
      url: CHANGE_LEGAL_REPORT_STATUS_ENDPOINT,
      headers:{
        idReport : idReport,
        newReportStatus : newReportStatus,
        newPayStatus : newPayStatus,
        newRetentionStatus : newRetentionStatus,
        textComment : textComment,
        userName : userName,
      },
    }).then((response) => {
      dispath(reportsJuridico(response.data));
      dispath(setLoader(false))
      dispath(resetAll()) 
      dispath(getReportsJuridico(userName,'Gestión de pagos jurídicos',4))
         
       
    }).catch(error => {
      
          let errorObject=JSON.parse(JSON.stringify(error));
          console.log("error" + errorObject)

          const propsAlert = {
              title : ALERTS_LABELS.TITLE_ERROR,
              dialog : ALERTS_LABELS.REPORT_STATUS_FAILED,
              leftButton : null,
              rightButton : ALERTS_LABELS.ACCEPT,
              leftWay : CLOSE,
              rightWay : CLOSE
            }
            dispath({
              type: SET_ERROR,
              payload: true,
              props: propsAlert,
          })
          dispath(setLoader(false))
        });     
}

}