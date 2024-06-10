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
            height="300"
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
          </v-toolbar>
           <v-row no-gutters>
                  <v-col cols="12" sm="8">
                     <v-list three-line subheader dense>
                      <v-subheader>SERVICE DETAILS</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-card> 
                             <v-data-table
                                    :headers="serviceheader"
                                    :items="serviceitems"
                                    hide-default-footer
                                    dense
                              ></v-data-table>
                               <v-data-table
                                    :headers="serviceheader2"
                                    :items="serviceitems"
                                    hide-default-footer
                                    dense
                              ></v-data-table>
                          </v-card>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-list three-line subheader dense>
                      <v-subheader>ITEM DETAILS</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-card>  <v-data-table
                                    :headers="itemsdetails"
                                    :items="serviceitems"
                                    hide-default-footer
                                    dense
                              ></v-data-table>
                              </v-card>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-list three-line subheader dense>
                      <v-subheader>CLIENT DETAILS</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-card><v-data-table
                                    :headers="clientdetails"
                                    :items="serviceitems"
                                    hide-default-footer
                                    dense
                              ></v-data-table></v-card>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-list three-line subheader dense>
                      <v-subheader>CLIENT ADDRESS</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-card><v-data-table
                                    :headers="clientaddress"
                                    :items="serviceitems"
                                    hide-default-footer
                                    dense
                              ></v-data-table></v-card>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                   <v-col cols="12" sm="4">
                    <v-list three-line subheader dense>
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
                                      <v-card-text >
                                         
                                          <v-autocomplete
                                                v-model="technicianVALUE"
                                                :items="techniciaDATA"
                                                auto-select-first
                                                chips
                                                deletable-chips
                                                item-text="name"
                                                item-value="value"
                                                dense
                                                rounded
                                                small-chips
                                                solo
                                                label='Select Technician'
                                              >
                                          </v-autocomplete>
                                          <v-autocomplete
                                                v-model="transferreasonVALUE"
                                                :items="transferReasonDATA"
                                                item-text="name"
                                                item-value="value"
                                                auto-select-first
                                                chips
                                                deletable-chips
                                                dense
                                                rounded
                                                small-chips
                                                solo
                                                label='Transfer Reason'
                                              >
                                          </v-autocomplete>
                                           <v-textarea
                                                outlined
                                                name="transferremarks"
                                                label="Remarks"
                                                v-model="transferremarksVALUE"
                                                 
                                              ></v-textarea>
                                              <v-bottom-sheet
                                                    v-model="sheet1"
                                                    persistent
                                                  >
                                                    <template v-slot:activator="{ on, attrs }">
                                                      <v-btn
                                                        color="green"
                                                        dark
                                                        v-bind="attrs"
                                                        v-on="on"
                                                      >
                                                        TRANSFER
                                                      </v-btn>
                                                    </template>
                                                    <v-sheet
                                                      class="text-center"
                                                      height="200px"
                                                    >
                                                      <v-btn
                                                        class="mt-6"
                                                        text
                                                        color="error"
                                                        @click="sheet1 = !sheet1"
                                                      >
                                                        close
                                                      </v-btn>
                                                      <div class="py-3">
                                                        
WARNING: IRREVERSIBLE ACTION

⚠️ CAUTION: YOU CANNOT REVERT THIS ACTION ONCE YOU TRANSFER

Proceeding with this transfer will result in permanent changes that cannot be undone. Please ensure that you have verified all details and are certain about the recipient and the amount before initiating the transfer.<br><strong>To proceed with the transfer, click "PROCEED." If you do not wish to proceed, click "CLOSE."</strong>
                                                      
                                                      </div>
                                                      <v-btn
                                                      elevation="2"
                                                      color="primary"
                                                      outlined
                                                      small
                                                      x-small
                                                      @click="proceed(1)"
                                                        >
                                                    TRANSFER
                                                    </v-btn>
                                                    </v-sheet>
                                                  </v-bottom-sheet>
                                        </v-card-text>
                                    </v-card>
                                  </v-tab-item>
                                  <v-tab-item>
                                    <v-card flat>
                                      <v-card-text >
                                        <v-autocomplete
                                                    v-model="rescheduleVALUE"
                                                    :items="reschedulereasonDATA"
                                                    item-text="name"
                                                    item-value="value"
                                                    auto-select-first
                                                    chips
                                                    deletable-chips
                                                    dense
                                                    rounded
                                                    small-chips
                                                    solo
                                                    label='Reschedule Reason'
                                              >
                                          </v-autocomplete>
                                          <v-textarea
                                                outlined
                                                name="rescheduleremarks"
                                                v-model="rescheduleremarksVALUE"
                                                label="Remarks"
                                                 
                                          ></v-textarea>
                                           <v-date-picker v-model="scheduledate" :landscape='true'></v-date-picker>
                                            
                                            <v-bottom-sheet
                                                    v-model="sheet2"
                                                    persistent
                                                  >
                                                    <template v-slot:activator="{ on, attrs }">
                                                     
                                                      <v-btn
                                                        color="green"
                                                        dark
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        style="margin-top: 10px;"
                                                      >
                                                        RESCHEDULE
                                                      </v-btn>
                                                    </template>
                                                    <v-sheet
                                                      class="text-center"
                                                      height="200px"
                                                    >
                                                      <v-btn
                                                        class="mt-6"
                                                        text
                                                        color="error"
                                                        @click="sheet2 = !sheet2"
                                                      >
                                                        close
                                                      </v-btn>
                                                      <div class="py-3">
                                                        
WARNING: IRREVERSIBLE ACTION

⚠️ CAUTION: YOU CANNOT REVERT THIS ACTION ONCE YOU RESCHEDULE

Proceeding with this action will result in permanent changes that cannot be undone. Please ensure that you have verified all details and are certain about the recipient and the amount before initiating the action.<br><strong>To proceed with the action, click "PROCEED." If you do not wish to proceed, click "CLOSE."</strong>
                                                      
                                                      </div><v-btn
                                                      elevation="2"
                                                      color="primary"
                                                      outlined
                                                      small
                                                      x-small
                                                      @click="proceed(2)"
                                                        >
                                                    PROCEED</v-btn>
                                                    </v-sheet>
                                                  </v-bottom-sheet>
                                          </v-card-text>
                                    </v-card>
                                  </v-tab-item>
                                  <v-tab-item>
                                    <v-card flat>
                                      <v-card-text >

                                         <v-autocomplete
                                                v-model="escalateVALUE"
                                                :items="escalatetoDATA"
                                                item-text="name"
                                                item-value="value"
                                                auto-select-first
                                                chips
                                                deletable-chips
                                                dense
                                                rounded
                                                small-chips
                                                solo
                                                label='Escalate to'
                                              >
                                          </v-autocomplete>
                                          <v-autocomplete
                                                v-model="escalatereasonVALUE"
                                                :items="escalatereasonDATA"
                                                item-text="name"
                                                item-value="value"
                                                auto-select-first
                                                chips
                                                deletable-chips
                                                dense
                                                rounded
                                                small-chips
                                                solo
                                                label='Reason of Escalation'
                                              >
                                          </v-autocomplete>
                                           <v-textarea
                                                outlined
                                                name="escalatesremarks"
                                                label="Remarks"
                                                v-model="escalateremarksVALUE"
                                                 
                                              ></v-textarea>
                                              <v-bottom-sheet
                                                    v-model="sheet3"
                                                    persistent
                                                  >
                                                    <template v-slot:activator="{ on, attrs }">
                                                      <v-btn
                                                        color="green"
                                                        dark
                                                        v-bind="attrs"
                                                        v-on="on"
                                                      >
                                                        ESCALATE
                                                      </v-btn>
                                                    </template>
                                                    <v-sheet
                                                      class="text-center"
                                                      height="200px"
                                                    >
                                                      <v-btn
                                                        class="mt-6"
                                                        text
                                                        color="error"
                                                        @click="sheet3 = !sheet3"
                                                      >
                                                        close
                                                      </v-btn>
                                                      <div class="py-3">
                                                        
WARNING: IRREVERSIBLE ACTION

⚠️ CAUTION: YOU CANNOT REVERT THIS ACTION ONCE YOU ESCALATE

Proceeding with this action will result in permanent changes that cannot be undone. Please ensure that you have verified all details and are certain about the recipient and the amount before initiating the transfer.<br><strong>To proceed with the action, click "PROCEED." If you do not wish to proceed, click "CLOSE."</strong>
                                                      
                                                      </div><v-btn
                                                      elevation="2"
                                                      color="primary"
                                                      outlined
                                                      small
                                                      x-small
                                                      @click="proceed(3)"
                                                        >
                                                    PROCEED</v-btn>
                                                    </v-sheet>
                                                  </v-bottom-sheet>


                                      </v-card-text>
                                    </v-card>
                                  </v-tab-item>
                                  <v-tab-item>
                                    <v-card flat>
                                      <v-card-text >

                                          <v-autocomplete
                                                v-model="rejectreasonVALUE"
                                                :items="rejectreasonDATA"
                                                item-text="name"
                                                item-value="value"
                                                auto-select-first
                                                chips
                                                deletable-chips
                                                dense
                                                rounded
                                                small-chips
                                                solo
                                                label='Reject Reason'
                                              >
                                          </v-autocomplete>
                                           <v-textarea
                                                outlined
                                                name="rejectremarks"
                                                label="Remarks"
                                                v-model="rejectremarksVALUE"
                                                 
                                              ></v-textarea>
                                              <v-bottom-sheet
                                                    v-model="sheet4"
                                                    persistent
                                                  >
                                                    <template v-slot:activator="{ on, attrs }">
                                                      <v-btn
                                                        color="red"
                                                        dark
                                                        v-bind="attrs"
                                                        v-on="on"
                                                      >
                                                        REJECT
                                                      </v-btn>
                                                    </template>
                                                    <v-sheet
                                                      class="text-center"
                                                      height="200px"
                                                    >
                                                      <v-btn
                                                        class="mt-6"
                                                        text
                                                        color="error"
                                                        @click="sheet4 = !sheet4"
                                                      >
                                                        close
                                                      </v-btn>
                                                      <div class="py-3">
                                                        
WARNING: IRREVERSIBLE ACTION

⚠️ CAUTION: YOU CANNOT REVERT THIS ACTION ONCE YOU REJECT

Proceeding with this transfer will result in permanent changes that cannot be undone. Please ensure that you have verified all details and are certain about the recipient and the amount before initiating the action.<br><strong>To proceed with the action, click "PROCEED." If you do not wish to proceed, click "CLOSE."</strong>
                                                      
                                                      </div><v-btn
                                                      elevation="2"
                                                      color="primary"
                                                      outlined
                                                      small
                                                      x-small
                                                      @click="proceed(4)"
                                                        >
                                                    PROCEED</v-btn>
                                                    </v-sheet>
                                                  </v-bottom-sheet>

                                      </v-card-text>
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
      //TECHNICIANNAME
      techname:'',

      //LIST DATA
      techniciaDATA: [],
      transferReasonDATA: [{name: 'FOR SYSTEM RE-PROCESS', value: 'FOR SYSTEM RE-PROCESS'},{name: 'HARD TROUBLE', value: 'HARD TROUBLE'}],
      reschedulereasonDATA: [{name: 'CUSTOMER IS OUT', value: 'CUSTOMER IS OUT'},{name: 'NO POWER SUPPLY', value: 'NO POWER SUPPLY'},{name: 'NO UNIT', value: 'NO UNIT'}],
      escalatereasonDATA: [{name: 'NO FEEDBACK FROM IMPLEMENTATION', value: 'NO FEEDBACK FROM IMPLEMENTATION'},{name: 'NO FEEDBACK FROM SUPERVISOR', value: 'NO FEEDBACK FROM SUPERVISOR'}],
      escalatetoDATA: [{name: 'SERVICE MANAGER', value: 'SERVICE MANAGER'},{name: 'IMPLEMENTATION SUPERVISOR', value: 'IMPLEMENTATION SUPERVISOR'},{name: 'IMPLEMENTATION', value: 'IMPLEMENTATION'}],
      rejectreasonDATA: [{name: 'BEYOND COVERAGE AREA', value: 'BEYOND COVERAGE AREA'},{name: 'DOUBLE DISPATCH', value: 'DOUBLE DISPATCH'},{name: 'WRONG INFO/ENCODE', value: 'WRONG INFO/ENCODE'}],
     
      //V-MODEL DATA
      //TRANSFER
      technicianVALUE: '',
      transferreasonVALUE: '',
      transferremarksVALUE: '',
      //RESCHEDULE
      rescheduleVALUE: '',
      rescheduleremarksVALUE: '',
      //ESCALATE
      escalateVALUE: '',
      escalatereasonVALUE: '',
      escalateremarksVALUE: '',
      //REJECT
      rejectreasonVALUE: '',
      rejectremarksVALUE: '',



      scheduledate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      sheet4: false,
      sheet3: false,
      sheet2: false,
      sheet1: false,
      tab: null,
      tabitem: [
          'TRANSFER', 'RESCHEDULE', 'ESCALATE', 'REJECT',
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
      items: [],
      jobupdateDialog: false,
      search: "",
      data: [],
      jobsInfo: false,
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
      ] 
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
    } 
  },

  watch: {},

 async mounted() {
    const jobId = this.$route.params.jobId;
    
    // Show an alert with the parameter
     
   await this.$store.dispatch("app_technician_sys/fetchMyJobs").then((res) => {
      this.data = res.data;
      this.techname = res.data[0][0].installer
      var tech = [];
      var technician = this.data.count.technician
      technician.forEach((item, index)=>{
        tech.push({name: item.lastName+', '+item.firstName ,  value: item.lastName+', '+item.firstName}) 
      })
      this.techniciaDATA = tech

    });
    this.$store.dispatch("userPermissions/fetchPermission").then((res) => {
      this.perm = res.data;
    });
    this.refresh(0);
    this.usersData = this.$store.state.currentUser;
    ///


    
     
     if(jobId){
      var rowData = [];
          this.data[0].forEach((value, index)=> {
                if(jobId == value.id){
                  rowData = value
                }
          })
      this.view(rowData)
     }
     
     

  },

  methods: {
    newitem(){
      //TRANSFER
      this.technicianVALUE = ''
      this.transferreasonVALUE=''
      this.transferremarksVALUE=''
      //RESCHEDULE
      this.rescheduleVALUE=''
      this.rescheduleremarksVALUE=''
      //ESCALATE
      this.escalateVALUE=''
      this.escalatereasonVALUE=''
      this. escalateremarksVALUE=''
      //REJECT
      this.rejectreasonVALUE=''
      this. rejectremarksVALUE=''
    },
    activator(data){
      return this.$store.dispatch("app_technician_sys/insertDATA", data).then((res)=>{
       this.$toast.open({
        message: res.data.msg,
        type: res.data.color,
        position: "top",
        duration: 5000, // Set your desired duration
        queue: false, // Optional, set to false to prevent stacking of toasts
        containerClass: "toast-center", // Add a custom class for styling
      });
      this.sheet1 = false;
      this.sheet2 = false;
      this.sheet3 = false;
      this.sheet4 = false;
      })
    },
    types(type){
      var data;
      if(type == 1){
        data = {
          totech: this.technicianVALUE,
          reason: this.transferreasonVALUE,
          remarks: this.transferremarksVALUE,
        }
      }else if(type == 2){
        data = {
          reason: this.rescheduleVALUE,
          scheduledate: this.scheduledate,
          remarks: this.rescheduleremarksVALUE,
        }
      }else if(type == 3){
        data = {
           escalateto: this.escalateVALUE,
           reason: this.escalatereasonVALUE,
           remarks: this.escalateremarksVALUE,
        }
      }else if(type == 4){
        data = {
          reason: this.rejectreasonVALUE,
          remarks: this.rejectremarksVALUE,
        }
      }
      return data
    },
    proceed(type){
          
         const information = {
             data: {
                techname: this.techname,
                type: type,
                callid: this.callid,
                actions: {
                  info: this.types(type)
                }
             }
         }  
         this.activator(information)
          
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
     
    view(data) {
      this.newitem()
      this.jobsInfo = true;
      this.callid = data.callid
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
 
    refreshData() {
      this.refresh(this.selectedID);
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
.toast-center {
  left: 50%;
  top: auto;
  bottom: auto;
  transform: translateX(-50%);
}

</style>
 