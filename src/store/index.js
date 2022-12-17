import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

import rootUrl from "./rootUrl";
const dateUrl = rootUrl + "/api/date";
 
//MSSQL CONNECTIONS SAP B1
const mssqlDB = rootUrl + "/api/connections";
const mssqlDBUPDATE = rootUrl + "/api/connections/update";
//DATABASE CONNECTION CONFIGURATION
const DBlinkConf = rootUrl + "/api/settings/database"

import user from "./modules/user/index";
import employment from "./modules/user/employment/index";
import branch from "./modules/branch/index";
import bsched from "./modules/branch/schedule/index";
import region from "./modules/region/index";
import division from "./modules/division/index";
import department from "./modules/department/index";
import position from "./modules/position/index";
import role from "./modules/role/index";
import permission from "./modules/permission/index";

// Products
import productItem from "./modules/product/item/index";
import productBrand from "./modules/product/brand/index";
import productCategory from "./modules/product/category/index";

// Services
import serviceType from "./modules/service/type/index";
import serviceCategory from "./modules/service/category/index";
import serviceProvider from "./modules/service/provider/index";

// Tickets
import computerwareTicket from "./modules/ticket/computerware/index";
import connectivityTicket from "./modules/ticket/connectivity/index";

// Power Interruptions
import PowerInterruption from "./modules/power_interruption/index";

// Pending Transactions
import PendingTran from "./modules/pending_tran/index";

// Archived
import Archived from "./modules/government_compliance/archived/index";
// Agencies
import Agencies from "./modules/government_compliance/agencies/index";

// GetUserPermission
import UsersPermissions from "./modules/user_roles/index";
import { getLocalUser } from "../helpers/auth";
// BlackLIsted
import BlackListed from "./modules/ccs_portal/blacklisted/index";
// Digitized
import Digitized from "./modules/ccs_portal/customer_digitized/index";
const localUser = getLocalUser();
// Credit Standing
import CreditStanding from "./modules/ccs_portal/creditportal/index";
// IncomingPayment
import IncomingPayment from "./modules/ccs_portal/installment/index";
// Reconciliation
import AgingRecon from "./modules/ccs_portal/aging_recon/index";

import DunningLetters from "./modules/ccs_portal/dunning_letters/index";

//Validation Portal Template
import ValidationPortalTemplate from "./modules/validation_portal/template";

//Validation Portal Good Receipt Model - Serial Model
import ValidationPortalGoodReceiptModeToSerialModel from "./modules/validation_portal/good_receipt_model_serial_model";

//Validation Portal BP Master Data - Card Code Ar Invoice
import ValidationPortalBPMasterDataCardCodeArInvoice from "./modules/validation_portal/bp_master_data_cardcode_ar_invoice";

//Raffle Draw
import RaffleDraw from "./modules/raffle/index";

//Authorized GiftCode
import AuthorizedGiftCode1 from "./modules/sms_system/hbdgiftcode/index";

// PaymentCRB
import GeneratePaymentCRB from "./modules/sap_reports/incoming_paymentCRB/index";


// adjustment sales discount
import adjustment_sales_discount from "./modules/sap_reports/adjustment_sales_discount/index";
// ar invoice open balance
import ar_invoice_open_balance from "./modules/sap_reports/ar_invoice_open_balance/index";
// incoming payment customer deposit
import incoming_payment_customer_deposit from "./modules/sap_reports/incoming_payment_customer_deposit/index";
// incoming payment open balance
import incoming_payment_open_balance from "./modules/sap_reports/incoming_payment_open_balance/index";
// invoice query series open balance
import invoice_query_series_revised from "./modules/sap_reports/invoice_query_series_revised/index";
// marketing ar invoice
import marketing_ar_invoice from "./modules/sap_reports/marketing_ar_invoice/index";
// recomputed account
import recomputed_account from "./modules/sap_reports/recomputed_account/index";
// searching of vehicles parts
import searching_of_vehicles_parts from "./modules/sap_reports/searching_of_vehicles_parts/index";
// summary of customer deposit applied
import summary_of_customer_depostiapplied from "./modules/sap_reports/summary_of_customer_depositapplied/index";


//APPLETRONICS SYSTEM
import appletronics_booking from "./modules/appletronics/booking/index"





Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: user,
    employment: employment,
    branch: branch,
    bsched: bsched,
    region: region,
    division: division,
    department: department,
    position: position,
    role: role,
    perm: permission,
    productItem: productItem,
    productBrand: productBrand,
    productCategory: productCategory,
    serviceType: serviceType,
    serviceCategory: serviceCategory,
    serviceProvider: serviceProvider,
    computerwareTicket: computerwareTicket,
    connectivityTicket: connectivityTicket,
    powerInterruption: PowerInterruption,
    pendingTran: PendingTran,
    userPermissions: UsersPermissions,
    //Govt' Compliance
     archived: Archived,
     agencies: Agencies,
    //BlackListed
     blacklisted: BlackListed,
    //Digitized
     digitized:  Digitized,
    //CreditPortal 
     creditstanding: CreditStanding,
    //Incoming Payment
     incomingpayment: IncomingPayment,
    //Aging Reconciliation
     recon: AgingRecon,
     //Dunning Letters
     dunning: DunningLetters,
     //Raffle Draw
     raffledraw: RaffleDraw,
     //Authorized GiftCode
     Authgiftcode: AuthorizedGiftCode1,
      
     //Validation Portal Template
     validation_template: ValidationPortalTemplate,

     //Validation Portal Good Receipt Model - Serial Model 
     validation_good_receipt_serial: ValidationPortalGoodReceiptModeToSerialModel,

     //Validation Portal BP Master Data Card Code - Ar Invoice Card Code
     validation_bp_master_ar_invoice_cardcode: ValidationPortalBPMasterDataCardCodeArInvoice,

     //PaymentCRB
     paymentCRB: GeneratePaymentCRB,

     adjustment_sales_discount: adjustment_sales_discount,
     ar_invoice_open_balance: ar_invoice_open_balance,
     incoming_payment_customer_deposit: incoming_payment_customer_deposit,
     incoming_payment_open_balance: incoming_payment_open_balance,
     invoice_query_series_revised: invoice_query_series_revised,
     marketing_ar_invoice: marketing_ar_invoice,
     recomputed_account: recomputed_account,
     searching_of_vehicles_parts: searching_of_vehicles_parts,
     summary_of_customer_depostiapplied: summary_of_customer_depostiapplied,

     //APPLETRONICS BOOKING SYSTEM
     app_booking_sys: appletronics_booking
 

  },
  state: {
    serverdate: [],
    connections : [],
    database_data: [],
    windowSize: {
      width: 0,
      height: 0
    },
    drawer: true,
    loading: true,
    loading2: true,
    dialog: false,
    dialog2: false,
    snackbar: false,
    snackbarText: "",
    snackbarTimeout: 0,
    goDark: false,
    // auth
    currentUser: localUser,
    isLoggedIn: !!localUser,
    auth_error: null
  },
  getters: {

    serverDate(state) {
      return state.serverdate;
    },
    mssqlCons(state){
      return state.connections;
    },
    // auth
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    currentUser(state) {
      return state.currentUser;
    },
    authError(state) {
      return state.auth_error;
    },
    goDark(state) {
      return state.goDark;
    },
    getDBLIST(state) {
      return state.database_data
    }
  },
  mutations: {
    SET_DATE(state, data) {
      state.serverdate = data;
      console.log(state.serverdate);
    },
    SET_DBLIST(state, data){
      state.database_data = data
    },
    SET_DBCONNECTIONS(state, data){
        state.connections = data
    },
    WINDOW_SIZE(state) {
      state.windowSize.width = window.innerWidth;
      state.windowSize.height = window.innerHeight;
    },

    DRAWER_STATUS(state, status) {
      state.drawer = status;
    },
    LOADING_STATUS(state, loading) {
      state.loading = loading;
    },
    LOADING_STATUS2(state, loading) {
      state.loading2 = loading;
    },
    DIALOG_STATUS(state, dialog) {
      state.dialog = dialog;
    },
    SNACKBAR_STATUS(state, payload) {
      state.loading = false; // set loading to false
      state.snackbar = payload[0].status;
      state.snackbarText = payload[0].message;
      state.snackbarTimeout = payload[0].timeout;
      // change snackbar state afer timeout
      setTimeout(function() {
        state.snackbar = false;
      }, payload[0].timeout);
    },
    // auth
    login(state) {
      state.loading = true;
      state.auth_error = null;
    },
    loginSuccess(state, payload) {
      state.auth_error = null;
      state.isLoggedIn = true;
      state.loading = false;
      state.currentUser = Object.assign({}, payload.user, {
        token: payload.access_token
      });

      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    logout(state) {
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.currentUser = null;
      state.loading = false;
    }
  },
  actions: {
    triggerDialog(context, dialog) {
      context.commit("DIALOG_STATUS", dialog);
    },
    // auth
    login(context) {
      context.commit("login");
    },
    fetchDate(context) {
      axios.get(dateUrl).then(response => {
        context.commit("SET_DATE", response.data);
      });
    },
    // fetchDatabase(context) {
    //   axios.get(mssqlDB).then(response => {
    //     context.commit("SET_DBCONNECTIONS", response.data);
    //   });
    // },
    //SETTINGS CODES

    //DATABASE 
    //UPDATE DATABASE SELECTIONS
        updateDB(context, data){
          context.commit("LOADING_STATUS", true,{ root: true });
          axios.post(mssqlDBUPDATE, data).then(response => {
            context.commit("LOADING_STATUS", false,{ root: true });
            
            const url = new URL(window.location.pathname, window.location.origin)
            window.location.href = url.toString()
          });
        },

    //FETCH ALL DATABASE CONNECTION
        // fetchDBAll(context,data){
        //    axios.post(DBlinkConf+'/fetch',data).then(response =>{
        //          context.commit("SET_DBLIST", response.data);
        //    })
        // },
    //CREATE DATABASE CONNECTION
        createDBcon(context,data){
           return axios.post(DBlinkConf+'/create',data).then(response =>{
            let payload = [
              {
                status: true,
                message: response.data.msg,
                timeout: 3000
              }
            ];
          
            context.commit("SNACKBAR_STATUS", payload, { root: true }); // show snackbar
            return response
           })
        },
    //DELETE DATABASE CONNECTION
        deleteDBcon(context,data){
          return axios.post(DBlinkConf+'/delete',data).then(response =>{
            let payload = [
              {
                status: true,
                message: response.data.msg,
                timeout: 3000
              }
            ];
           
            context.commit("SNACKBAR_STATUS", payload, { root: true }); // show snackbar
            return response
          })
        },
    //UPDATE DATABASE CONNECTION
        updateDBcon(context,data){
          return axios.post(DBlinkConf+'/update',data).then(response =>{
            let payload = [
              {
                status: true,
                message: response.data.msg,
                timeout: 3000
              }
            ];
            
            context.commit("SNACKBAR_STATUS", payload, { root: true }); // show snackbar
            return response
          })
        }
  }
});
