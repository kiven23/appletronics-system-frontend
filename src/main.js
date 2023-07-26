import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import moment from "moment";
import { initialize } from "./helpers/general";
import Vuesax from 'vuesax'
import VueHtmlToPaper from 'vue-html-to-paper';
import 'vuesax/dist/vuesax.css' //Vuesax styles
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { URLs } from '../src/globalurl'
import VueSweetalert2 from 'vue-sweetalert2';
Vue.prototype.$URLs = URLs;
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueToast);
Vue.use(VueSweetalert2);

 
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
import VUppercase from 'v-uppercase'
Vue.use(VUppercase)
/* Establish Connection */
  const socketConnection = SocketIO(URLs.socketIO);
  Vue.use(new VueSocketIO({
     debug: false,
     connection:socketConnection 
   })
  );
var vueAwesomeCountdown = require('vue-awesome-countdown').default;
 
Vue.use(vueAwesomeCountdown);

Vue.use(Vuesax, {
  // options here
})
 
Vue.use(VueHtmlToPaper);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.moment = moment;
 
initialize(store, router);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
