import Axios from "axios";

import Vue from "vue";
import Vuetify from "vuetify/lib";
import VuetifyDialog from "vuetify-dialog";
import { Ripple } from "vuetify/lib/directives";
import "vuetify-dialog/dist/vuetify-dialog.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
var colors = false;
Axios.get('http://192.168.1.19:8009/api/change/background').then((res)=>{
   colors = true;

})

Vue.use(Vuetify, {
  directives: { Ripple }
});

 Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
});

let vuetify = new Vuetify({
  theme: { dark: colors }
 
});
console.log(colors)
 
export default vuetify;
