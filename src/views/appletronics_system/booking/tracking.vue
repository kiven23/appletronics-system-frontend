<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-flex xs12>
        <v-row>
          <v-col cols="12" sm="12">
            <v-card class="pa-2" outlined tile> 
                  <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Call ID"
                      single-line
                      dense
                      hide-details
                    >
                    <template v-slot:append-outer>
                     <v-btn @click="searchData" dense elevation="2"
  small>
                     Search
                    </v-btn>
                    </template>
                    </v-text-field>

                    
            </v-card>
          </v-col>
        </v-row>
      </v-flex>

      <v-card-title>
        
      </v-card-title>

      <v-skeleton-loader
        class="mx-auto"
        type="table-heading, list-item-two-line, image, table-tfoot"
        :loading="loadingForTable"
      >
        <div>
           <v-data-table
            fixed-header
            v-if="identify == 1"
            dense
            :headers="headers"
            :items="data"
            item-key="requestid"
            class="elevation-1 headersk"
            :search="search"
            :items-per-page="1"
          >
            <template v-slot:item.requestid="{ item }">
              {{ item.requesttype == "REPAIR" ? "SERVICE" : item.requesttype }}
            </template>
            <template v-slot:item.callid="{ item }">
              {{ item.callid }}
            </template>
            <template v-slot:item.customer="{ item }">
              {{ item.customer.lastname }},
              {{ item.customer.firstname }}
            </template>

            <template v-slot:item.producttype="{ item }">
              <div v-if="item.units && item.units.length > 0">
                {{ item.units[0].prodcategories }}
              </div>
            </template>
            <template v-slot:item.notes="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">{{
                    truncateString(item.notes, 15)
                  }}</span>
                </template>
                <span>{{ item.notes }}</span>
              </v-tooltip>
            </template>
            <template v-slot:item.action="{ item }">
              <vs-button-group>
                <vs-button icon @click="view(item.callid)" border>
                  View More
                </vs-button>
              </vs-button-group>
            </template>
            <template v-slot:item.created_at="{ item }">
              {{
                new Date(item.created_at).toLocaleString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </template>
          </v-data-table>  
           <v-card >
        

        <v-card-text v-if="identify == 2">
          <div class="font-weight-bold ml-8 mb-2">
            UPDATES
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="pro in progress"
              :key="pro.time"
              color="success"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ pro.from }}</strong> @{{ toYYYYMMDD(new Date(pro.time)) }}
                </div>
                <div>{{ pro.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
        </div>
      </v-skeleton-loader>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    callid: { required },
    tech: { required },
  },

  data() {
    return {
       progress: [   ],
      loadingForTable: false,
      unitsHeader: [
        { text: "Product Category", value: "prodcategories" },
        { text: "Appliance Type", value: "appliancetype" },
        { text: "Brand", value: "brand" },
        { text: "Model", value: "model" },
        { text: "Serial No.", value: "serialno" },
        { text: "Warranty Condition", value: "warrantycondition" },
        { text: "Date of Purchase", value: "datepurchase" },
        { text: "Priority", value: "priority" },
      ],
      identify: 1,
      data: [],
      headers: [
        {
          text: "Ticket No",
          align: "start",
          sortable: false,
          value: "ticketno",
        },
        {
          text: "Call ID",
          align: "start",
          sortable: false,
          value: "callid",
        },
        {
          text: "Request Type",
          align: "start",
          sortable: false,
          value: "requestid",
        },
        { text: "Branch", value: "branch.name" },
        { text: "Customer Name", value: "customer.fullname" },
        { text: "Date of Complain", value: "created_at" },
        {
          text: "Call Status Reason",
          align: "start",
          sortable: false,
          value: "reason",
        },
        {
          text: "Remarks",
          align: "start",
          sortable: false,
          value: "notes",
        },
        { text: "Appliance Type/Item", value: "producttype" },
        { text: "Province", value: "customer.province" },
        { text: "City", value: "customer.mcity" },
        { text: "Barangay", value: "customer.barangay" },
        { text: "Action", value: "action" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      permissions: "userPermissions/getPermission",
    }),
    users() {
      var us = this.usersData.employment.position.id
        ? this.usersData.employment.position.id
        : "";
      return us;
    },
    callidError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.callid.$dirty) return errors;
      RequiredError = "Required CALL ID";
      !this.$v.callid.required && errors.push(RequiredError);
      return errors;
    },
    techError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.tech.$dirty) return errors;
      RequiredError = "Required CALL ID";
      !this.$v.tech.required && errors.push(RequiredError);
      return errors;
    },

     
  },

  mounted() {
  
    this.$store.dispatch("userPermissions/fetchPermission").then((res) => {
      this.perm = res.data;
    });
    this.refresh(0);
    this.usersData = this.$store.state.currentUser;
  },

  methods: {
  
    refresh(data) {
      // this.$store.dispatch("app_booking_sys/JobsCount").then((res) => {
      //   this.jobsCounts = res.data;
      //   this.loadingForCount = false;
      // });
      // this.loadingForTable = true;
      // this.$store.dispatch("app_booking_sys/fetchJobs", data).then((res) => {
      //   this.data = res.data;
      //   this.loadingForTable = false;
      // });
    },
    searchData(){
    this.identify = 1
    var data = {
        callid: this.search,
        identify: 1
      }
      this.loadingForTable = true
      this.$store.dispatch("app_booking_sys/getTracking", data).then((res) => {
        this.data = res.data;
        this.loadingForTable = false;
      });
    },
    toYYYYMMDD(date) {
        const year = date.getFullYear();
        // getMonth() returns 0 for January, 11 for December, so add 1 to get the correct month
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
    view(callid){
     
      this.identify = 2
      var data = {
          callid: callid,
          identify: 0
        }
        this.loadingForTable = true
        this.$store.dispatch("app_booking_sys/getTracking", data).then((res) => {
          this.progress = res.data;
          console.log(this.progress )
          this.loadingForTable = false;
          
        });
    }
     
     
    
     
    
  },
};
</script>
<style>
/* .floating-row {
  position: fixed;
  width: 75%; top: 90px; z-index: 100; justify-content: center; align-items: center;
  
} */

.header-container {
  position: relative; /* Set the container as relative */
  overflow: auto; /* Enable scrolling for the container */
  max-height: 500px; /* Set the maximum height of the container */
}

.my-custom-table {
  width: 100%; /* Set the width of the table */
  max-width: 3000px; /* Optional: Set a maximum width if needed */
  margin: 0 auto; /* Optional: Center the table on the page */
  overflow-x: auto; /* Enable horizontal scrolling */
}
</style>
 