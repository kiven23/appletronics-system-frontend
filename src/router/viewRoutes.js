import Home from "../views/Home";
import Users from "../views/users/Users";
import Employments from "../views/users/employments/Employments";
import Branches from "../views/branches/Branches";
import Bscheds from "../views/branches/schedules/Schedules";
import Regions from "../views/regions/Regions";
import Divisions from "../views/divisions/Divisions";
import Departments from "../views/departments/Departments";
import Positions from "../views/positions/Positions";
import Roles from "../views/roles/Roles";
import Permissions from "../views/permissions/Permissions";

// Products
import ProductItems from "../views/products/items/Items";
import ProductBrands from "../views/products/brands/Brands";
import ProductCategories from "../views/products/categories/Categories";

// Serives
import ServiceTypes from "../views/services/types/Types";
import ServiceCategories from "../views/services/categories/Categories";
import ServiceProviders from "../views/services/providers/Providers";

// Tickets
import ComputerwareTickets from "../views/tickets/computerwares/Computerwares";
import ConnectivityTickets from "../views/tickets/connectivities/Connectivities";

// Power Interruptions
import PowerInterruptions from "../views/power_interruptions/PowerInterruptions";

// Pending Transactions
import PendingTrans from "../views/pending_trans/PendingTrans";

// Archived For Land
import archived from "../views/government_compliance/archived_for_land/archived.vue"
// Agencies
import agencies from "../views/government_compliance/agencies/agencies.vue"
//Creding And Collection
import credit_standing from "../views/credit_collection/credit_portal/credit_portal.vue"
import black_listed from "../views/credit_collection/black_listed/blacklisted.vue"
import customer_digitized from "../views/credit_collection/customer_digitized/digitized.vue"
import installment_due from "../views/credit_collection/installment_due_of_customer/installment.vue" 
import aging_reconciliation from "../views/credit_collection/aging_reconciliation/reconciliation.vue" 
import dunning_letters from "../views/credit_collection/dunning_letters/dunning.vue";

//Validation Portal
import validation_template from "../views/validation_portal/template/template.vue"
import validation_good_receipt_serial_model from "../views/validation_portal/good_receipt_model_serial_model/good_receipt_model_serial_model.vue"
import validation_bp_master_cardcode_ar_invoice from "../views/validation_portal/bp_master_data_cardcode_ar_invoice/bp_master_data_cardcode_ar_invoice.vue"
 
//Revolving Fund
import revolving_fund from "../views/revolving_fund/revolving_fund.vue";

//Raffle Draw
import raffle from "../components/standalone/raffle.vue";

//SmS Gift Code
import giftcode from "../views/sms_system/automated_giftcode/giftcode.vue";

//SAPREPORTS
import sapreports from "../views/sap_reports/incoming_payment_crb/incoming_crb.vue";

//invoice query series revised
import sapreports_invoice_queryseries_revised from "../views/sap_reports/1193_invoice_query_series_revised/1193_invoice_query_series_revised.vue";
//marketing ar invoice query
import sapreports_marketing_ar_invoice from "../views/sap_reports/1207_marketing_ar_invoice_query/1207_marketing_ar_invoice_query.vue";
//summary of customer deposit applied
import sapreports_summary_of_customer_depositapplied from "../views/sap_reports/1231_summary_of_customer_depositapplied/1231_summary_of_customer_depositapplied.vue";
//adjustments sales discount
import sapreports_adjustment_sales_discount from "../views/sap_reports/1232_adjustments_sales_discount/1232_adjustments_sales_discount.vue";
//recomputed account
import sapreports_recomputed_account from "../views/sap_reports/1269_recomputed_account/1269_recomputed_account.vue";
//searching of vehicles parts
import sapreports_searching_vehicles_parts from "../views/sap_reports/340_query_searching_of_vehicles_parts/340_query_searching_of_vehicles_parts.vue";
//ar invoice openbalance
import sapreports_ar_invoice_openbalance from "../views/sap_reports/ar_invoice_open_balance/ar_invoice_open_balance.vue";
//incomingpayment customer deposit
import sapreports_incoming_customer_deposit from "../views/sap_reports/incoming_payment_customer_deposit/incoming_payment_customer_deposit.vue";
//incomingpayment openbalance
import sapreports_incoming_payment_openbalance from "../views/sap_reports/incoming_payment_open_balance/incoming_payment_open_balance.vue";
//database configure
import databaseconfigure from "../views/settings/database/configure.vue";



//APPLETRONICS ROUTE
import booking from "../views/appletronics_system/booking/booking.vue";
import jobs from "../views/appletronics_system/booking/jobs.vue";
import scalate from "../views/appletronics_system/booking/scalate/scalate.vue"
import booking_fields from "../views/appletronics_system/booking/booking_fields/custom_fields.vue"
import booking_items from "../views/appletronics_system/booking/booking_fields/items.vue"
const viewRoutes = [
  {
    path: "/",
    component: Home,
    name: "home",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users",
    component: Users,
    name: "users",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/branches",
    component: Branches,
    name: "branches",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/regions",
    component: Regions,
    name: "regions",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/divisions",
    component: Divisions,
    name: "divisions",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/departments",
    component: Departments,
    name: "departments",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/branch-schedules",
    component: Bscheds,
    name: "branch-schedules",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/positions",
    component: Positions,
    name: "positions",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/permissions",
    component: Permissions,
    name: "permissions",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/roles",
    component: Roles,
    name: "roles",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user-employments",
    component: Employments,
    name: "user-employments",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/product-items",
    component: ProductItems,
    name: "product-items",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/product-brands",
    component: ProductBrands,
    name: "product-brands",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/product-categories",
    component: ProductCategories,
    name: "product-categories",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/service-types",
    component: ServiceTypes,
    name: "service-types",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/service-categories",
    component: ServiceCategories,
    name: "service-categories",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/service-providers",
    component: ServiceProviders,
    name: "service-providers",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/computerware-tickets",
    component: ComputerwareTickets,
    name: "computerware-tickets",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/connectivity-tickets",
    component: ConnectivityTickets,
    name: "connectivity-tickets",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/power-interruptions",
    component: PowerInterruptions,
    name: "power-interruptions",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/pending-transactions",
    component: PendingTrans,
    name: "pending-transactions",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/archived",
    component: archived,
    name: "archived-for-land",
    meta: {
      requiresAuth: true
    }
  },
  
  {
    path: "/agencies",
    component: agencies,
    name: "agencies",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/ccs/creditstanding/dashboard",
    component: credit_standing,
    name: "credit_standing",
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/ccs/blacklisted/dashboard",
    component: black_listed,
    name: "black_listed",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/ccs/customerdigitized/dashboard",
    component: customer_digitized,
    name: "customer_digitized_req",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/ccs/installment/dashboard",
    component: installment_due,
    name: "installment",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/ccs/reconciliation/dashboard",
    component: aging_reconciliation,
    name: "reconciliation",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/ccs/dunning-letters",
    component: dunning_letters,
    name: "dunning",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/validation-portal/template",
    component: validation_template,
    name: "validation_template",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/validation-portal/good-receipt-model-serial-model",
    component: validation_good_receipt_serial_model,
    name: "validation_good_receipt_serial_model",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/validation-portal/bp-master-cardcode-ar-invoice-cardcode",
    component: validation_bp_master_cardcode_ar_invoice,
    name: "validation_bp_master_cardcode_ar_invoice",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/revolving-fund",
    component: revolving_fund,
    name: "revolving_fund",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/raffle",
    component: raffle,
    name: "raffle",
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/giftcodes/index",
    component: giftcode,
    name: "giftcode",
    meta: {
      requiresAuth: true
    }
  },
  //INCOMING PAYMENT
  {
    path: "/sapb1/reports/index",
    component: sapreports,
    name: "incomingpaymentcrb",
    meta: {
      requiresAuth: true
    }
  },

  //incomingpayment openbalance
  {
    path: "/sapb1/reports/incomingpayment/openbalance",
    component: sapreports_incoming_payment_openbalance,
    name: "incomingpayment_openbalance",
    meta: {
      requiresAuth: true
    }
  },
  //incomingpayment customer deposit
  {
    path: "/sapb1/reports/incomingpayment/customerdeposit",
    component: sapreports_incoming_customer_deposit,
    name: "incomingpayment_customer_deposit",
    meta: {
      requiresAuth: true
    }
  },
  //ar invoice openbalance
  {
    path: "/sapb1/reports/ar/openbalance",
    component: sapreports_ar_invoice_openbalance,
    name: "ar_invoice_openbalance",
    meta: {
      requiresAuth: true
    }
  },
  //searching of vehicles parts
  {
    path: "/sapb1/reports/query/searching/vehicles/parts",
    component: sapreports_searching_vehicles_parts,
    name: "searching_of_vehicles_parts",
    meta: {
      requiresAuth: true
    }
  },
  //invoice query series revised
  {
    path: "/sapb1/reports/query/series/revised",
    component: sapreports_invoice_queryseries_revised,
    name: "invoice_query_series_revised",
    meta: {
      requiresAuth: true
    }
  },
  //marketing ar invoice query
  {
    path: "/sapb1/reports/query/marketing/ar/invoice",
    component: sapreports_marketing_ar_invoice,
    name: "marketing_ar_invoice_query",
    meta: {
      requiresAuth: true
    }
  },
  //summary of customer deposit applied
  {
    path: "/sapb1/reports/query/summary/customer/depositapplied",
    component: sapreports_summary_of_customer_depositapplied,
    name: "summary_of_customer_depositapplied",
    meta: {
      requiresAuth: true
    }
  },
  //adjustments sales discount
  {
    path: "/sapb1/reports/query/adjustment/sales/discount",
    component: sapreports_adjustment_sales_discount,
    name: "adjustment_sales_discount",
    meta: {
      requiresAuth: true
    }
  },
  //recomputed account
  {
    path: "/sapb1/reports/query/recomputed/account",
    component: sapreports_recomputed_account,
    name: "recomputed_amount",
    meta: {
      requiresAuth: true
    }
  },

  //DATABASE SETTING CONFIGURE
  {
    path: "/settings/database/configure",
    component: databaseconfigure,
    name: "configure",
    meta: {
      requiresAuth: true
    }
  },

  //APPLETRONICS SYSTEM
    //BOOKING
    {
      path: "/app/booking/index",
      component: booking,
      name: "booking",
      meta: {
        requiresAuth: true
      }
    },
    //Jobs
    {
      path: "/app/booking/jobs",
      component: jobs,
      name: "jobs",
      meta: {
        requiresAuth: true
      }
    },
    //Scalate
    {
      path: "/app/booking/scalate",
      component: scalate,
      name: "scalate",
      meta: {
        requiresAuth: true
      }
    },
    //Booking Fields
  
    {
      path: "/app/booking/fields",
      component: booking_fields,
      name: "booking_fields",
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/app/booking/items",
      component: booking_items,
      name: "booking_items",
      meta: {
        requiresAuth: true
      }
    },

 
  

];
export default viewRoutes;
