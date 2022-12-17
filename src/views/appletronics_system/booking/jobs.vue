<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-flex xs12>
        <!-- <vs-row>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            w="4"
            :style="bgselected0"
          >
            <vs-card type="3" style="margin: 5px" @click="selected(0)">
              <template #text>
                <v-icon style="margin-right: 5px; color: red"
                  >mdi-email-alert</v-icon
                >
                <strong
                  >Unassigned

                  <h2>{{ jobsCounts.unsigned }}</h2></strong
                >
              </template>
            </vs-card>
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            w="4"
            :style="bgselected1"
          >
            <vs-card type="3" style="margin: 5px" @click="selected(1)">
              <template #text>
                <v-icon style="margin-right: 5px; color: yellowgreen"
                  >mdi-account-check</v-icon
                >
                <strong
                  >Accepted
                  <h2>{{ jobsCounts.accepted }}</h2></strong
                >
              </template>
            </vs-card>
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            w="4"
            :style="bgselected2"
          >
            <vs-card type="3" style="margin: 5px" @click="selected(2)">
              <template #text>
                <v-icon style="margin-right: 5px; color: blue"
                  >mdi-teamviewer</v-icon
                >
                <strong
                  >Dispatch to Other ASC
                  <h2>{{ jobsCounts.asc }}</h2></strong
                >
              </template>
            </vs-card>
          </vs-col>
        </vs-row> -->
      <v-row>
        <v-col
        cols="12"
        sm="4"
      >
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
                  >Unassigned

                  <h2>{{ jobsCounts.unsigned }}</h2></strong
                >

      </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
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
                  >Accepted
                  <h2>{{ jobsCounts.accepted }}</h2></strong
                >
        
      </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
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
                  >Dispatch to Other ASC
                  <h2>{{ jobsCounts.asc }}</h2></strong
                >
        
      </v-card>
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
      </v-card-title>
      <v-data-table
        dense
        :headers="headers"
        :items="data"
        item-key="requestid"
        class="elevation-1"
        :search="search"
      >
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
          <vs-button border @click="view(item)"> View </vs-button>
        </template>
      </v-data-table>
      <v-dialog
        v-model="jobsInfo"
        hide-overlay
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
              >Job Status Update:
              <strong>{{ jobstatus }}</strong></v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items> </v-toolbar-items>
          </v-toolbar>
          <v-list three-line subheader>
            <v-subheader>Product Information</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-data-table
                  dense
                  :headers="unitsHeader"
                  :items="unitsData"
                ></v-data-table>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list three-line subheader>
            <v-subheader>Customer Information</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-row no-gutters>
                  <v-col cols="12" sm="3">
                    <v-card class="pa-2">
                      <strong>Contact Phone Number</strong><br />
                      {{ jobsData.customer.cpnumber }}<br />
                      <strong>Last Name</strong><br />
                      {{ jobsData.customer.lastname }}<br />
                      <strong>House No.</strong><br />
                      {{ jobsData.customer.houseno }}<br />
                      <strong>Location of Unit</strong><br />
                      N/A<br />
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-card class="pa-2">
                      <strong>Contact Email Address</strong><br />
                      {{ jobsData.customer.emailaddress }}<br />
                      <strong>First Name</strong><br />
                      {{ jobsData.customer.firstname }}<br />
                      <strong>Street</strong><br />
                      {{ jobsData.customer.street }}<br />
                      <strong>Special Request</strong><br />
                      {{ jobsData.customer.specialinstruction }}<br />
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-card class="pa-2">
                      <strong>Telephone No.</strong><br />
                      {{ jobsData.customer.telephoneno }}<br />
                      <strong>Middle Name</strong><br />
                      {{ jobsData.customer.middlename }}<br />
                      <strong>Barangay</strong><br />
                      {{ jobsData.customer.barangay }}<br />
                      <strong>Installer</strong><br />
                      {{ jobsData.installer }}<br />
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-card class="pa-2">
                      <strong>Contact Person</strong><br />
                      {{ jobsData.customer.contactperson }}<br />
                      <strong>Municipality</strong><br />
                      {{ jobsData.customer.mcity }}<br />
                      <strong>Date of Installation</strong><br />
                      {{ jobsData.installationdate }}<br />
                      <strong>Province</strong><br />
                      N/A<br />
                    </v-card>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-list three-line subheader>
            <v-subheader>Job Status Update</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-row no-gutters>
                  <v-col cols="12" sm="3">
                    <strong>Sales Invoice</strong><br />
                    <v-btn
                      x-small
                      color="success"
                      @click="download(jobsData.id)"
                    >
                      <v-icon>mdi-attachment</v-icon> </v-btn
                    ><br />
                    <br />
                    <v-card class="pa-1">
                      <v-autocomplete
                        v-model="tech"
                        label="Assign Tech/Installer"
                        :items="installer"
                        item-text="name"
                        item-value="value"
                        chips
                        dense
                        deletable-chips
                        small-chips
                      ></v-autocomplete>
                      <br />
                      <v-autocomplete
                        v-model="jobstatus"
                        label="Job Status"
                        :items="jobstat"
                        item-text="name"
                        item-value="value"
                        chips
                        dense
                        deletable-chips
                        small-chips
                      ></v-autocomplete>
                      <br />
                      <vs-input
                        type="date"
                        v-model="installationdateData"
                        label="Date of Installation / Site Visit"
                      />
                      <div>
                        <br />
                        <v-btn color="dark" @click="actions()">
                          <v-icon>mdi-send</v-icon>
                        </v-btn>
                      </div>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      @click="jobUpdates()"
                      color="dark"
                      dark
                      absolute
                      top
                      right
                      fab
                    >
                      <v-icon>mdi-wechat</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-dialog v-model="jobupdateDialog" max-width="500px">
          <v-card>
            <v-card-title> Job Update </v-card-title>

            <v-list three-line>
              <v-sheet
                id="scrolling-techniques-7"
                class="overflow-y-auto"
                max-height="200"
              >
                <div v-for="(item, $index) in items" v-bind:key="$index">
                  <v-subheader
                    ><strong href="#">{{ item.user }}</strong
                    >{{ " - " + item.created_at }}</v-subheader
                  >

                  <v-divider> </v-divider>

                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        v-html="item.title"
                      ></v-list-item-title>

                      <strong>{{ item.subtitle }} </strong>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-sheet>
            </v-list>
            <v-list three-line class="pa-3">
              <v-autocomplete
                v-model="reason"
                label="Reason"
                :items="reasonItem"
                item-text="name"
                item-value="value"
                chips
                dense
                deletable-chips
                small-chips
              ></v-autocomplete>
            </v-list>
            <v-list three-line class="pa-3">
              <v-textarea
                v-model="updatesData"
                outlined
                name="input-7-4"
                label="Enter Update Here"
                value=""
              ></v-textarea>
            </v-list>
            <v-card-actions>
              <v-btn color="primary" text @click="jobupdateDialog = false">
                CLOSE
              </v-btn>
              <v-btn text @click="send()">
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedID: 0,
      bgselected0: "success",
      bgselected1: "",
      bgselected2: "",
      requestID: "",
      updatesData: "",
      reason: "",
      items: [],
      jobsCounts: "",
      unitsHeader: [
        { text: "Product Category", value: "prodcategories" },
        { text: "Appliance Type", value: "appliancetype" },
        // { text: "Request Type", value: "branch.name" },
        { text: "Brand", value: "brand" },
        { text: "Qty", value: "qty" },
        { text: "Model", value: "model" },
        { text: "Serial No.", value: "serialno" },
        { text: "Unit Condition", value: "unitcondition" },
        { text: "Warranty Condition", value: "warrantycondition" },
        { text: "Date of Purchase", value: "datepurchase" },
        { text: "Demand Replacement", value: "demandreplacement" },
        { text: "Priority", value: "priority" },
      ],
      jobupdateDialog: false,
      unitsData: [],
      tech: "",
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
      },
      search: "",
      data: [],
      headers: [
        {
          text: "REF",
          align: "start",
          sortable: false,
          value: "requestid",
        },
        { text: "Branch", value: "branch.name" },
        { text: "Customer Name", value: "customer" },
        { text: "Date of Complain", value: "created_at" },
        { text: "Appliance Type/Item", value: "producttype" },
        { text: "Province", value: "customer.province" },
        { text: "City", value: "customer.mcity" },
        { text: "Barangay", value: "customer.barangay" },
        { text: "Action", value: "action" },
      ],
      jobstat: [
        { name: "Unassigned", value: "Unassigned" },
        { name: "Accepted", value: "Accepted" },
        { name: "Dispatch to Other ASC", value: "Dispatch to Other ASC" },
      ],
      installer: [
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

  computed: {},

  watch: {},

  mounted() {
    this.$store.dispatch("app_booking_sys/fetchJobs").then((res) => {
      this.data = res.data;
    });
    this.refresh(0);
  },

  methods: {
    refresh(data) {
      this.$store.dispatch("app_booking_sys/JobsCount").then((res) => {
        this.jobsCounts = res.data;
      });
      this.$store.dispatch("app_booking_sys/fetchJobs", data).then((res) => {
        this.data = res.data;
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
      Data = {
        requestID: this.requestID,
        installer: this.tech,
        status: this.jobstatus,
        installationData: this.installationdateData,
      };
      this.$store.dispatch("app_booking_sys/JobsAction", Data).then((res) => {
        this.$toast.open({
          message: res.data.msg,
          type: res.data.error,
          duration: 3000,
          // all of other options may go here
        });
        if (res.data.type == 1) {
          this.jobsInfo = false;
        }
        this.refresh(this.selectedID);
      });
    },
    view(data) {
      console.log(data);
      var status;
      if (data.status == 0) {
        status = "Unassigned";
      } else if (data.status == 1) {
        status = "Accepted";
      } else if (data.status == 2) {
        status = "Dispatch to Other ASC";
      }
      this.items = data.bk_jobs_update;
      this.tech = data.installer;
      this.jobstatus = status;
      //this.jobstat = status
      this.installationdateData = data.installationdate;
      this.jobsInfo = true;
      this.jobsData = data;
      this.unitsData = data.units;
      this.requestID = data.requestid;
    },
    selected(id) {
      if (id == 0) {
        this.bgselected0 = "success";
        this.bgselected1 = "";
        this.bgselected2 = "";
      }
      if (id == 1) {
        this.bgselected0 = "";
        this.bgselected1 = "success";
        this.bgselected2 = "";
      }
      if (id == 2) {
        this.bgselected0 = "";
        this.bgselected1 = "";
        this.bgselected2 = "success";
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
  },
};
</script>
