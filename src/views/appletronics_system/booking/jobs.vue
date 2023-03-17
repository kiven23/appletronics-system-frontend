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
        sm="3"
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

                  <h2>{{ jobsCounts.unsigned }}  </h2></strong
                >

      </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="3"
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
        sm="3"
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
            <v-col
        cols="12"
        sm="3"
      >
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
                  >Rejected
                  <h2>{{ jobsCounts.rejected }}</h2></strong
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

         <vs-button
         
          @click="refreshData"
          
         >
           <v-icon color="white">mdi-refresh</v-icon>
        </vs-button>
      </v-card-title>

      <v-data-table
        dense
        :headers="headers"
        :items="data"
        item-key="requestid"
        class="elevation-1"
        :search="search"
        :items-per-page="5"
         
      >
       <template v-slot:item.requestid="{ item }">
          {{ item.requesttype == 'REPAIR'?'SERVICE': item.requesttype}}
        </template>
         <template v-slot:item.callid="{ item }">
          {{item.callid}}
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
                  <vs-button icon  @click="trash(item)" border v-if="superadminpermission" >
                    <v-icon style="color: red"> mdi-delete-forever</v-icon>
                  </vs-button>
                 
            </vs-button-group>
        </template>
        <template v-slot:item.created_at="{ item }">
          {{new Date(item.created_at).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric',hour: '2-digit', minute:'2-digit'})}}
        </template>
      </v-data-table>
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

          <v-list three-line subheader v-if="checkpermission">
            <v-subheader v-if="superadminpermission &&  jobsData.status  != 0">Job Status Update</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-row no-gutters>
                  <v-col cols="12" sm="3">
                    
                    <strong v-if="jobsData.attachment">Sales Invoice</strong><br  />
                    <v-btn
                      v-if="jobsData.attachment"
                      x-small
                      color="success"
                      @click="download(jobsData.id)"
                    >
                      <v-icon>mdi-attachment</v-icon> </v-btn
                    ><br />
                    <br />
                    <v-card class="pa-1">
                      
                       <v-text-field 
                        label="CALL ID" 
                        v-model="callid"
                        :error-messages="callidError"
                        required
                        :disabled="callidIden"
                        @keypress="onlyNumber"
                      > 
                       </v-text-field>
                     <!-- users == 28 && users == 25 && users == 7 &&  -->
                      <!-- <v-autocomplete
                      v-if="superadminpermission &&  jobsData.status  != 0"
                        v-model="tech"
                        label="Assign Tech/Installer"
                        :items="installer"
                        item-text="name"
                        item-value="value"
                        :error-messages="techError"
                        chips
                        dense
                        deletable-chips
                        small-chips
                      ></v-autocomplete> -->
             
                      <!-- <v-autocomplete
                        v-model="jobstatus"
                        label="Job Status"
                        :items="jobstat"
                        item-text="name"
                        item-value="value"
                        chips
                        dense
                        deletable-chips
                        small-chips
                      ></v-autocomplete> -->
                      <!-- <br /> -->
                      <!-- users == 28 && users == 25 && users == 7 && -->
                      <!-- <vs-input
                      v-if="superadminpermission  &&  jobsData.status  != 0"
                        type="date"
                        v-model="installationdateData"
                        :label="reqtype == 'REPAIR' || reqtype == 'CLEANING'? 'Date Of Service': reqtype == 'INSTALLATION'? 'Date Of Installation':'Date Of Survey'"
                      >
                      </vs-input> -->
                      
                      <div>
                        <br />
                        <v-btn color="dark" @click="actions()">
                          Update CallID
                           <v-icon>mdi-send</v-icon>  
                        </v-btn>
                      </div>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <!-- <v-btn
                      @click="jobUpdates()"
                      color="dark"
                      dark
                      absolute
                      top
                      right
                      fab
                    >
                      <v-icon>mdi-wechat</v-icon>
                    </v-btn> -->
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
        // { text: "Request Type", value: "branch.name" },
        { text: "Brand", value: "brand" },
        // { text: "Qty", value: "qty" },
        { text: "Model", value: "model" },
        { text: "Serial No.", value: "serialno" },
        { text: "Unit Condition", value: "unitcondition" },
        { text: "Warranty Condition", value: "warrantycondition" },
        { text: "Date of Purchase", value: "datepurchase" },
        // { text: "Installation Address", value: "locationofinstallation" },
        { text: "Priority", value: "priority" },
      ],
      jobupdateDialog: false,
      unitsData: [],
      perm: [],
      reqtype: '',
      tech: { name: 'N/A', value: 'N/A'},
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
        branch: { name: 'N/A'}
        
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
      users(){
        var us = this.usersData.employment.position.id?this.usersData.employment.position.id:'';
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
      checkpermission(){
      return this.perm.includes("Approved");
      },
      superadminpermission(){
         return this.perm.includes("SuperAdmin");
      },
      callidIden(){
        if(this.jobsData.status == 1 || this.jobsData.status == 2){
            return true
        }else{
           return false
        }
      }
 
  },

  watch: {},

  mounted() {
    this.$store.dispatch("app_booking_sys/fetchJobs").then((res) => {
      this.data = res.data;
    });
    this.$store.dispatch("userPermissions/fetchPermission").then((res)=>{
      this.perm = res.data
    });
    this.refresh(0);
    this.usersData = this.$store.state.currentUser
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
                if (res.data.type == 1) {
                  this.jobsInfo = false;
                }
                this.refresh(this.selectedID);
              });
//} 
       
        //  else{
//alert('This Action is Only Applicable on Accepted and Distpatch STATUS')
        //  }
 
     // }
      
      
    },
    view(data) {
      if(data.requesttype == 'REPAIR'){
        this.unitsHeader =  [
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
      }else if(data.requesttype == 'CLEANING'){
                this.unitsHeader =  [
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
      }else if(data.requesttype == 'INSTALLATION'){
                this.unitsHeader =  [
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
      }else if(data.requesttype == 'SITE SURVEY'){
                this.unitsHeader =  [
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
      }else if (data.status == 10) {
        status = "Rejected";
      }
       
      this.items = data.bk_jobs_update;
      this.tech = data.installer;
      this.reqtype = data.requesttype 
      this.jobstatus = status;
      this.callid = data.callid
       //this.jobstat = data.status
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
        this.bgselected3 = "";
                 this.headers= [
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
      }
      if (id == 1) {
        this.bgselected0 = "";
        this.bgselected1 = "success";
        this.bgselected2 = "";
        this.bgselected3 = "";
         this.headers= [
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
                    text: "Sched Date",
                    align: "start",
                    sortable: false,
                    value: "installationdate",
                  },
                  
                                      {
                    text: "Tech Name",
                    align: "start",
                    sortable: false,
                    value: "installer",
                  },
                    {
                    text: "Request Type",
                    align: "start",
                    sortable: false,
                    value: "requestid",
                  },
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
                  { text: "Branch", value: "branch.name" },
                  { text: "Customer Name", value: "customer.fullname" },
                  { text: "Date of Complain", value: "created_at" },
                  { text: "Appliance Type/Item", value: "producttype" },
                  { text: "Province", value: "customer.province" },
                  { text: "City", value: "customer.mcity" },
                  { text: "Barangay", value: "customer.barangay" },
                  { text: "Action", value: "action" },
                ]
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
         this.headers= [
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
                  { text: "Branch", value: "branch.name" },
                  { text: "Customer Name", value: "customer.fullname" },
                  { text: "Date of Complain", value: "created_at" },
                  { text: "Appliance Type/Item", value: "producttype" },
                  { text: "Province", value: "customer.province" },
                  { text: "City", value: "customer.mcity" },
                  { text: "Barangay", value: "customer.barangay" },
                  { text: "Action", value: "action" },
                   
                   
                ]
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
      if ((keyCode < 48 || keyCode > 57)) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    refreshData(){
      this.refresh(this.selectedID);
       
    },
    trash(data){
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
              this.$store.dispatch("app_booking_sys/TrashJobs", data).then((res)=>{
                   this.$swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                   this.refreshData()
              })
           
        }
      })
      
    }
  },
};
</script>
