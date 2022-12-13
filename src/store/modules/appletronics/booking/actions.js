import axios from "axios";
import rootUrl from "../../../rootUrl";

const STOREBOOKING = rootUrl + "/api/booking/store";

const actions = {
  storeBooking(context, data) {
  
    let formData = new FormData();
    //ATTACHMENT
    formData.append('attachment', data.customer.attachment[0]);
    //CUSTOMER INFO
    formData.append('contactperson', data.customer.contactperson);
    formData.append('cpnumber', data.customer.cpnumber);
    formData.append('emailaddress', data.customer.emailaddress);
    formData.append('firstname', data.customer.firstname);
    formData.append('lastname', data.customer.lastname);
    formData.append('middlename', data.customer.middlename);
    formData.append('houseno', data.customer.houseno);
    formData.append('mcity', data.customer.mcity);
    formData.append('organization', data.customer.organization);
    formData.append('barangay', data.customer.barangay);
    formData.append('province', data.customer.province);
    formData.append('specialinstruction', data.customer.specialinstruction);
    formData.append('street', data.customer.street);
    formData.append('telephoneno', data.customer.telephoneno);
    formData.append('additionalrequest1', data.customer.additionalrequest1);
    formData.append('additionalrequest2', data.customer.additionalrequest2);
    //REQUEST TYPE
    formData.append('requestType', data.requestType);
    formData.append('requestid', data.requestid);
    formData.append('units', JSON.stringify(data.units));
    context.commit("LOADING_STATUS", true, { root: true }); // start loading
    axios
      .post(STOREBOOKING, formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then(response => {
        console.log(response)
        // context.commit("", response.data);
        context.commit("DIALOG_STATUS", false, { root: true }); // close dialog
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading

        let payload = [
          {
            status: true,
            message: "Schedule successfully added.",
            timeout: 3000
          }
        ];
        context.commit("SNACKBAR_STATUS", payload, { root: true }); // show snackbar
      })
      .catch(error => {
        context.commit("SCHEDULE_ERROR", error.response.data); // get error from backend
        context.commit("LOADING_STATUS", false, { root: true }); // stop loading
      });
  }, 
};

export default actions;
