import axios from "axios";
import rootUrl from "../../../rootUrl";

 
const FETCHMYJOBS = rootUrl + "/api/technician/myjobs";
const INSERTDATA = rootUrl + "/api/technician/myjobs/insert";

const actions = { 
  fetchMyJobs(context, data) {
    return axios.get(FETCHMYJOBS+'?state='+data).then((res) => {
      return res;
    });
  }, 
  insertDATA(context, data){
    return axios.post(INSERTDATA, data).then((res)=>{
      return res
    })
  },
 
};

export default actions;
