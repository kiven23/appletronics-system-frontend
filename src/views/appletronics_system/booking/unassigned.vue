<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-flex xs12>
 
        <v-row>
          <v-col cols="12" sm="3">
            <v-skeleton-loader
              class="mx-auto"
              max-height="80"
              type="card"
              :loading="loadingForCount"
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
                  >NEW

                  <h2>22</h2></strong
                >
              </v-card>
            </v-skeleton-loader>
          </v-col>
          <v-col cols="12" sm="3">
            <v-skeleton-loader
              class="mx-auto"
              max-height="80"
              type="card"
              :loading="loadingForCount"
            >
              <v-card
                class="pa-2"
                outlined
                tile
                :color="bgselected4"
                @click="selected(3)"
                
              >
                <v-icon style="margin-right: 5px; color: red"> </v-icon>
                <strong
                  >CUSTOMER CANNOT BE REACH 

                  <h2> 22</h2></strong
                >
              </v-card>
            </v-skeleton-loader>
          </v-col>
          <v-col cols="12" sm="3">
            <v-skeleton-loader
              class="mx-auto"
              max-height="80"
              type="card"
              :loading="loadingForCount"
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
                  >CUSTOMER REQUEST
                  <h2>22</h2></strong
                >
              </v-card>
            </v-skeleton-loader>
          </v-col>
          <v-col cols="12" sm="3">
            <v-skeleton-loader
              class="mx-auto"
              max-height="80"
              type="card"
              :loading="loadingForCount"
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
                  >FOR REJECTION
                  <h2>22</h2></strong
                >
              </v-card>
            </v-skeleton-loader>
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
            :items="data"
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
              >Job Status Update:
              <strong
                > {{
                  selectedID == 0  ? "Unassigned"  : selectedID == 1  ? "Pending"  : selectedID == 2? "Dispatch to Other ASC": selectedID == 4? 'Hold': selectedID == 5? 'Completed':'Rejected' }}
                / {{ jobsData.callid }}</strong
              >
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn x-small @click="print(jobsData.id)">
                <v-icon>mdi-printer</v-icon>
              </v-btn></v-toolbar-items
            >
          </v-toolbar>
          <v-list three-line subheader>
            <v-subheader>Product Information</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-data-table
                  dense
                  :headers="unitsHeader"
                  :items="unitsData"
                  :fixed-header="true"
                  class="my-custom-table"
                >
                  <template v-slot:item.serialno="{ item }">
                    <v-row>
                      <v-col cols="9">
                        <v-text-field
                          v-model="item.serialno"
                          dense
                          :disabled="
                            item.serialstatus != 1 || checkpermission
                              ? false
                              : true
                          "
                          @keyup="
                            unlichange({
                              id: item.id,
                              value: item.serialno,
                              direct: 0,
                            })
                          "
                        >
                        </v-text-field>
                      </v-col>
                      <v-col v-if="item.serialstatus != 1 || checkpermission">
                        <v-btn
                          x-small
                          color="secondary"
                          dark
                          dense
                          style="margin: -20px; margin-top: 5px"
                          @click="
                            updatedserial({ id: item.id, value: item.serialno })
                          "
                        >
                          Update
                        </v-btn>
                      </v-col>
                    </v-row>
                  </template>
                </v-data-table>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list three-line subheader>
            <v-subheader>Customer Information </v-subheader>

            <v-list-item>
              <v-list-item-content>
                <v-row no-gutters>
                  <v-col cols="12" sm="3">
                    <!-- INSTALLATION ACCEPTED -->
                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'INSTALLATION'"
                      style="height: 185px"
                    >
                      <strong>Contact Phone Number</strong><br />
                      {{
                        jobsData.customer.cpnumber
                          ? jobsData.customer.cpnumber
                          : "N/A"
                      }}<br />
                      <strong>Last Name</strong><br />
                      {{
                        jobsData.customer.lastname
                          ? jobsData.customer.lastname
                          : "N/A"
                      }}<br />
                      <strong>Municipality</strong><br />
                      {{
                        jobsData.customer.mcity
                          ? jobsData.customer.mcity
                          : "N/A"
                      }}<br />
                      <strong>Dealer Name</strong><br />
                      {{ jobsData.branch.name }}<br />
                      <strong v-if="jobsData.status != 0"
                        >Date of Installation</strong
                      ><br />
                      {{
                        jobsData.status != 0
                          ? jobsData.installationdate
                            ? jobsData.installationdate
                            : "N/A"
                          : ""
                      }}
                    </v-card>
                    <!--END-->

                    <!-- SURVEY REQUEST -->

                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'SITE SURVEY'"
                      style="height: 185px"
                    >
                      <strong>Contact Phone Number</strong><br />
                      {{
                        jobsData.customer.cpnumber
                          ? jobsData.customer.cpnumber
                          : "N/A"
                      }}<br />
                      <strong>Last Name</strong><br />
                      {{
                        jobsData.customer.lastname
                          ? jobsData.customer.lastname
                          : "N/A"
                      }}<br />
                      <strong>Municipality</strong><br />
                      {{
                        jobsData.customer.mcity
                          ? jobsData.customer.mcity
                          : "N/A"
                      }}<br />
                      <strong>Dealer Name</strong><br />
                      {{ jobsData.branch.name }}<br />
                      <strong v-if="jobsData.status != 0">Date of Survey</strong
                      ><br />
                      {{
                        jobsData.status != 0
                          ? jobsData.installationdate
                            ? jobsData.installationdate
                            : "N/A"
                          : ""
                      }}
                    </v-card>
                    <!--END-->

                    <!-- REPAIR & CLEANING REQUEST -->
                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'REPAIR' || reqtype == 'CLEANING'"
                      style="height: 185px"
                    >
                      <strong>Contact Phone Number</strong><br />
                      {{
                        jobsData.customer.cpnumber
                          ? jobsData.customer.cpnumber
                          : "N/A"
                      }}<br />
                      <strong>Last Name</strong><br />
                      {{
                        jobsData.customer.lastname
                          ? jobsData.customer.lastname
                          : "N/A"
                      }}<br />
                      <strong>Municipality</strong><br />
                      {{
                        jobsData.customer.mcity
                          ? jobsData.customer.mcity
                          : "N/A"
                      }}<br />
                      <strong>Dealer Name</strong><br />
                      {{ jobsData.branch.name }}<br />
                    </v-card>
                    <!--END-->
                  </v-col>
                  <v-col cols="12" sm="3">
                    <!-- INSTALLATION ACCEPTED -->
                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'INSTALLATION'"
                      style="height: 185px"
                    >
                      <strong>Contact Email Address</strong><br />
                      {{
                        jobsData.customer.emailaddress
                          ? jobsData.customer.emailaddress
                          : "N/A"
                      }}<br />
                      <strong>First Name</strong><br />
                      {{
                        jobsData.customer.firstname
                          ? jobsData.customer.firstname
                          : "N/A"
                      }}<br />
                      <strong>Barangay</strong><br />
                      {{
                        jobsData.customer.barangay
                          ? jobsData.customer.barangay
                          : "N/A"
                      }}<br />
                      <strong>Name Of Organization</strong><br />
                      {{
                        jobsData.organizationname
                          ? jobsData.organizationname
                          : "N/A"
                      }}<br />
                    </v-card>
                    <!-- END -->

                    <!-- SURVEY REQUEST -->
                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'SITE SURVEY'"
                      style="height: 185px"
                    >
                      <strong>Contact Email Address</strong><br />
                      {{
                        jobsData.customer.emailaddress
                          ? jobsData.customer.emailaddress
                          : "N/A"
                      }}<br />
                      <strong>First Name</strong><br />
                      {{
                        jobsData.customer.firstname
                          ? jobsData.customer.firstname
                          : "N/A"
                      }}<br />
                      <strong>Barangay</strong><br />
                      {{
                        jobsData.customer.barangay
                          ? jobsData.customer.barangay
                          : "N/A"
                      }}<br />
                      <strong>Name Of Organization</strong><br />
                      {{
                        jobsData.organizationname
                          ? jobsData.organizationname
                          : "N/A"
                      }}<br />
                    </v-card>
                    <!--END-->

                    <!-- REPAIR & CLEANING REQUEST -->
                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'REPAIR' || reqtype == 'CLEANING'"
                      style="height: 185px"
                    >
                      <strong>Contact Email Address</strong><br />
                      {{
                        jobsData.customer.emailaddress
                          ? jobsData.customer.emailaddress
                          : "N/A"
                      }}<br />
                      <strong>First Name</strong><br />
                      {{
                        jobsData.customer.firstname
                          ? jobsData.customer.firstname
                          : "N/A"
                      }}<br />
                      <strong>Barangay</strong><br />
                      {{
                        jobsData.customer.barangay
                          ? jobsData.customer.barangay
                          : "N/A"
                      }}<br />
                      <strong>Special Request</strong><br />
                      {{
                        jobsData.customer.specialinstruction
                          ? jobsData.customer.specialinstruction
                          : "N/A"
                      }}
                    </v-card>
                    <!--END-->
                  </v-col>

                  <v-col cols="12" sm="3">
                    <!-- INSTALLATION ACCEPTED -->
                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'INSTALLATION'"
                      style="height: 185px"
                    >
                      <strong>Alternate No </strong><br />
                      {{
                        jobsData.customer.telephoneno
                          ? jobsData.customer.telephoneno
                          : "N/A"
                      }}<br />
                      <strong>Middle Name</strong><br />
                      {{
                        jobsData.customer.middlename
                          ? jobsData.customer.middlename
                          : "N/A"
                      }}<br />
                      <strong>Street</strong><br />
                      {{
                        jobsData.customer.street
                          ? jobsData.customer.street
                          : "N/A"
                      }}<br />
                      <strong>Special Request</strong><br />
                      {{
                        jobsData.customer.specialinstruction
                          ? jobsData.customer.specialinstruction
                          : "N/A"
                      }}
                    </v-card>
                    <!-- SURVEY REQUEST -->
                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'SITE SURVEY'"
                      style="height: 185px"
                    >
                      <strong>Alternate No </strong><br />
                      {{
                        jobsData.customer.telephoneno
                          ? jobsData.customer.telephoneno
                          : "N/A"
                      }}<br />
                      <strong>Middle Name</strong><br />
                      {{
                        jobsData.customer.middlename
                          ? jobsData.customer.middlename
                          : "N/A"
                      }}<br />
                      <strong>Street</strong><br />
                      {{
                        jobsData.customer.street
                          ? jobsData.customer.street
                          : "N/A"
                      }}<br />
                      <strong>Special Request</strong><br />
                      {{
                        jobsData.customer.specialinstruction
                          ? jobsData.customer.specialinstruction
                          : "N/A"
                      }}
                    </v-card>
                    <!-- REPAIR & CLEANING REQUEST -->
                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'REPAIR' || reqtype == 'CLEANING'"
                      style="height: 185px"
                    >
                      <strong>Alternate No </strong><br />
                      {{
                        jobsData.customer.telephoneno
                          ? jobsData.customer.telephoneno
                          : "N/A"
                      }}<br />
                      <strong>Middle Name</strong><br />
                      {{
                        jobsData.customer.middlename
                          ? jobsData.customer.middlename
                          : "N/A"
                      }}<br />
                      <strong>Street</strong><br />
                      {{
                        jobsData.customer.street
                          ? jobsData.customer.street
                          : "N/A"
                      }}<br />
                      <strong v-if="jobsData.status != 0">Technician</strong
                      ><br />
                      {{
                        jobsData.status != 0
                          ? jobsData.installer
                            ? jobsData.installer
                            : " "
                          : ""
                      }}<br />
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="3">
                    <!-- INSTALLATION ACCEPTED -->
                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'INSTALLATION'"
                      style="height: 185px"
                    >
                      <strong>Contact Person</strong><br />
                      {{
                        jobsData.customer.contactperson
                          ? jobsData.customer.contactperson
                          : "N/A"
                      }}<br />
                      <strong>Province</strong><br />
                      {{ jobsData.customer.province }}<br />
                      <strong>House No.</strong><br />
                      {{
                        jobsData.customer.houseno
                          ? jobsData.customer.houseno
                          : "N/A"
                      }}<br />
                      <strong v-if="jobsData.status != 0">Installer</strong
                      ><br />
                      {{
                        jobsData.status != 0
                          ? jobsData.installer
                            ? jobsData.installer
                            : "N/A"
                          : ""
                      }}<br />
                    </v-card>
                    <!-- SURVEY REQUEST -->
                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'SITE SURVEY'"
                      style="height: 185px"
                    >
                      <strong>Contact Person</strong><br />
                      {{
                        jobsData.customer.contactperson
                          ? jobsData.customer.contactperson
                          : "N/A"
                      }}<br />
                      <strong>Province</strong><br />
                      {{ jobsData.customer.province }}<br />
                      <strong>House No.</strong><br />
                      {{
                        jobsData.customer.houseno
                          ? jobsData.customer.houseno
                          : "N/A"
                      }}<br />
                      <strong v-if="jobsData.status != 0">Technician</strong
                      ><br />
                      {{
                        jobsData.status != 0
                          ? jobsData.installer
                            ? jobsData.installer
                            : "N/A"
                          : ""
                      }}<br />
                    </v-card>

                    <v-card
                      class="pa-2"
                      v-if="reqtype == 'REPAIR' || reqtype == 'CLEANING'"
                      style="height: 185px"
                    >
                      <strong>Contact Person</strong><br />
                      {{
                        jobsData.customer.contactperson
                          ? jobsData.customer.contactperson
                          : "N/A"
                      }}<br />
                      <strong>Province</strong><br />
                      {{ jobsData.customer.province }}<br />
                      <strong>House No.</strong><br />
                      {{
                        jobsData.customer.houseno
                          ? jobsData.customer.houseno
                          : "N/A"
                      }}<br />
                      <strong v-if="jobsData.status != 0"
                        >Date of Service</strong
                      ><br />
                      {{
                        jobsData.status != 0
                          ? jobsData.installationdate
                            ? jobsData.installationdate
                            : "N/A"
                          : ""
                      }}
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="3">
                    <br />
                    <strong>Log By: {{ jobsData.bookby }}</strong
                    ><br />
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
                  <v-col cols="12" sm="2" v-if="checkpermission" >
                    <v-card class="pa-6" style="width: 90%; height: 90%;" >
                      <v-text-field
                        label="CALL ID"
                        v-model="callid"
                        :error-messages="callidError"
                        required
                        :disabled="callidIden"
                        @keypress="onlyNumber"
                      >
                      </v-text-field>
                      <div>
                        <br />
                        <v-btn color="dark" @click="actions()">
                          Update CallID
                          <v-icon>mdi-send</v-icon>
                        </v-btn>
                      </div>
                    </v-card>
                  </v-col>
                   <v-col cols="12" sm="3" v-if="jobsData.status == 4 || jobsData.status == 0" >
                    <v-card class="pa-6" style="width: 90%; height: 90%;"   
                             >
                       <v-row>
                        
                            <v-textarea
                              :disabled="!editrequest"
                              class="mx-2"
                              label="Reason"
                              rows="1"
                              v-model="reasons"
                              prepend-icon="mdi-comment"
                              v-if="reasons || checkpermission"
                            > </v-textarea>
                          
                         </v-row>

                      <div>
                        <br />

                        <!-- REBOOK -->
                        <v-btn
                          color="green"
                          dense
                          class="mr-3"
                          @click="actions(4)"
                          elevation="2"
                          x-small
                          v-if="selectedID == 4 && requestrebook"
                        >
                            REBOOK
                        </v-btn>
                        <!-- END -->
                        <!-- HOLD -->
                        <v-btn
                          color="green"
                          dense
                          class="mr-3"
                          @click="actions(4)"
                          elevation="2"
                          x-small
                          v-if="selectedID == 0 && requesthold"
                          :disabled="checkrebook"
                        >
                            HOLD  
                        </v-btn>
                        <!-- END -->
                        <v-btn
                          color="red"
                          dense
                          class="mr-3"
                          @click="actions(10)"
                          elevation="2"
                          x-small
                          :disabled="checkrebook"
                          v-if="selectedID == 0 && requestreject"
                        >
                          Reject
                        </v-btn>
                        <v-btn
                          color="red"
                          dense
                          class="mr-3"
                          @click="actions(10)"
                          elevation="2"
                          x-small
                          v-if="selectedID == 4 && requestcancelled"
                        >
                          Cancelled
                        </v-btn>
                      </div>
                    </v-card>
                  </v-col>
      
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          
          <v-list three-line>
            <v-list-item>
              <v-list-item-content>
                <v-row no-gutters>
                  <v-col cols="12" sm="3">
                    <v-card class="pa-1"  >
                      <br />
                      <label v-if="reuploadperm"
                        >Attachment <v-icon>mdi-attachment</v-icon>
                        <a href="#" @click="reupload()">Re-upload</a></label
                      >
                      <br />
                      <div v-if="reuploadperm || checkpermission">
                        <div
                          v-for="(download, $index) in jobsData.attachfiles"
                          v-bind:key="$index"
                        >
                          <a href="#" @click="downloadAdditonal(download.id)">{{
                            download.name
                          }}</a>
                        </div>
                      </div>
                    </v-card>

                    <v-card class="pa-1" v-if="checkpermission || reuploadperm">
                      <strong v-if="jobsData.attachment">Sales Invoice</strong
                      ><br />
                      <v-btn
                        v-if="jobsData.attachment"
                        x-small
                        color="success"
                        @click="download(jobsData.id)"
                      >
                        <v-icon>mdi-attachment</v-icon>
                      </v-btn>
                    </v-card>
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
        <v-dialog v-model="uploaddialog" max-width="400" persistent>
          <v-card>
            <v-card-title class="text-h5"> Additional Uploads </v-card-title>

            <v-file-input
              style="margin: 10px"
              v-model="additionalfiles"
              color="deep-purple accent-4"
              counter
              label="File input"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple accent-4"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="uploaddialog = false">
                Close
              </v-btn>
              <v-btn
                :loading="loading3"
                :disabled="loading3"
                color="blue-grey"
                class="ma-2 white--text"
                @click="uploadadditional()"
              >
                Upload
                <v-icon right dark> mdi-cloud-upload </v-icon>
              </v-btn>
              <!-- <v-btn color="green darken-1" text @click="uploadadditional()"> Upload </v-btn> -->
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
      realid: '',
      reasons: '',
      loading3: false,
      additionalfiles: [],
      uploaddialog: false,
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
      unitsHeader: [
        { text: "Product Category", value: "prodcategories" },
        { text: "Appliance Type", value: "appliancetype" },
        // { text: "Request Type", value: "branch.name" },
        { text: "Brand", value: "brand" },
        // { text: "Qty", value: "qty" },
        { text: "Model", value: "model" },
        { text: "Serial No.", value: "serialno" },
        //{ text: "Unit Condition", value: "unitcondition" },
        { text: "Warranty Condition", value: "warrantycondition" },
        { text: "Date of Purchase", value: "datepurchase" },
        // { text: "Installation Address", value: "locationofinstallation" },
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
   
    checkrebook(){
      return this.reasons? false:true
    },
    requestcancelled(){
      return this.perm.includes("Cancelled Request");
    },
    requestreject(){
      return this.perm.includes("Reject Request");
    },
    requesthold(){
      return this.perm.includes("Hold Request");
    },
    editrequest(){
      return this.perm.includes("Can Edit Request");
    },
    requestrebook(){
      return this.perm.includes("Rebook Request");
    },
    reuploadperm() {
      return this.perm.includes("ReUpload");
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
     //this.$socket.emit("notification", 1);
    this.$store.dispatch("app_booking_sys/fetchUnassigned").then((res) => {
      this.data = res.data;
    });
    this.$store.dispatch("userPermissions/fetchPermission").then((res) => {
      this.perm = res.data;
    });
    this.refresh(0);
    this.usersData = this.$store.state.currentUser;
  },

  methods: {
    uploadadditional() {
      this.loading3 = true;
      var info = {
        ids: this.requestID,
        file: this.additionalfiles,
      };
      this.$store
        .dispatch("app_booking_sys/uploadadditional", info)
        .then((res) => {
          this.loading3 = false;
          this.$toast.open({
            message: res.data.msg,
            type: res.data.color,
            // all of other options may go here
          });
          this.uploaddialog = false;
          this.jobsData.attachfiles = [];
          res.data.data.forEach((value, index) => {
            this.jobsData.attachfiles.push({ id: value.id, name: value.name });
          });
        })
        .catch((error) => {
          this.loading3 = false;
          this.$toast.open({
            message: error,
            type: "warning",
            // all of other options may go here
          });
        });
    },
    reupload() {
      this.uploaddialog = true;
    },
    unlichange(data) {
      this.$store.dispatch("app_booking_sys/updateSerial", data);
    },
    refresh(data) {
      this.$store.dispatch("app_booking_sys/JobsCount").then((res) => {
        this.jobsCounts = res.data;
        this.loadingForCount = false;
      });
      this.loadingForTable = true;
      this.$store.dispatch("app_booking_sys/fetchUnassigned", data).then((res) => {
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
    actions(x) {
      
       let Data;
        this.$v.callid.$touch();
         Data = {
        requestID: this.requestID,
        installer: this.tech,
        status: this.jobstatus,
        callid: this.callid,
        installationData: this.installationdateData,
        realid: this.realid
      };
      if(x){
        const msg = this.jobsData.status == 0 ? x == 4 ? 'HOLD':'REJECT': x == 4 ? 'REBOOK':'CANCELLED'
        this.$swal
            .fire({
              title: "Are you sure?",
              text: "You want to "+msg+ " This",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes "+msg+" It",
            })
            .then((result) => {
              if (result.isConfirmed) {
                
                     
                   const data = {
                      status: x,
                      reason: this.reasons,
                      requestID: this.requestID,
                      identifier: this.jobsData.status,
                      type: this.reqtype,
                      realid: this.realid
                    }
                    
                     if(this.jobsData.status == 4 && x == 4){
                       const jsonString = JSON.stringify(data);
                       this.encodedText = btoa(jsonString);
                       this.$router.push('/app/booking/index/'+this.encodedText);
                     }else{
                           if(this.requestcancelled){
                           
                        this.$store.dispatch("app_booking_sys/CancelledAction", data).then((res) => {
                                                                          this.refreshData();
                                                                          this.$swal.fire(
                                                                              msg,
                                                                              "Your file has been "+msg,
                                                                              "warning"
                                                                            );
                                                                            this.jobsInfo = false
                                                                        })
                           }else{
                              
                        this.$store.dispatch("app_booking_sys/JobsAction", data).then((res) => {
                                                                          this.refreshData();
                                                                          this.$swal.fire(
                                                                              msg,
                                                                              "Your file has been "+msg,
                                                                              "success"
                                                                            );
                                                                        })
                                                                        this.jobsInfo = false
                           }
                            
                     }
                  
                  
                    
          }
        });
        
        


      }else{
        this.$store.dispatch("app_booking_sys/JobsAction", Data).then((res) => {
          if(res.data.ch == 0){
            this.$toast.open({
            message: 'Call ID is Already Exist..!',
            type: 'warning',
            duration: 5000,
          });
          }else{
            this.$toast.open({
            message: res.data.msg,
            type: res.data.error,
            duration: 5000,
            })
              this.$socket.emit("notification", 1);
          if (res.data.type == 1) {
            this.jobsInfo = false;
          }
          }
         
        });
      }
      
      
      
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
      this.printid = data.id;
      if (data.requesttype == "REPAIR") {
        this.unitsHeader = [
          { text: "PRODUCT CATEGORY", value: "prodcategories" },
          { text: "APPLIANCE TYPE", value: "appliancetype" },
          { text: "PROBLEM", value: "problem" },
          { text: "BRAND", value: "brand" },
          // { text: "Qty", value: "qty" },
          { text: "MODEL", value: "model" },
          { text: "SERIAL NO.", value: "serialno" },
          //{ text: "UNIT CONDITION", value: "unitcondition" },
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
          //{ text: "Unit Condition", value: "unitcondition" },
          { text: "Warranty Condition", value: "warrantycondition" },
          { text: "Date of Purchase", value: "datepurchase" },
          { text: "LOCATION OF UNIT", value: "locationofinstallation" },
          { text: "Priority", value: "priority" },
        ];
      } else if (data.requesttype == "INSTALLATION") {
        this.unitsHeader = [
          { text: "Product Category", value: "prodcategories" },
          {
            text: "Appliance Type",
            value: "appliancetype",
            fixed: true,
            width: "140px",
          },
          // { text: "Request Type", value: "branch.name" },
          { text: "Brand", value: "brand" },
          // { text: "QTY", value: "qty" },
          { text: "Model", value: "model" },
          {
            text: "Serial No.",
            value: "serialno",
            fixed: true,
            width: "230px",
          },
          //{ text: "Unit Condition", value: "unitcondition" },
          { text: "Warranty Condition", value: "warrantycondition" },
          { text: "Date of Purchase", value: "datepurchase" },
          { text: "INSTALLATION ADDRESS", value: "locationofinstallation" },
          { text: "Priority", value: "priority" },
          // { text: "More Info", value: "more" },

          { text: "Property Type", value: "propertytype" },
          { text: "Level", value: "level" },
          { text: "Location", value: "location" },
          { text: "Area", value: "area" },
          { text: "Wall Finish", value: "wallfinish" },
          { text: "Power Supply Location", value: "withpowersupply" },
          { text: "Date Of Delivery", value: "deliverydate" },
          { text: "Amount", value: "paidamoun" },
          { text: "OR #", value: "ornumber" },
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
          //{ text: "Unit Condition", value: "unitcondition" },
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
      this.realid = data.id
      this.items = data.bk_jobs_update;
      this.tech = data.installer;
      this.reqtype = data.requesttype;
      this.jobstatus = status;
      this.callid = data.callid;
      //this.jobstat = data.status
      this.installationdateData = data.installationdate;
      this.jobsInfo = true;
      this.jobsData = data;
      this.unitsData = [data.units[0]];
      console.log(data.units[0])
      this.requestID = data.requestid;
      this.reasons = data.reason
    },
    selected(id) {
      if (id == 0) {
        this.bgselected0 = "success";
        this.bgselected1 = "";
        this.bgselected2 = "";
        this.bgselected3 = "";
        this.bgselected4 = "";
        this.bgselected5 = "";
        this.headers = [
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
        ];
      }
      if (id == 1) {
        this.bgselected0 = "";
        this.bgselected1 = "success";
        this.bgselected2 = "";
        this.bgselected3 = "";
        this.bgselected4 = "";
        this.bgselected5 = "";
        this.headers = [
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
        ];
      }
      if (id == 2) {
        this.bgselected0 = "";
        this.bgselected1 = "";
        this.bgselected2 = "success";
        this.bgselected3 = "";
        this.bgselected4 = "";
        this.bgselected5 = "";
      }
      if (id == 3) {
        this.bgselected0 = "";
        this.bgselected1 = "";
        this.bgselected2 = "";
        this.bgselected3 = "";
        this.bgselected4 = "success";
        this.bgselected5 = "";
        this.headers = [
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
        ];
      }
      if (id == 4) {
        this.bgselected0 = "";
        this.bgselected1 = "";
        this.bgselected2 = "";
        this.bgselected3 = "success";
        this.bgselected4 = "";
        this.bgselected5 = "";
        this.headers = [
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
        ];
      }
      if (id == 5) {
        this.bgselected0 = "";
        this.bgselected1 = "";
        this.bgselected2 = "";
        this.bgselected3 = "";
        this.bgselected4 = "";
        this.bgselected5 = "success";
        this.headers = [
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
        ];
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
    downloadAdditonal(id) {
      let ids = {
        id: id,
      };
      this.$store.dispatch("app_booking_sys/DownloadAdditional", ids);
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
 