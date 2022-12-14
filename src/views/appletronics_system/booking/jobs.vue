<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-flex xs12>
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <vs-card type="3" style="margin: 5px">
              <template #text>
                <v-icon style="margin-right: 5px; color: red"
                  >mdi-email-alert</v-icon
                >
                <strong
                  >Unassigned
                  <h2>1</h2></strong
                >
              </template>
            </vs-card>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <vs-card type="3" style="margin: 5px">
              <template #text>
                <v-icon style="margin-right: 5px; color: yellowgreen"
                  >mdi-account-check</v-icon
                >
                <strong
                  >Accepted
                  <h2>4</h2></strong
                >
              </template>
            </vs-card>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <vs-card type="3" style="margin: 5px">
              <template #text>
                <v-icon style="margin-right: 5px; color: blue"
                  >mdi-teamviewer</v-icon
                >
                <strong
                  >Dispatch to Other ASC
                  <h2>3</h2></strong
                >
              </template>
            </vs-card>
          </vs-col>
        </vs-row>
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
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="jobsInfo = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Job Status Update: <strong>{{jobstat}}</strong></v-toolbar-title>
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
                      {{jobsData.customer.cpnumber}}<br />
                      <strong>Last Name</strong><br />
                      {{jobsData.customer.lastname}}<br />
                      <strong>House No.</strong><br />
                      {{jobsData.customer.houseno}}<br />
                      <strong>Location of Unit</strong><br />
                       N/A<br />
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-card class="pa-2">
                      <strong>Contact Email Address</strong><br />
                      {{jobsData.customer.emailaddress}}<br />
                      <strong>First Name</strong><br />
                      {{jobsData.customer.firstname}}<br />
                      <strong>Street</strong><br />
                      {{jobsData.customer.street}}<br />
                      <strong>Special Request</strong><br />
                      {{jobsData.customer.specialinstruction}}<br />
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-card class="pa-2">
                      <strong>Telephone No.</strong><br />
                      {{jobsData.customer.telephoneno}}<br />
                      <strong>Middle Name</strong><br />
                      {{jobsData.customer.middlename}}<br />
                      <strong>Barangay</strong><br />
                      {{jobsData.customer.barangay}}<br />
                      <strong>Installer</strong><br />
                      N/A<br />
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-card class="pa-2">
                      <strong>Contact Person</strong><br />
                      {{jobsData.customer.contactperson}}<br />
                      <strong>Municipality</strong><br />
                      {{jobsData.customer.mcity}}<br />
                      <strong>Date of Installation</strong><br />
                      N/A<br />
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
                    <v-card class="pa-2" outlined tile>
                      <v-autocomplete
                        v-model="jobstatus"
                        label="Job Status"
                        :items="jobstat"
                        item-text="name"
                        item-value="value"
                        chips
                        deletable-chips
                        small-chips
                      ></v-autocomplete>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-card class="pa-2" outlined tile>
                      <strong>Attachment</strong><br/>
                    </v-card>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
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
      unitsData: [],
      jobstatus: '',
      jobsInfo: false,
      jobsData: {
        customer: {
          firstname:	"",
          lastname:	"",
          middlename:	"",
          barangay:	"",
          contactperson:	"",
          cpnumber:	"",
          emailaddress:	"",
          houseno:	"",
          mcity:	"",
          organization:	"",
          province:	"",
          specialinstruction:	"",
          street:	"",
          telephoneno:	"",
        }
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
        {name: 'Unassigned', value: 0},
        {name: 'Accepted', value: 1},
        {name: 'Dispatch to Other ASC', value: 2}
      ]
    };
  },

  computed: {},

  watch: {},

  created() {
    this.$store.dispatch("app_booking_sys/fetchJobs").then((res) => {
      this.data = res.data;
    });
  },

  methods: {
    view(data) {
      var status;
      if(data.status == 0){
        status = 'Unassigned'
      }else if(data.status == 1){
        status = 'Accepted'
      }else if(data.status == 2){
        status = 'Dispatch to Other ASC'
      }
      this.jobstat = status
      this.jobstatus = status
      this.jobsInfo = true;
      this.jobsData = data
      this.unitsData = data.units
     
    },
  },
};
</script>
