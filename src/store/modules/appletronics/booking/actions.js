import axios from "axios";
import rootUrl from "../../../rootUrl";

const SENDOTP = rootUrl + "/api/guest/customer/sendOtp";
const PHONEVERIFY = rootUrl + "/api/guest/customer/verify";
const SELFBOOKING = rootUrl + "/api/booking/quest/customer/store"
const STOREBOOKING = rootUrl + "/api/booking/store";
const REBOOK = rootUrl + "/api/booking/rebookrequest";
const FETCHJOBS = rootUrl + "/api/booking/jobs";
const FETCHUNASSIGNED = rootUrl + "/api/booking/unassigned";
const JOBSACTIONS = rootUrl + "/api/booking/jobs/action";
const REBOOKACTIONS = rootUrl + "/api/booking/jobs/rebookrequest";
const CANCELLEDACTIONS = rootUrl + "/api/booking/jobs/cancelled";

const JOBSUPDATE = rootUrl + "/api/booking/jobs/jobsupdate";
const GETCOUNT = rootUrl + "/api/booking/jobs/counts";
const JOBSCHECKRECORDS = rootUrl + "/api/booking/jobs/checkrecords";
const DOWNLOADSALESINVOICE = rootUrl + "/api/booking/jobs/salesinvoice/download";
const DOWNLOADADDITIONAL = rootUrl + "/api/booking/jobs/additional/download";
const UPLOADADDITIONAL = rootUrl + "/api/booking/jobs/additional/upload";
const RESTOREDATA = rootUrl + "/api/booking/restore";

const SCALATEDATA = rootUrl + "/api/booking/scalate/index";
const SCALATECREATEDATA = rootUrl + "/api/booking/scalate/create";
const SCALATESENDTHREADSDATA = rootUrl + "/api/booking/scalate/threads";
const GETSCHEDULE = rootUrl + "/api/jobs/schedules/calendar";
const GETSCALATECOUNT = rootUrl + "/api/scalate/count";
const GETNOTIFICATION = rootUrl + "/api/notification";
const VIEWNOTIFICATION = rootUrl + "/api/notification?q=2";

const TRASHJOBS = rootUrl + "/api/booking/jobs/trash";

//BOOKINGFIELDS 
const BOOKINGFIELDS = rootUrl + "/api/fetch/fields";
const CREATEFIELDS = rootUrl + "/api/create/fields";
const DELETEFIELDS = rootUrl + "/api/delete/fields";
const CREATEITEMS = rootUrl + "/api/createitem/fields";
const DELETEITEMS = rootUrl + "/api/deleteitems/fields";
const SPECAT = rootUrl + "/api/random/exec";

//REBOOK REQUEST
const GETREQUEST = rootUrl + "/api/fetch/getrequest";
//SEEN
const SEEN = rootUrl + "/api/seen/nofication"

//UPDATE SERIAL
const UPDATESERIAL = rootUrl + "/api/booking/jobs/updateserial"
//CLOSERESTORE
const CLOSERESTORE = rootUrl + "/api/booking/restore/close"
//FETCHUNIT
const FETCHUNITFIELDS = rootUrl + "/api/fetch/fields/units"
const PRINTREQUEST = rootUrl + "/api/appletronics/reports/requestform"
//TRACKING
const TRACKING = rootUrl + "/api/booking/appletronics/tracking"
const CALENDARDATA = rootUrl + "/api/jobs/tech/schedules/calendar";
 
const actions = {
   
  sendOtp(context, data) { 
    return axios
      .post(SENDOTP, data, {
        
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        context.commit("SCHEDULE_ERROR", error.response.data); // get error from backend
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading
      });
  },

  verifyPhone(context, data) { 
    return axios
      .post(PHONEVERIFY, data, {
        
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        context.commit("SCHEDULE_ERROR", error.response.data); // get error from backend
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading
      });
  },

  selfBooking(context, data) {
    let formData = new FormData();
   // ATTACHMENT
   try{
    if(data.customer.attachment[0].path){
      formData.append("attachment", data.customer.attachment[0].path);
      formData.append("attachmentN", data.customer.attachment[0].name);
    }else{
      formData.append("attachment", data.customer.attachment[0]);
    }
   }catch(error ){
    formData.append("attachment", '');
   }
   // ATTACHMENT SKETCH
   try{
    if(data.customer.sketch){
      formData.append("file", data.customer.sketch);

    }else{
      formData.append("file", '');
    }
   }catch(error ){
    formData.append("file", '');
   }
   if (typeof data.customer.region === 'object' && data.customer.region !== null) {
    formData.append("region", data.customer.region.region_code);
  } else {
    formData.append("region", data.customer.region);
  }
    //CUSTOMER INFO
    formData.append("contactperson", data.customer.contactperson);
    formData.append("cpnumber", data.customer.cpnumber);
    formData.append("emailaddress", data.customer.emailaddress);
    formData.append("firstname", data.customer.firstname);
    formData.append("lastname", data.customer.lastname);
    formData.append("middlename", data.customer.middlename);
    formData.append("houseno", data.customer.houseno);
    formData.append("mcity", data.customer.customerCity);
    formData.append("landmark", data.customer.landmark);
    formData.append("organization", data.customer.organization);
    formData.append("barangay", data.customer.barangay);
    formData.append("province", data.customer.province);
    formData.append("specialinstruction", data.customer.specialinstruction);
    formData.append("street", data.customer.street);
    formData.append("telephoneno", data.customer.telephoneno);
    formData.append("additionalrequest1", data.customer.additionalrequest1);
    formData.append("additionalrequest2", data.customer.additionalrequest2);
    formData.append("bookby", data.customer.bookby);
     
    //SURVEY LOCATION
    formData.append("surveylocation", data.customer.locationofinstallation);

    //LOCATION UNIT 
    formData.append("locanorg", data.customer.locationunit);
    //AND NAME OF ORGANIZATION
    formData.append("orgname", data.customer.organizationname);
    //REQUEST TYPE
    formData.append("identify", data.identify);
    formData.append("requestType", data.requestType);
    formData.append("requestid", data.requestid);
    formData.append("restoreid", data.restoreid);
    formData.append("rebookid", data.rebookid);
    formData.append("units", JSON.stringify(data.units));
    return axios
      .post(SELFBOOKING, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        context.commit("SCHEDULE_ERROR", error.response.data); // get error from backend
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading
      });
  },
  uploadadditional(context, data){
     let formData = new FormData();
     formData.append('file', data.file);
     formData.append('id', data.ids);
     return axios
     .post(UPLOADADDITIONAL, formData, {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     })
     .then((response) => {
       return response;
     })
 
  },
  storeBooking(context, data) {
    let formData = new FormData();
   // ATTACHMENT
   try{
    if(data.customer.attachment[0].path){
      formData.append("attachment", data.customer.attachment[0].path);
      formData.append("attachmentN", data.customer.attachment[0].name);
    }else{
      formData.append("attachment", data.customer.attachment[0]);
    }
   }catch(error ){
    formData.append("attachment", '');
   }
   // ATTACHMENT SKETCH
   try{
    if(data.customer.sketch){
      formData.append("file", data.customer.sketch);

    }else{
      formData.append("file", '');
    }
   }catch(error ){
    formData.append("file", '');
   }
   if (typeof data.customer.region === 'object' && data.customer.region !== null) {
    formData.append("region", data.customer.region.region_code);
  } else {
    formData.append("region", data.customer.region);
  }
    //CUSTOMER INFO
    formData.append("contactperson", data.customer.contactperson);
    formData.append("cpnumber", data.customer.cpnumber);
    formData.append("emailaddress", data.customer.emailaddress);
    formData.append("firstname", data.customer.firstname);
    formData.append("lastname", data.customer.lastname);
    formData.append("middlename", data.customer.middlename);
    formData.append("houseno", data.customer.houseno);
    formData.append("mcity", data.customer.customerCity);
    formData.append("landmark", data.customer.landmark);
    formData.append("organization", data.customer.organization);
    formData.append("barangay", data.customer.barangay);
    formData.append("province", data.customer.province);
    formData.append("specialinstruction", data.customer.specialinstruction);
    formData.append("street", data.customer.street);
    formData.append("telephoneno", data.customer.telephoneno);
    formData.append("additionalrequest1", data.customer.additionalrequest1);
    formData.append("additionalrequest2", data.customer.additionalrequest2);
    formData.append("bookby", data.customer.bookby);
     
    //SURVEY LOCATION
    formData.append("surveylocation", data.customer.locationofinstallation);

    //LOCATION UNIT 
    formData.append("locanorg", data.customer.locationunit);
    //AND NAME OF ORGANIZATION
    formData.append("orgname", data.customer.organizationname);
    //REQUEST TYPE
    formData.append("identify", data.identify);
    formData.append("requestType", data.requestType);
    formData.append("requestid", data.requestid);
    formData.append("restoreid", data.restoreid);
    formData.append("rebookid", data.rebookid);
    formData.append("units", JSON.stringify(data.units));
    return axios
      .post(STOREBOOKING, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        context.commit("SCHEDULE_ERROR", error.response.data); // get error from backend
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading
      });
  },
  RebookBooking(context, data) {
    let formData = new FormData();
   // ATTACHMENT
   try{
    if(data.customer.attachment[0].path){
      formData.append("attachment", data.customer.attachment[0].path);
      formData.append("attachmentN", data.customer.attachment[0].name);
    }else{
      formData.append("attachment", data.customer.attachment[0]);
    }
   }catch(error ){
    formData.append("attachment", '');
   }
   // ATTACHMENT SKETCH
   try{
    if(data.customer.sketch){
      formData.append("file", data.customer.sketch);
    }else{
      formData.append("file", '');
    }
   }catch(error ){
    formData.append("file", '');
   }
   if (typeof data.customer.region === 'object' && data.customer.region !== null) {
    formData.append("region", data.customer.region.region_code);
  } else {
    formData.append("region", data.customer.region);
  }
    //CUSTOMER INFO
    formData.append("contactperson", data.customer.contactperson);
    formData.append("cpnumber", data.customer.cpnumber);
    formData.append("emailaddress", data.customer.emailaddress);
    formData.append("firstname", data.customer.firstname);
    formData.append("lastname", data.customer.lastname);
    formData.append("middlename", data.customer.middlename);
    formData.append("houseno", data.customer.houseno);
    formData.append("mcity", data.customer.customerCity);
    formData.append("landmark", data.customer.landmark);
    formData.append("organization", data.customer.organization);
    formData.append("barangay", data.customer.barangay);
    formData.append("province", data.customer.province);
    formData.append("specialinstruction", data.customer.specialinstruction);
    formData.append("street", data.customer.street);
    formData.append("telephoneno", data.customer.telephoneno);
    formData.append("additionalrequest1", data.customer.additionalrequest1);
    formData.append("additionalrequest2", data.customer.additionalrequest2);
    formData.append("bookby", data.customer.bookby);
    //SURVEY LOCATION
    formData.append("surveylocation", data.customer.locationofinstallation);
    //LOCATION UNIT 
    formData.append("locanorg", data.customer.locationunit);
    //AND NAME OF ORGANIZATION
    formData.append("orgname", data.customer.organizationname);
    //REQUEST TYPE
    formData.append("identify", data.identify);
    formData.append("requestType", data.requestType);
    formData.append("requestid", data.requestid);
    formData.append("restoreid", data.restoreid);
    formData.append("rebookid", data.rebookid);
    formData.append("units", JSON.stringify(data.units));
    return axios
      .post(REBOOK, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        context.commit("SCHEDULE_ERROR", error.response.data); // get error from backend
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading
      });
  },
  fetchUnassigned(context, data) {
     
    const user = JSON.parse(localStorage.getItem('user'));
     
    var link
    if(user.id){
       link = FETCHUNASSIGNED+'?id='+data+'&key='+user.id
    }else{
       link = FETCHUNASSIGNED+'?id='+data
    }
    return axios.get(link).then((res) => {
      
      return res;
    });
  },
  fetchJobs(context, data) {
     
    const user = JSON.parse(localStorage.getItem('user'));
     
    var link
    if(user.id){
       link = FETCHJOBS+'?id='+data+'&key='+user.id
    }else{
       link = FETCHJOBS+'?id='+data
    }
    return axios.get(link).then((res) => {
      
      return res;
    });
  },
  JobsAction(context, data) {
  return  axios
      .post(JOBSACTIONS, {
        data,
      })
      .then((res) => {
        return res
      });
  },
  RebookAction(context, data) {
    return  axios
        .post(REBOOKACTIONS, {
          data,
        })
        .then((res) => {
          return res
        });
    },
  CancelledAction(context, data) {
    return  axios
        .post(CANCELLEDACTIONS, {
          data,
        })
        .then((res) => {
          return res
        });
    },
  JobsUpdate(context, data) {
  return  axios
      .post(JOBSUPDATE, {
        data,
      })
      .then((res) => {
       return res
      });
  },
  JobsCount(context, data) {
    const user = JSON.parse(localStorage.getItem('user'));
    var link
    if(user.id){
       link = GETCOUNT+'?key='+user.id
    }else{
       link = GETCOUNT
    }
    return  axios
        .get(link)
        .then((res) => {
         return res
        });
    },
  JobsSchedule(context, data) {
    return  axios
        .get(GETSCHEDULE)
        .then((res) => {
          return res
        });
    },
  JobsCheckRecords(context, data) {
    return  axios
        .post(JOBSCHECKRECORDS, data)
        .then((res) => {
          return res
        });
    },
  salesInvoiceDownload(context, data){
      axios
        .post(DOWNLOADSALESINVOICE, data,{responseType: 'blob'})
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data],
             {type : response.data.type}));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          console.log(fileURL)
          fileLink.setAttribute('download', 'Invoice-Attachment-'+Math.ceil(Math.random() * 1000000)+'');
          document.body.appendChild(fileLink);
          fileLink.click();
        });
  },
  DownloadAdditional(context, data){
    axios
      .post(DOWNLOADADDITIONAL, data,{responseType: 'blob'})
      .then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data],
           {type : response.data.type}));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        console.log(fileURL)
        fileLink.setAttribute('download', 'Attachment-'+Math.ceil(Math.random() * 1000000)+'');
        document.body.appendChild(fileLink);
        fileLink.click();
      });
},
  restoreBk(context, data){
      return axios.post(RESTOREDATA, data).then((res)=>{
        return res
      })
  },
  scalateBk(context, data){
    return axios.post(SCALATEDATA, data).then((res)=>{
      return res
    })
  },
  scalateCreateBk(context, data){
    return axios.post(SCALATECREATEDATA, data).then((res)=>{
      return res
    })
  },
  scalateSendThreadsBk(context, data){
    return axios.post(SCALATESENDTHREADSDATA, data).then((res)=>{
      return res
    })
  },
  calendarDATA(context, data){
    return axios.get(CALENDARDATA).then((res)=>{
      return res
    })
  },
  ScalateCount(context, data) {
    return  axios
        .get(GETSCALATECOUNT)
        .then((res) => {
         return res
        });
    },
  Notification(context, data) {
    return  axios
        .get(GETNOTIFICATION)
        .then((res) => {
          return res
        });
    },
  ViewNotification(context, data) {
    return  axios
        .get(VIEWNOTIFICATION+'&id='+data)
        .then((res) => {
          return res
        });
    },
 ///jobs/trash
  TrashJobs(context, data) {
    return  axios
        .post(TRASHJOBS,{id: data.id})
        .then((res) => {
          return res
        });
  },
 //Booking Fields Setup
  FetchFields(context, data){
      return axios.get(BOOKINGFIELDS+"?id="+data+"&list=1").then((res)=>{
        return res;
      })
  },
   //fetch unit fields
  FetchUnitFields(context, data){
      return axios.get(FETCHUNITFIELDS).then((res)=>{
        return res;
      })
},
 //Booking Fields List
 ListDropDownFields(context, data){
  return axios.get(BOOKINGFIELDS+"?list=2").then((res)=>{
    return res;
  })
  },
 //Booking Create Fields
  CreateFields(context, data){
      return axios.post(CREATEFIELDS, data).then((res)=>{
        return res;
      })
  },
  DeleteFields(context, data){
    return axios.post(DELETEFIELDS, data).then((res)=>{
      return res;
    })
  },
  CreateITEMS(context, data){
    return axios.post(CREATEITEMS, data).then((res)=>{
      return res;
    })
  },
  DeleteItems(context, data){
    return axios.post(DELETEITEMS, data).then((res)=>{
      return res;
    })
  },
  SeenNotification(context, data){
    return axios.post(SEEN, {id: data}).then((res)=>{
      return res;
    })
  },
  closeRestore(context, data){
    return axios.post(CLOSERESTORE, data).then((res)=>{
      return res
    })

  },
  updateSerial(context, data){
    return axios.post(UPDATESERIAL, data).then((res)=>{
      return res
    })
  },
  getCat(context, data){
    return axios.get(SPECAT+"?cat="+data).then((res)=>{
      return res
    })
  },
  printrequest(context, data){
    return axios.get(PRINTREQUEST+"?id="+data).then((res)=>{
      return res
    })
  },
  getRequest(context, data){
    return axios.get(GETREQUEST+"?id="+data).then((res)=>{
      return res
    })
  },
  getTracking(context, data){
    return axios.get(TRACKING+"?identify="+data.identify+"&callid="+data.callid).then((res)=>{
      return res
    })
  }
   
  
};

export default actions;
