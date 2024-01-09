import axios from "axios";
import rootUrl from "../../../rootUrl";

 
const FETCHMYJOBS = rootUrl + "/api/technician/myjobs";
 
const actions = { 
  fetchMyJobs(context, data) {
    return axios.get(FETCHMYJOBS+'?state='+data).then((res) => {
      return res;
    });
  }, 
  // updateSerial(context, data){
  //   return axios.post(UPDATESERIAL, data).then((res)=>{
  //     return res
  //   })
  // },
 
};

export default actions;
