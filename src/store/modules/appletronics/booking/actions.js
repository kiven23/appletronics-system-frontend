import axios from "axios";
import rootUrl from "../../../rootUrl";

const STOREBOOKING = rootUrl + "/api/booking/store";
const FETCHJOBS = rootUrl + "/api/booking/jobs";
const JOBSACTIONS = rootUrl + "/api/booking/jobs/action";
const JOBSUPDATE = rootUrl + "/api/booking/jobs/jobsupdate";
const GETCOUNT = rootUrl + "/api/booking/jobs/counts";
const JOBSCHECKRECORDS = rootUrl + "/api/booking/jobs/checkrecords";
const DOWNLOADSALESINVOICE = rootUrl + "/api/booking/jobs/salesinvoice/download";
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
 
const actions = {
  storeBooking(context, data) {
    let formData = new FormData();
    //ATTACHMENT
    formData.append("attachment", data.customer.attachment[0]);
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
  fetchJobs(context, data) {
    return axios.get(FETCHJOBS+'?id='+data).then((res) => {
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
    return  axios
        .get(GETCOUNT)
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
   
  
};

export default actions;
