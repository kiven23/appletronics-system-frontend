 import axios from "axios";
 import rootUrl from "../../rootUrl";
 const indexUrl = rootUrl + "/api/auth/roles";
 const permissionsUrl = rootUrl + "/api/auth/permissions";
const actions = {
  fetchPermissions(context) {
    context.commit("LOADING_STATUS", true, { root: true }); // start loading
    axios.post(indexUrl).then(response => {
      context.commit("GET_PERMISSIONS", response.data);
      context.commit("LOADING_STATUS", false, { root: true });
    });
  },
  fetchPermission(context) {
    context.commit("LOADING_STATUS", true, { root: true }); // start loading
 return   axios.post(permissionsUrl).then(response => {
      context.commit("GET_PERMISSION", response.data);
      context.commit("LOADING_STATUS", false, { root: true });
      return response;
    });
  },
 
};

export default actions;
