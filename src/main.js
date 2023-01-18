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
 
Vue.use(VueToast);
 
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
/* Establish Connection */
  const socketConnection = SocketIO('http://192.168.1.19:3333');
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
