<template>
  <nav>
    <v-app-bar
      dark
      app
      clipped-left
      style="background:  linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(1,3,4,0.999019676229867) 9%, rgba(121,9,20,1) 43%);border-radius: 10px;color: white; "
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer"></v-app-bar-nav-icon> -->
      <v-btn icon @click.stop="drawer">
        <v-icon>{{ toggleDrawer ? "mdi-menu" : "mdi-menu-open" }}</v-icon>
      </v-btn>
      <v-img
        src="/logo.jpg"
        max-width="40"
        max-height="40"
        style="margin: 5px"
      ></v-img>
      <v-toolbar-title>
        <strong>Appletronics Portal </strong>
        <p style="font-size: 11px">
          Appletronics Services Inc.
        </p></v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <!-- <v-tooltip-title > -->
      <strong style="text-align: center">{{
        currentUser.branch ? "" : currentUser.branch.name
      }}</strong>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="goDark">
            <v-icon>
              {{ isDark ? "mdi-brightness-4" : "mdi-brightness-7" }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ isDark ? "Go Dark" : "Go Light" }}</span>
      </v-tooltip>
           <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="logout">
            <v-icon>logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
      <!-- </v-tooltip-title> -->
      <template>
        <div class="text-center">
          <v-menu v-model="menu" :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
             

              <vs-avatar primary v-bind="attrs" v-on="on">
                <v-icon>mdi-bell-ring-outline</v-icon>
                <template #badge>
                  {{ items.count }}
                </template>
              </vs-avatar>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <strong>Notification</strong>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                      :class="fav ? 'red--text' : ''"
                      icon
                      @click="fav = !fav"
                    >
                      <v-icon>mdi-email-open-outline</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list two-line max-width="400">
                <v-list-item-group multiple>
                  <v-sheet
                    id="scrolling-techniques-7"
                    class="overflow-y-auto"
                    max-height="400"
                  >
                    <template v-for="(item, index) in items.data">
                      <v-list-item :key="item.categories" @click="view(item)">
                        <template>
                          <v-list-item-content
                            ><strong>From: {{ item.name }}</strong>
                            <v-list-item-subtitle
                              class="text--primary"
                              v-text="item.categories"
                            ></v-list-item-subtitle>
                            <v-list-item-subtitle
                              v-text="item.customername"
                            ></v-list-item-subtitle>
                            Updates:<v-list-item-subtitle
                              v-text="item.event_logs"
                            ></v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-list-item-action-text
                              v-text="item.created_at"
                            ></v-list-item-action-text>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                      <v-divider
                        v-if="index < items.length - 1"
                        :key="index"
                      ></v-divider>
                    </template>
                    <template v-for="(item, index) in items.notify">
                      <v-list-item :key="item.callid" @click="seen(item)">
                        <template>
                          <v-list-item-content>
                            <strong>BRANCH:</strong>
                            <v-list-item-subtitle
                              class="text--primary"
                              v-text="item.branch.SAP_BRANCH"
                            ></v-list-item-subtitle>
                            <strong v-if="item.requestid">TICKET-NO:</strong>
                            <v-list-item-subtitle
                              class="text--primary"
                              v-text="item.ticketno"
                            ></v-list-item-subtitle>
                            <strong v-if="item.callid">CALL-ID:</strong>
                            <v-list-item-subtitle
                              class="text--primary"
                              v-text="item.callid"
                            ></v-list-item-subtitle>
                            <strong v-if="!item.callid" style="color: green"
                              >NEW FILED</strong
                            >
                            <strong v-if="item.created_at">FILING DATE:</strong
                            ><v-list-item-subtitle
                              v-text="item.created_at"
                            ></v-list-item-subtitle>
                            <strong v-if="item.reason">STATUS:</strong
                            ><v-list-item-subtitle
                              v-text="item.reason"
                            ></v-list-item-subtitle>
                            <strong v-if="item.installer">TECH/INST:</strong
                            ><v-list-item-subtitle
                              v-text="item.installer"
                            ></v-list-item-subtitle>
                            <strong v-if="item.installationdate">DATE:</strong
                            ><v-list-item-subtitle
                              v-text="item.installationdate"
                            ></v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                      </v-list-item>
                      <v-divider
                        v-if="index < items.length - 1"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-sheet>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-menu>
          <v-dialog v-model="loadings" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Please stand by
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="viewThreads" max-width="700px">
            <v-card>
              <v-card-title> Escalation Details </v-card-title>

              <v-row>
                <v-col cols="12" sm="4">
                  <v-list three-line class="pa-6">
                    Customer <br />
                    <strong>{{ threadsData.data.customername }}</strong
                    ><br />
                    Status<br />

                    <v-chip
                      :color="
                        threadsData.data.status == '1' ? 'orange' : 'green'
                      "
                      label
                      outlined
                    >
                      {{
                        threadsData.data.status == "1" ? "Pending" : "Resolved"
                      }}</v-chip
                    ><br />
                    Category
                    <v-select
                      v-model="category"
                      :items="categories"
                      item-text="name"
                      item-value="value"
                      label=""
                      dense
                      solo
                      :disabled="threadsData.data.status == 2"
                    ></v-select>
                    <v-btn
                      class="ma-2"
                      v-if="threadsData.data.status == 1"
                      @click="updateScalate(threadsData.data.id)"
                      outlined
                      color="indigo"
                    >
                      UPDATE</v-btn
                    >
                  </v-list>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-btn
                    v-if="threadsData.data.status == 2 && checkpermission"
                    class="ma-2"
                    @click="reopen(threadsData.data.id)"
                    outlined
                    color="indigo"
                  >
                    RE OPEN</v-btn
                  >
                  <br />Escalation Date<br />
                  {{ new Date(threadsData.data.created_at).toLocaleString() }}

                  <v-card-text>
                    <div class="font-weight-bold">Updates</div>
                    <v-timeline align-top dense>
                      <v-sheet
                        id="scrolling-techniques-7"
                        class="overflow-y-auto"
                        max-height="200"
                      >
                        <v-timeline-item
                          v-for="message in threadsData.threads"
                          :key="message.created_at"
                          color="green"
                          small
                        >
                          <div>
                            <div class="font-weight-normal">
                              <strong>{{ message.from_bys }}</strong> @{{
                                message.created_at
                              }}
                            </div>
                            <div>{{ message.threads }}</div>
                          </div>
                        </v-timeline-item>
                      </v-sheet>
                    </v-timeline>
                  </v-card-text>
                  <v-list three-line class="pa-6">
                    <v-textarea
                      v-model="note"
                      outlined
                      name="input-7-4"
                      v-if="threadsData.data.status == 1"
                      value=""
                    ></v-textarea>
                    <v-col class="text-right">
                      <v-btn
                        class="ma-2"
                        v-if="threadsData.data.status == 1"
                        @click="sendThreads(threadsData.data.id)"
                        :disabled="note ? false : true"
                        color="grey"
                      >
                        SEND
                      </v-btn>
                    </v-col>
                  </v-list>
                </v-col>
              </v-row>

              <v-card-actions> </v-card-actions>
            </v-card>
          </v-dialog>
        </div> 
        </template>


  
    </v-app-bar>
   <v-dialog
        v-model="jobsInfo"
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar
            color="success"
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
              <strong>{{  jobsData.status == 0? 'Unassigned':jobsData.status == 1? 'Accepted': jobsData.status == 2? 'Dispatch to Other ASC':'Rejected' }} / {{ jobsData.callid }}</strong>
              </v-toolbar-title
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
              <v-list-item-content >
                <v-row no-gutters>
                  <v-col cols="12" sm="3">

                    <!-- INSTALLATION ACCEPTED -->
                    <v-card class="pa-2" v-if="reqtype == 'INSTALLATION'" style="height: 185px">
                    <strong>Contact Phone Number</strong><br />
                      {{ jobsData.customer.cpnumber?jobsData.customer.cpnumber  : 'N/A' }}<br />
                      <strong>Last Name</strong><br />
                      {{ jobsData.customer.lastname? jobsData.customer.lastname : 'N/A' }}<br />
                      <strong>Municipality</strong><br />
                      {{ jobsData.customer.mcity? jobsData.customer.mcity : 'N/A' }}<br />
                        <strong>Dealer Name</strong><br />
                      {{jobsData.branch.name }}<br />
                       <strong v-if="jobsData.status  != 0">Date of Installation</strong><br />
                      {{ jobsData.status  != 0? jobsData.installationdate  ?jobsData.installationdate: 'N/A': '' }} 
                    </v-card>
                    <!--END-->

                    <!-- SURVEY REQUEST -->
                 
                    <v-card class="pa-2" v-if="reqtype == 'SITE SURVEY'" style="height: 185px">
                       <strong>Contact Phone Number</strong><br />
                      {{ jobsData.customer.cpnumber?jobsData.customer.cpnumber  : 'N/A' }}<br />
                      <strong>Last Name</strong><br />
                      {{ jobsData.customer.lastname? jobsData.customer.lastname : 'N/A' }}<br />
                      <strong>Municipality</strong><br />
                      {{ jobsData.customer.mcity? jobsData.customer.mcity : 'N/A' }}<br />
                        <strong>Dealer Name</strong><br />
                      {{jobsData.branch.name }}<br />
                       <strong v-if="jobsData.status  != 0">Date of Survey</strong><br />
                      {{ jobsData.status  != 0? jobsData.installationdate   ?jobsData.installationdate: 'N/A': '' }} 
                    </v-card>
                    <!--END-->

                     <!-- REPAIR & CLEANING REQUEST -->
                    <v-card class="pa-2" v-if="reqtype == 'REPAIR' || reqtype == 'CLEANING'" style="height: 185px">
                      <strong>Contact Phone Number</strong><br />
                      {{ jobsData.customer.cpnumber?jobsData.customer.cpnumber  : 'N/A' }}<br />
                      <strong>Last Name</strong><br />
                      {{ jobsData.customer.lastname? jobsData.customer.lastname : 'N/A' }}<br />
                      <strong>Municipality</strong><br />
                      {{ jobsData.customer.mcity? jobsData.customer.mcity : 'N/A' }}<br />
                        <strong>Dealer Name</strong><br />
                      {{jobsData.branch.name }}<br />
                      
                    </v-card>
                    <!--END-->

                  </v-col>
                  <v-col cols="12" sm="3">

                     <!-- INSTALLATION ACCEPTED -->
                    <v-card class="pa-2"  v-if="reqtype == 'INSTALLATION'" style="height: 185px">
                      <strong>Contact Email Address</strong><br />
                      {{ jobsData.customer.emailaddress? jobsData.customer.emailaddress : 'N/A' }}<br />
                      <strong>First Name</strong><br />
                      {{ jobsData.customer.firstname? jobsData.customer.firstname: 'N/A'}}<br />
                        <strong>Barangay</strong><br />
                      {{ jobsData.customer.barangay? jobsData.customer.barangay : 'N/A' }}<br />
                       <strong>Name Of Organization</strong><br />
                      {{jobsData.organizationname? jobsData.organizationname : 'N/A'}}<br />
                    </v-card>
                    <!-- END -->

                    <!-- SURVEY REQUEST -->
                    <v-card class="pa-2"  v-if="reqtype == 'SITE SURVEY'" style="height: 185px">
                    <strong>Contact Email Address</strong><br />
                      {{ jobsData.customer.emailaddress? jobsData.customer.emailaddress : 'N/A' }}<br />
                      <strong>First Name</strong><br />
                      {{ jobsData.customer.firstname? jobsData.customer.firstname: 'N/A'}}<br />
                        <strong>Barangay</strong><br />
                      {{ jobsData.customer.barangay? jobsData.customer.barangay : 'N/A' }}<br />
                       <strong>Name Of Organization</strong><br />
                      {{jobsData.organizationname? jobsData.organizationname : 'N/A'}}<br />
                    </v-card>
                    <!--END-->

                    <!-- REPAIR & CLEANING REQUEST -->
                    <v-card class="pa-2"  v-if="reqtype == 'REPAIR' || reqtype == 'CLEANING'" style="height: 185px">
                      <strong>Contact Email Address</strong><br />
                      {{ jobsData.customer.emailaddress? jobsData.customer.emailaddress : 'N/A' }}<br />
                      <strong>First Name</strong><br />
                      {{ jobsData.customer.firstname? jobsData.customer.firstname: 'N/A'}}<br />
                        <strong>Barangay</strong><br />
                      {{ jobsData.customer.barangay? jobsData.customer.barangay : 'N/A' }}<br />
                        <strong>Special Request</strong><br />
                      {{ jobsData.customer.specialinstruction? jobsData.customer.specialinstruction : 'N/A'}}
                    </v-card>
                    <!--END-->

                  </v-col>

                  <v-col cols="12" sm="3">
                    <!-- INSTALLATION ACCEPTED -->
                    <v-card class="pa-2" v-if="reqtype == 'INSTALLATION'" style="height: 185px">

                      <strong>Telephone No.  </strong><br />
                      {{ jobsData.customer.telephoneno?  jobsData.customer.telephoneno :'N/A' }}<br />
                      <strong>Middle Name</strong><br />
                      {{ jobsData.customer.middlename? jobsData.customer.middlename: 'N/A' }}<br />
                      <strong>Street</strong><br />
                      {{ jobsData.customer.street? jobsData.customer.street : 'N/A' }}<br />
                      <strong>Special Request</strong><br />
                      {{ jobsData.customer.specialinstruction? jobsData.customer.specialinstruction : 'N/A'}}
                     
                    </v-card>
                    <!-- SURVEY REQUEST -->
                    <v-card class="pa-2" v-if="reqtype == 'SITE SURVEY'" style="height: 185px">
                       <strong>Telephone No.  </strong><br />
                      {{ jobsData.customer.telephoneno?  jobsData.customer.telephoneno :'N/A' }}<br />
                      <strong>Middle Name</strong><br />
                      {{ jobsData.customer.middlename? jobsData.customer.middlename: 'N/A' }}<br />
                      <strong>Street</strong><br />
                      {{ jobsData.customer.street? jobsData.customer.street : 'N/A' }}<br />
                      <strong>Special Request</strong><br />
                      {{ jobsData.customer.specialinstruction? jobsData.customer.specialinstruction : 'N/A'}}
                    </v-card>
                    <!-- REPAIR & CLEANING REQUEST -->
                    <v-card class="pa-2" v-if="reqtype == 'REPAIR' || reqtype == 'CLEANING'" style="height: 185px">
                     <strong>Telephone No.  </strong><br />
                      {{ jobsData.customer.telephoneno?  jobsData.customer.telephoneno :'N/A' }}<br />
                      <strong>Middle Name</strong><br />
                      {{ jobsData.customer.middlename? jobsData.customer.middlename: 'N/A' }}<br />
                      <strong>Street</strong><br />
                      {{ jobsData.customer.street? jobsData.customer.street : 'N/A' }}<br />
                        <strong v-if="jobsData.status  != 0">Technician</strong><br />
                       {{ jobsData.status  != 0? jobsData.installer ? jobsData.installer : ' ' :''}}<br />
                    </v-card> 

                  </v-col>
                  
                  <v-col cols="12" sm="3" >
                     <!-- INSTALLATION ACCEPTED -->
                    <v-card class="pa-2"  v-if="reqtype == 'INSTALLATION'" style="height: 185px">
                      <strong>Contact Person</strong><br />
                      {{ jobsData.customer.contactperson?jobsData.customer.contactperson :'N/A' }}<br />
                      <strong>Province</strong><br />
                      {{jobsData.customer.province}}<br />
                      <strong>House No.</strong><br />
                      {{ jobsData.customer.houseno? jobsData.customer.houseno : 'N/A' }}<br />
                       <strong v-if="jobsData.status  != 0">Installer</strong><br />
                      {{ jobsData.status  != 0?jobsData.installer  ? jobsData.installer : 'N/A' :''}}<br />
                    </v-card>
                        <!-- SURVEY REQUEST -->
                    <v-card class="pa-2"  v-if="reqtype == 'SITE SURVEY'" style="height: 185px">
                    <strong>Contact Person</strong><br />
                      {{ jobsData.customer.contactperson?jobsData.customer.contactperson :'N/A' }}<br />
                      <strong>Province</strong><br />
                      {{jobsData.customer.province}}<br />
                      <strong>House No.</strong><br />
                      {{ jobsData.customer.houseno? jobsData.customer.houseno : 'N/A' }}<br />
                        <strong v-if="jobsData.status  != 0">Technician</strong><br />
                      {{ jobsData.status  != 0?jobsData.installer ? jobsData.installer : 'N/A' :''}}<br />
                    </v-card>

                     <v-card class="pa-2" v-if="reqtype == 'REPAIR' || reqtype == 'CLEANING'" style="height: 185px">
                      <strong>Contact Person</strong><br />
                      {{ jobsData.customer.contactperson?jobsData.customer.contactperson :'N/A' }}<br />
                      <strong>Province</strong><br />
                      {{jobsData.customer.province}}<br />
                      <strong>House No.</strong><br />
                      {{ jobsData.customer.houseno? jobsData.customer.houseno : 'N/A' }}<br />
                     <strong  v-if="jobsData.status  != 0">Date of Service</strong><br />
                      {{ jobsData.status  != 0? jobsData.installationdate ?jobsData.installationdate: 'N/A': '' }} 
                    </v-card>
                  </v-col>
                </v-row>

             
              </v-list-item-content>
            </v-list-item>
          </v-list>

         
        </v-card>
         
      </v-dialog>
  
  </nav>
</template>

 
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    threadsData: { data: { status: "" } },
    viewThreads: false,

    categories: [
      { name: "Request-Wty Con", value: "Request-Wty Con" },
      { name: "Request-Replacement", value: "Request-Replacement" },
      {
        name: "Request-Technical Support",
        value: "Request-Technical Support",
      },
      { name: "Request-Admin Support", value: "Request-Admin Support" },
      {
        name: "Follow Up-Parts/Unit Arrival",
        value: "Follow Up-Parts/Unit Arrival",
      },
      { name: "Follow Up-Request Status", value: "Follow Up-Request Status" },
      {
        name: "Follow Up-Billing Related",
        value: "Follow Up-Billing Related",
      },
    ],
    category: "",
    category2: "",
    note: "",
    loadings: false,
    fav: true,
    menu: false,
    message: false,
    hints: true,

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
    unitsHeader: [
      { text: "Product Category", value: "prodcategories" },
      { text: "Appliance Type", value: "appliancetype" },
      { text: "Brand", value: "brand" },
      { text: "Model", value: "model" },
      { text: "Serial No.", value: "serialno" },
      { text: "Unit Condition", value: "unitcondition" },
      { text: "Warranty Condition", value: "warrantycondition" },
      { text: "Date of Purchase", value: "datepurchase" },
      { text: "Priority", value: "priority" },
    ],
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
        text: "Request Type",
        align: "start",
        sortable: false,
        value: "requestid",
      },
      { text: "Branch", value: "branch.name" },
      { text: "Customer Name", value: "customer.fullname" },
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
  }),
  methods: {
    change() {
      const data = { id: this.connections.connection };
      this.$store.dispatch("updateDB", data);
    },
    drawer() {
      this.$store.state.drawer = !this.$store.state.drawer;
    },

    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },

    goDark() {
      this.$store.state.goDark = !this.$store.state.goDark;
    },
    view(data) {
      this.$store
        .dispatch("app_booking_sys/ViewNotification", data.event_id)
        .then((res) => {
          this.threadsData = res.data[0];
          console.log(res.data);
        });
      this.viewThreads = true;
      // this.$socket.emit("notification", 1);
      this.$store.dispatch("app_booking_sys/Notification").then((res) => {
        this.items = res.data;
      });
    },
    seen(data) {
      if (data.requesttype == "REPAIR") {
        this.unitsHeader = [
          { text: "PRODUCT CATEGORY", value: "prodcategories" },
          { text: "APPLIANCE TYPE", value: "appliancetype" },
          { text: "Request Type", value: "problem" },
          { text: "BRAND", value: "brand" },
          // { text: "Qty", value: "qty" },
          { text: "MODEL", value: "model" },
          { text: "SERIAL NO.", value: "serialno" },
          { text: "UNIT CONDITION", value: "unitcondition" },
          { text: "WARRANTY CON", value: "warrantycondition" },
          { text: "DOP", value: "datepurchase" },
          { text: "LOCATION OF UNIT", value: "locationofinstallation" },
          { text: "PRIORITY", value: "priority" },
        ];
      } else if (data.requesttype == "CLEANING") {
        this.unitsHeader = [
          { text: "Product Category", value: "prodcategories" },
          { text: "Appliance Type", value: "appliancetype" },
          // { text: "Request Type", value: "branch.name" },
          { text: "Brand", value: "brand" },
          // { text: "QTY", value: "qty" },
          { text: "Model", value: "model" },
          { text: "Serial No.", value: "serialno" },
          { text: "Unit Condition", value: "unitcondition" },
          { text: "Warranty Condition", value: "warrantycondition" },
          { text: "Date of Purchase", value: "datepurchase" },
          { text: "LOCATION OF UNIT", value: "locationofinstallation" },
          { text: "Priority", value: "priority" },
        ];
      } else if (data.requesttype == "INSTALLATION") {
        this.unitsHeader = [
          { text: "Product Category", value: "prodcategories" },
          { text: "Appliance Type", value: "appliancetype" },
          // { text: "Request Type", value: "branch.name" },
          { text: "Brand", value: "brand" },
          // { text: "QTY", value: "qty" },
          { text: "Model", value: "model" },
          { text: "Serial No.", value: "serialno" },
          { text: "Unit Condition", value: "unitcondition" },
          { text: "Warranty Condition", value: "warrantycondition" },
          { text: "Date of Purchase", value: "datepurchase" },
          { text: "INSTALLATION ADDRESS", value: "locationofinstallation" },
          { text: "Priority", value: "priority" },
        ];
      } else if (data.requesttype == "SITE SURVEY") {
        this.unitsHeader = [
          { text: "Product Category", value: "prodcategories" },
          { text: "Appliance Type", value: "appliancetype" },
          // { text: "Request Type", value: "branch.name" },
          { text: "Brand", value: "brand" },
          // { text: "QTY", value: "qty" },
          { text: "Model", value: "model" },
          { text: "Serial No.", value: "serialno" },
          { text: "Unit Condition", value: "unitcondition" },
          { text: "Warranty Condition", value: "warrantycondition" },
          { text: "Date of Purchase", value: "datepurchase" },
          { text: "SURVEY LOCATION", value: "locationofinstallation" },
          { text: "Priority", value: "priority" },
        ];
      }

      var status;
      if (data.status == 0) {
        status = "Unassigned";
      } else if (data.status == 1) {
        status = "Accepted";
      } else if (data.status == 2) {
        status = "Dispatch to Other ASC";
      } else if (data.status == 10) {
        status = "Rejected";
      }

      this.tech = data.installer;
      this.reqtype = data.requesttype;
      this.jobstatus = status;
      this.callid = data.callid;
      this.installationdateData = data.installationdate;
      this.jobsInfo = true;
      this.jobsData = data;
      this.unitsData = data.units;
      this.requestID = data.requestid;

      this.$store.dispatch("app_booking_sys/SeenNotification", data.id);
      this.$store.dispatch("app_booking_sys/Notification").then((res) => {
        this.items = res.data;
      });
    },
    Sound() {
      var audio = new Audio("/notify.wav");
      audio.play();
    },
    sendThreads(data) {
      var datas = { scalate_id: data, thread: this.note };
      this.$store
        .dispatch("app_booking_sys/scalateSendThreadsBk", datas)
        .then((res) => {
          this.loadings = true;
          setTimeout(
            () => (
              (this.loadings = false),
              this.threadsData.threads.push(res.data[0])
            ),
            2000
          );
          this.$socket.emit("notification", 1);
        });
    },
  },

  created() {
    this.$store.dispatch("app_booking_sys/Notification").then((res) => {
      this.items = res.data;
    });
    this.usersData = this.$store.state.currentUser;
    this.sockets.subscribe("notification", (res) => {
      // const information =
      //       "Branch: " +
      //       this.items.notify[0].branch.SAP_BRANCH +
      //       ", Ticket-No: " +
      //       this.items.notify[0].ticketno +
      //       ", Created: " +
      //       this.items.notify[0].created_at;
      //     this.$toast.open({
      //       message: information,
      //       type: "success",
      //     });
      //     console.log(information);
      //     this.Sound();
      if(res !== 1){
         const information = "Branch: " + res.data.branch
                  +
                ", Ticket-No: " +
                res.data.ref  ;
                this.$toast.open({
                  message: information,
                  type: "success",
                });
              
                this.Sound(); 
      }
      this.$store.dispatch("app_booking_sys/Notification").then((res) => {
        if (JSON.stringify(this.items) !== JSON.stringify(res.data)) {
          this.items = res.data;
          
        } else {
          // The old "items" array is the same as the new response array
        }
      });
    });
    this.usersData.branch_id;
     this.sockets.subscribe("maintenance", (data) => {
      
    if (data.active === 1) {
       alert("Maintenance mode is actived")
       this.$router.push("/maintenance");
       } else if(data.active === 0){
       alert("Maintenance mode has ended please login")
       this.$router.push("/login");
    }else if(data.active === 2){
          window.location.reload(true)
    }
  });

    
  },

  computed: {
    counting() {
      return this.items;
    },
    connections() {
      return this.$store.state.connections;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },

    loadingStatus() {
      return this.$store.state.loading;
    },

    isDark() {
      return this.$store.state.goDark;
    },

    toggleDrawer() {
      return this.$store.state.drawer;
    },
  },
};
</script>
