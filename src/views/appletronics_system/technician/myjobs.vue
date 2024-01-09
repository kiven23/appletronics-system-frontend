<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-flex xs12>
        <v-row>
          <v-col cols="12" sm="12">
            <v-card
              class="pa-2"
              outlined
              tile
              
            >
              <strong
                >TOTAL JOBS
                <h4>As of {{ data.count.totaljobs.asof }}</h4></strong
              >
              <h2><strong style='margin-left: 30px'> {{ data.count.totaljobs.count }}</strong></h2>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3">
            <!-- <v-skeleton-loader
      class="mx-auto"
      max-height="80"
      type="card"
      :loading="loadingForCount"
    > -->
            <v-card
              class="pa-2"
              outlined
              tile
              :color="bgselected0"
              @click="selected(0)"
            >
              <v-icon style="margin-right: 5px; color: red"
                >mdi-email-alert</v-icon
              >
              <strong
                >UNASSIGNED

                <h2>{{ data.count.unassigned }}</h2></strong
              >
            </v-card>
            <!-- </v-skeleton-loader> -->
          </v-col>
          <v-col cols="12" sm="3">
            <!-- <v-skeleton-loader
      class="mx-auto"
      max-height="80"
      type="card"
      :loading="loadingForCount"
    > -->
            <v-card
              class="pa-2"
              outlined
              tile
              :color="bgselected1"
              @click="selected(1)"
            >
              <v-icon style="margin-right: 5px; color: yellowgreen"
                >mdi-account-check</v-icon
              >
              <strong
                >PENDING
                <h2>{{ data.count.pending }}</h2></strong
              >
            </v-card>
            <!-- </v-skeleton-loader> -->
          </v-col>
          <v-col cols="12" sm="3">
            <!-- <v-skeleton-loader
          class="mx-auto"
          max-height="80"
          type="card"
          :loading="loadingForCount"
        > -->
            <v-card
              class="pa-2"
              outlined
              tile
              :color="bgselected2"
              @click="selected(2)"
            >
              <v-icon style="margin-right: 5px; color: blue"
                >mdi-teamviewer</v-icon
              >
              <strong
                >COMPLETED
                <h2>{{ data.count.completed }}</h2></strong
              >
            </v-card>
            <!-- </v-skeleton-loader> -->
          </v-col>
          <v-col cols="12" sm="3">
            <!-- <v-skeleton-loader
          class="mx-auto"
          max-height="80"
          type="card"
          :loading="loadingForCount"
        > -->
            <v-card
              class="pa-2"
              outlined
              tile
              :color="bgselected3"
              @click="selected(3)"
            >
              <v-icon style="margin-right: 5px; color: red"
                >mdi-account-off</v-icon
              >
              <strong
                >CANCELLED
                <h2>{{ data.count.cancelled }}</h2></strong
              >
            </v-card>
            <!-- </v-skeleton-loader> -->
          </v-col>
        </v-row>
      </v-flex>

      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <vs-button @click="refreshData">
          <v-icon color="white">mdi-refresh</v-icon>
        </vs-button>
      </v-card-title>

      <v-skeleton-loader
        class="mx-auto"
        type="table-heading, list-item-two-line, image, table-tfoot"
        :loading="loadingForTable"
      >
        <div>
          <v-data-table
            fixed-header
            height="400"
            dense
            :headers="headers"
            :items="data[0]"
            item-key="requestid"
            class="elevation-1 headersk"
            :search="search"
            :items-per-page="15"
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
              <div v-for="(da, $index) in item.units" :key="$index">
                {{ da.prodcategories }}
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
              <!-- <vs-button border @click="view(item)"> View </vs-button>
          <vs-button border @click="view(item)"> Trash </vs-button> -->

              <vs-button-group>
                <vs-button icon @click="view(item)" border>
                  <v-icon> mdi-folder-open</v-icon>
                </vs-button>
                <vs-button
                  icon
                  @click="trash(item)"
                  border
                  v-if="superadminpermission"
                >
                  <v-icon style="color: red"> mdi-delete-forever</v-icon>
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
        </div>
      </v-skeleton-loader>
      <v-dialog
        v-model="jobsInfo"
        hide-overlay
        fullscreen
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar
            dark
            style="
              background: linear-gradient(
                137deg,
                rgba(0, 0, 0, 1) 9%,
                rgba(231, 95, 94, 0.5872549703475141) 100%
              );
            "
          >
            <v-btn icon dark @click="jobsInfo = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title
              ><strong>DETAILS</strong>
              
              
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn x-small @click="print(jobsData.id)">
                <v-icon>mdi-printer</v-icon>
              </v-btn></v-toolbar-items
            >
          </v-toolbar>

          
           <v-row no-gutters>
                  <v-col cols="12" sm="8">
                     <v-list three-line subheader>
                      <v-subheader>SERVICE DETAILS</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-card> 
                             <v-data-table
                                    :headers="serviceheader"
                                    :items="serviceitems"
                                    hide-default-footer
                              ></v-data-table>
                               <v-data-table
                                    :headers="serviceheader2"
                                    :items="serviceitems"
                                    hide-default-footer
                              ></v-data-table>
                          </v-card>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-list three-line subheader>
                      <v-subheader>ITEM DETAILS</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-card>  <v-data-table
                                    :headers="itemsdetails"
                                    :items="serviceitems"
                                    hide-default-footer
                              ></v-data-table>
                              </v-card>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-list three-line subheader>
                      <v-subheader>CLIENT DETAILS</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-card><v-data-table
                                    :headers="clientdetails"
                                    :items="serviceitems"
                                    hide-default-footer
                              ></v-data-table></v-card>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-list three-line subheader>
                      <v-subheader>CLIENT ADDRESS</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-card><v-data-table
                                    :headers="clientaddress"
                                    :items="serviceitems"
                                    hide-default-footer
                              ></v-data-table></v-card>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                   <v-col cols="12" sm="4">
                    <v-list three-line subheader>
                      <v-subheader>ACTIONS</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-card>
                                <v-toolbar style="margin-top: -70px"
                                >
                                  <template v-slot:extension>
                                    <v-tabs
                                      v-model="tab"
                                      align-with-title
                                    >
                                      <v-tabs-slider color="black"></v-tabs-slider>
                                      <v-tab
                                        v-for="item in tabitem"
                                        :key="item"
                                      >
                                        {{ item }}
                                      </v-tab>
                                    </v-tabs>
                                  </template>
                                </v-toolbar>

                                <v-tabs-items v-model="tab">
                                  <v-tab-item>
                                    <v-card flat>
                                      <v-card-text >1</v-card-text>
                                    </v-card>
                                  </v-tab-item>
                                  <v-tab-item>
                                    <v-card flat>
                                      <v-card-text >2</v-card-text>
                                    </v-card>
                                  </v-tab-item>
                                  <v-tab-item>
                                    <v-card flat>
                                      <v-card-text >3</v-card-text>
                                    </v-card>
                                  </v-tab-item>
                                  <v-tab-item>
                                    <v-card flat>
                                      <v-card-text >4</v-card-text>
                                    </v-card>
                                  </v-tab-item>
                                </v-tabs-items>
                              </v-card>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
           </v-row>

           
        </v-card>
         
      </v-dialog>
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
      tab: null,
      tabitem: [
          'TANSFER', 'RESCHEDULE', 'ESCALATE', 'REJECT',
        ],
      serviceheader: [
        { text: 'CALL ID', align: 'start', value: 'callid' },
        { text: 'WARRANTY CONDITION', value: 'units[0].warrantycondition' },
        { text: 'PRIORITY TYPE', value: 'units[0].priority' },
        { text: 'REPORTED DATE', value: 'created_at' },
        { text: 'SCHEDULE DATE', value: 'installationdate' }
        ],
      serviceheader2: [
      { text: 'CALL TYPE', align: 'start', value: 'requesttype' },
      { text: 'PROBLEM TYPE', value: 'problem' },
      { text: 'CUSTOMER INSTRUCTION', value: 'specialinstruction' }
     
      ],
       clientdetails: [
      { text: 'NAME', align: 'start', value: 'customer.fullname' },
      { text: 'BRANCH', value: 'branch.name' },
      { text: 'CONTACT NO', value: 'customer.cpnumber' },
      { text: 'CONTACT PERSON', value: 'customer.contactperson' }
     
      ],
       itemsdetails: [
      { text: 'BRAND', align: 'start', value: 'units[0].brand' },
      { text: 'PROD CAT', value: 'units[0].prodcategories' },
      { text: 'MODEL', value: 'units[0].model' },
      { text: 'SERIAL', value: 'units[0].serialno' },
      { text: 'DATE OF PURCHASE', value: 'units[0].datepurchase' }
      ],
       clientaddress: [
      { text: 'BARANGAY', align: 'start', value: 'customer.barangay' },
      { text: 'CITY', value: 'customer.mcity' },
      { text: 'PROVINCE', value: 'customer.province' },
      { text: 'LANDMARK', value: 'landmark' }
     
      ],
      serviceitems: [],


      printid: "",
      loadingForCount: true,
      loadingForTable: true,
      usersData: [],
      callid: "",
      selectedID: 0,
      bgselected0: "success",
      bgselected1: "",
      bgselected2: "",
      bgselected3: "",
      requestID: "",
      updatesData: "",
      reason: "",
      items: [],
      jobsCounts: "",
       
      jobupdateDialog: false,
      unitsData: [],
      perm: [],
      reqtype: "",
      tech: { name: "N/A", value: "N/A" },
      jobstatus: "",
      jobsInfo: false,
      jobsData: {
        customer: {
          firstname: "",
          lastname: "",
          middlename: "",
          barangay: "",
          contactperson: "",
          cpnumber: "",
          emailaddress: "",
          houseno: "",
          mcity: "",
          organization: "",
          province: "",
          specialinstruction: "",
          street: "",
          telephoneno: "",
        },
        branch: { name: "N/A" },
      },
      search: "",
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
      jobstat: [
        { name: "Unassigned", value: "Unassigned" },
        { name: "Accepted", value: "Accepted" },
        //{ name: "Dispatch to Other ASC", value: "Dispatch to Other ASC" },
      ],
      installer: [
        { name: "N/A", value: "N/A" },
        { name: "Mike Doe", value: "Mike Doe" },
        { name: "Linux Doe", value: "Linux Doe" },
        { name: "James Doe", value: "James Doe" },
      ],
      reasonItem: [
        { name: "Rescheduled", value: "Rescheduled" },
        { name: "Parts", value: "Parts" },
        { name: "Under Observation", value: "Under Observation" },
        { name: "Quotation Approval", value: "Quotation Approval" },
        { name: "Waiting Permit", value: "Waiting Permit" },
        { name: "Follow-Up", value: "Follow-Up" },
        { name: "BP-Service Update", value: "BP-Service Update" },
        { name: "Unit Replacement", value: "Unit Replacement" },
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
    checkpermission() {
      return this.perm.includes("Approved");
    },
    superadminpermission() {
      return this.perm.includes("SuperAdmin");
    },
    callidIden() {
      if (this.jobsData.status == 1 || this.jobsData.status == 2) {
        return true;
      } else {
        return false;
      }
    },
  },

  watch: {},

  mounted() {
    this.$store.dispatch("app_technician_sys/fetchMyJobs").then((res) => {
      this.data = res.data;
    });
    this.$store.dispatch("userPermissions/fetchPermission").then((res) => {
      this.perm = res.data;
    });
    this.refresh(0);
    this.usersData = this.$store.state.currentUser;
  },

  methods: {
    unlichange(data) {
      this.$store.dispatch("app_booking_sys/updateSerial", data);
    },
    refresh(data) {
      this.loadingForTable = true;
      this.$store
        .dispatch("app_technician_sys/fetchMyJobs", data)
        .then((res) => {
          this.data = res.data;
          this.loadingForTable = false;
        });
    },
    send() {
      let Data;
      Data = {
        requestID: this.requestID,
        reason: this.reason,
        updates: this.updatesData,
      };
      this.$store.dispatch("app_booking_sys/JobsUpdate", Data).then((res) => {
        this.items = res.data;
        if (res.data.msg) {
          this.$toast.open({
            message: res.data.msg,
            type: res.data.error,
            // all of other options may go here
          });
        }
        this.$toast.open({
          message: "Success Sent..!",
          type: "success",
          // all of other options may go here
        });
      });
    },
    actions() {
      let Data;
      this.$v.callid.$touch();

      // if(!this.$v.callid.$error ){
      Data = {
        requestID: this.requestID,
        installer: this.tech,
        status: this.jobstatus,
        callid: this.callid,
        installationData: this.installationdateData,
      };
      // if(this.jobstatus !== 'Unassigned'){

      this.$store.dispatch("app_booking_sys/JobsAction", Data).then((res) => {
        this.$toast.open({
          message: res.data.msg,
          type: res.data.error,
          duration: 5000,
          // all of other options may go here
        });
        this.$socket.emit("notification", 1);
        if (res.data.type == 1) {
          this.jobsInfo = false;
        }
        //this.refresh(this.selectedID);
      });
      //}

      //  else{
      //alert('This Action is Only Applicable on Accepted and Distpatch STATUS')
      //  }

      // }
    },
    print() {
      var currentDate = new Date();
      var id = btoa(
        btoa(
          btoa(
            btoa(
              this.printid +
                "-" +
                "stevefox_linux23theMaster" +
                "-" +
                "38840078394" +
                currentDate
            )
          )
        )
      );
      var second = btoa(btoa(btoa(btoa(id))));

      var url = `${this.$URLs.backend}/api/appletronics/reports/requestform?print=${second}`;
      window.open(url, "_blank");
    },
    view(data) {
      
    
      this.jobsInfo = true;
      console.log(data)
 
      this.serviceitems = [data]
  
      
    },
    selected(id) {
      if (id == 0) {
        this.bgselected0 = "success";
        this.bgselected1 = "";
        this.bgselected2 = "";
        this.bgselected3 = "";
      }
      if (id == 1) {
        this.bgselected0 = "";
        this.bgselected1 = "success";
        this.bgselected2 = "";
        this.bgselected3 = "";
      }
      if (id == 2) {
        this.bgselected0 = "";
        this.bgselected1 = "";
        this.bgselected2 = "success";
        this.bgselected3 = "";
      }
      if (id == 3) {
        this.bgselected0 = "";
        this.bgselected1 = "";
        this.bgselected2 = "";
        this.bgselected3 = "success";
      }
      this.selectedID = id;
      this.refresh(id);
    },
    download(id) {
      let ids = {
        id: id,
      };
      this.$store.dispatch("app_booking_sys/salesInvoiceDownload", ids);
    },
    jobUpdates() {
      this.jobupdateDialog = true;
    },
    onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    refreshData() {
      this.refresh(this.selectedID);
    },
    truncateString(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.substring(0, maxLength) + "...";
      }
    },
    trash(data) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("app_booking_sys/TrashJobs", data)
              .then((res) => {
                this.$swal.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
                this.refreshData();
              });
          }
        });
    },
    updatedserial(data) {
      var msg;
      if (data.serialstatus != 1) {
        if (this.checkpermission) {
          msg = "Please Yes to proceed.";
        } else {
          msg = "You won't be able to revert this. You can do this at once.";
        }
      }

      this.$swal
        .fire({
          title: "Are you sure?",
          text: msg,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Update Serial!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("app_booking_sys/updateSerial", data)
              .then((res) => {
                this.$swal.fire(
                  "Update!",
                  "The Serial has been update to Serial: " + data.value,
                  "success"
                );
              });
            this.refreshData();
            this.jobsInfo = false;
          }
        });
    },
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
 