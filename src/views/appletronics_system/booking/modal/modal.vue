<!-- JobsInfoM.vue -->
<template>
  <div>
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
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "JobsInfoM",
  props: {
    jobsInfo: Boolean
  },
  data() {
    return {
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
    };
  }
};
</script>
