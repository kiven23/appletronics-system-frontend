<template>
  <div>
    <v-container text-xs-center>
     
     
      <div class="center">
        <v-dialog
          v-model="bookingmodal"
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
              <v-btn icon dark  v-if="!checkrebook" @click="bookingmodal = false || reset()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>
                 <strong>REQUEST- {{
                  activerequest.name
                }}</strong> 
                <strong v-if="checkrebook"> / UPDATE - {{checkrebook}}</strong>
                </v-toolbar-title
              >
              <v-spacer></v-spacer>
              <v-btn @click="restore()" v-if="!checkrebook" color="primary" absolute right fab>
                <v-icon>mdi-backup-restore</v-icon>
              </v-btn>
              <v-toolbar-items> </v-toolbar-items>
            </v-toolbar>

            <v-list three-line subheader>
              <v-list-item>
                <v-list-item-content>
                  <v-row no-gutters>
                    <v-col cols="12" sm="2">
                      <v-card class="pa-3" height="1100">
                        <h5>PRODUCT INFORMATION</h5>
                        <v-chip x-medium> Model* </v-chip>
                        <v-autocomplete
                          v-model="data.units.model"
                          :items="itemsAuto"
                          :loading="isLoading"
                          :search-input.sync="search"
                          hide-details
                          hide-selected
                          item-text="model"
                          item-value="model"
                          label="Search Model"
                          @change="autoclear()"
                        >
                          <template v-slot:no-data>
                            <v-list-item>
                              <v-list-item-title>
                                Search Model
                                <strong>Model</strong>
                              </v-list-item-title>
                            </v-list-item>
                          </template>
                          <template
                            v-slot:selection="{ attr, on, item, selected }"
                          >
                            <v-chip
                              v-bind="attr"
                              :input-value="selected"
                              color="blue-grey"
                              class="white--text"
                              v-on="on"
                            >
                              <v-icon left> mdi-file-check </v-icon>
                              <span v-text="item.model"></span>
                            </v-chip>
                          </template>
                          <template v-slot:item="{ item }">
                            <v-list-item-avatar
                              color="indigo"
                              class="text-h5 font-weight-light white--text"
                            >
                              {{ item.categories.charAt(0) }}
                            </v-list-item-avatar>
                            <v-list-item-content @click="modelsActivate(item)">
                              <v-list-item-title
                                v-text="item.model"
                              ></v-list-item-title>
                              <v-list-item-subtitle
                                v-text="item.categories"
                              ></v-list-item-subtitle>
                              <v-list-item-subtitle
                                v-text="item.Brand"
                              ></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                              <!-- <v-icon>mdi-bitcoin</v-icon> -->
                            </v-list-item-action>
                          </template>
                        </v-autocomplete>
                        <v-text-field
                          v-model="data.units.model"
                          placeholder="Model"
                          required
                          dense
                          :disabled="true"
                          @change="autoclear()"
                        ></v-text-field>
                        <v-chip x-medium> Product Categories * </v-chip>
                        <v-autocomplete
                          v-model="data.units.prodcategories"
                          :items="productListDown.prodcategories"
                          placeholder="Product Categories"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                          @change="getindex()"
                        ></v-autocomplete>
                        <v-chip x-medium> Appliance Type* </v-chip>
                        <v-autocomplete
                          v-model="data.units.appliancetype"
                          :items="productListDown.appliancetype"
                          :error-messages="appliancetypeError"
                          placeholder="Appliance Type*"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-autocomplete>
                        <v-chip x-medium> Brand* </v-chip>
                        <v-autocomplete
                          v-model="data.units.brand"
                          :items="productListDown.brand"
                          :error-messages="brandError"
                          placeholder="Brand*"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-autocomplete>

                        <v-chip
                          x-medium
                          v-if="activerequest.name !== 'SITE SURVEY'"
                        >
                          Serial No.{{
                            activerequest.name == "INSTALLATION" ? "*" : ""
                          }}</v-chip
                        >
                        <v-text-field
                          v-if="activerequest.name !== 'SITE SURVEY'"
                          v-model="data.units.serialno"
                          placeholder="Serial No."
                          :error-messages="serialError"
                          dense
                          required
                        ></v-text-field>
                        <!-- <v-chip x-medium>Unit Condition* </v-chip>
                        <v-select
                          style="margin: 6px"
                          v-model="data.units.unitcondition"
                          :items="productListDown.unitcondition"
                          :error-messages="unitconditionError"
                          placeholder="Unit Condition*"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select> -->
                        <v-chip
                          x-medium
                          v-if="reqIdentifier !== 2 && reqIdentifier !== 3"
                        >
                          Warranty Condition*
                        </v-chip>
                        <v-select
                          v-if="reqIdentifier !== 2 && reqIdentifier !== 3"
                          v-model="data.units.warrantycondition"
                          :items="productListDown.warrantycondition"
                          :error-messages="warrantyconditionError"
                          placeholder="Warranty Condition*"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>
                        <v-chip x-medium class="ma-2">DATE PURCHASE </v-chip
                        ><br />
                        <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="data.units.datepurchase"
                              label="Date Purchased"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="data.units.datepurchase"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu1 = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu1.save(data.units.datepurchase) || showalert()"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                        <!-- <vs-input
                          type="date"
                          v-model="data.units.datepurchase"
                          max="9999"
                        /> -->
                        <!-- <v-chip x-medium v-if="reqIdentifier !== 1" class="ma-2"
                          >Quantity</v-chip
                        > -->
                        <!-- <v-text-field
                          v-if="reqIdentifier !== 1"
                          v-model="data.units.qty"
                          placeholder="QTY"
                          :error-messages="qtyError"
                          required
                          dense
                        ></v-text-field> -->
                        <!-- <div class="quantity-toggle" v-if="reqIdentifier !== 1">
                          <button @click="decrement()">&mdash;</button>
                          <input type="text" :value="data.units.qty" readonly />
                          <button @click="increment()">&#xff0b;</button>
                        </div> -->
                        <!-- <v-select
                          style="margin: 6px"
                          v-model="data.units.demandreplacement"
                          :items="productListDown.demandreplacement"
                          placeholder="Demand Replacement"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select> -->
                        <v-chip x-medium v-if="reqIdentifier == 1" class="ma-2">
                          Problem
                        </v-chip>
                        <v-autocomplete
                          v-if="reqIdentifier == 1"
                          v-model="data.units.problem"
                          :items="problemItemsAuto"
                          :loading="isLoading"
                          :search-input.sync="searchP"
                          :error-messages="problemError"
                          hide-details
                          hide-selected
                          item-text="Name"
                          item-value="Name"
                           
                        >
                     
                          <template v-slot:no-data>
                            <v-list-item>
                              <v-list-item-title>
                                Search Problem
                              </v-list-item-title>
                            </v-list-item>
                          </template>
                          <template
                            v-slot:selection="{ attr, on, item, selected2 }"
                          >
                            <v-chip
                              v-bind="attr"
                              :input-value="selected2"
                              color="blue-grey"
                              class="white--text"
                              v-on="on"
                            >
                              <v-icon left> mdi-file-check </v-icon>
                              <span v-text="item.Name"></span>
                            </v-chip>
                          </template>
                          <template v-slot:item="{ item }">
                            <v-list-item-avatar
                              color="indigo"
                              class="text-h5 font-weight-light white--text"
                            >
                              {{ item.Name.charAt(0) }}
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title
                                v-text="item.Name"
                              ></v-list-item-title>
                              <v-list-item-subtitle
                                v-text="item.Name"
                              ></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                              <!-- <v-icon>mdi-bitcoin</v-icon> -->
                            </v-list-item-action>
                          </template>
                        </v-autocomplete>

                        <!-- <v-text-field
                          v-if="reqIdentifier == 1"
                          v-model="data.units.problem"
                          placeholder="Problem"
                          required
                          dense
                          v-uppercase
                           
                        ></v-text-field> -->

                        <v-chip x-medium class="ma-1">Priority </v-chip>
                        <v-select
                          style="margin: 2px"
                          v-model="data.units.priority"
                          :items="productListDown.priority"
                          placeholder="Priority"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>

                        <!-- <v-btn @click="gen()" outlined color="indigo">
                          TESTDATA
                        </v-btn> -->
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="3" v-if="reqIdentifier == 4">
                      <v-card class="pa-3" height="1100">
                        <v-chip x-medium>Property Type* </v-chip>
                        <v-select
                          v-model="data.usage.propertytype"
                          :items="usagedetailsListDown.propertytype"
                          :error-messages="propertytypeError"
                          placeholder="Property Type*"
                          item-text="name"
                          item-value="value"
                          @change="propertyTypeController()"
                          required
                          dense
                        ></v-select>
                        <v-chip x-medium>Level </v-chip>
                        <v-select
                          v-model="data.usage.level"
                          :items="usagedetailsListDown.level"
                          placeholder="Level"
                          item-text="name"
                          item-value="value"
                          required
                          :disabled="ifcommercial == 1"
                          dense
                        ></v-select>
                        <v-chip x-medium>Location </v-chip>
                        <v-select
                          v-model="data.usage.location"
                          :items="usagedetailsListDown.location"
                          placeholder="Location"
                          item-text="name"
                          item-value="value"
                          required
                          :disabled="ifcommercial == 1"
                          dense
                        ></v-select>
                        <v-chip x-medium>Area </v-chip>
                        <v-text-field
                          v-model="data.usage.area"
                          prefix="sqm"
                          placeholder="Area"
                          :error-messages="areaError"
                          @input="$v.data.usage.area.$touch()"
                          @keypress="checkAreaKey"
                          required
                          :disabled="ifcommercial == 1"
                          dense
                        ></v-text-field>
                        <v-chip x-medium>Wall Finish* </v-chip>
                        <v-select
                          v-model="data.usage.wallfinish"
                          :items="usagedetailsListDown.wallfinish"
                          :error-messages="wallfinishError"
                          @change="verifywall()"
                          placeholder="Wall Finish*"
                          item-text="name"
                          item-value="value"
                          :disabled="ifcommercial == 1"
                          required
                          dense
                        ></v-select>
                        <v-chip x-medium>Power Supply Location</v-chip>
                        <v-select
                          v-model="data.usage.withpowersupply"
                          :items="usagedetailsListDown.withpowersupply"
                          :error-messages="withpowersupplyError"
                          placeholder="With Power Supply*"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                          :disabled="ifcommercial == 1"
                        ></v-select>
                        <v-chip x-medium>Date of Delivery</v-chip>

                        <!-- <vs-input
                          type="date"
                          v-model="data.usage.deliverydate"
                        /> -->
                        <v-menu
                          ref="menu3"
                          v-model="menu3"
                          :close-on-content-click="false"
                          :return-value.sync="data.usage.deliverydate"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="data.usage.deliverydate"
                              label="Delivery Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="data.usage.deliverydate"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu3 = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu3.save(data.usage.deliverydate)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>

                        <v-chip x-medium>Time Of Delivery </v-chip>
                        <vue-timepicker
                          v-model="data.usage.time"
                          style="margin: 6px"
                        ></vue-timepicker>
                        <br />
                        <v-chip x-medium>Installation Address</v-chip>

                        <v-radio-group
                          v-model="InstallationAddress"
                          @change="addressV()"
                        >
                          <v-radio label="Customer"></v-radio>
                          <v-radio label="Others"></v-radio>
                        </v-radio-group>

                        <v-text-field
                          v-if="InstallationAddress == 1"
                          style="margin: 6px"
                          v-model="data.usage.locationofinstallation"
                          placeholder="Installation Address"
                          required
                          dense
                        ></v-text-field>
                        <v-chip x-medium>Amount Paid(Installation fee)</v-chip>
                        <v-text-field
                          style="margin: 6px"
                          prefix="PHP"
                          v-model="data.usage.paidamoun"
                          placeholder="Amount Paid"
                          required
                          @keypress="onlyNumber"
                          dense
                        ></v-text-field>
                        <!-- <v-chip x-medium>OR #</v-chip> -->
                        <v-text-field
                          style="margin: 6px"
                          prefix="OR#"
                          @keypress="onlyNumber"
                          v-model="data.usage.or"
                          placeholder="OR #"
                          required
                          dense
                        ></v-text-field>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <v-card class="pa-1" height="1100">
                        <h5>CUSTOMER INFORMATION</h5>
                        <v-chip x-medium class="ma-2">
                          Contact Phone Number*</v-chip
                        >
                        <!-- changes @keyup="checkrecordauto" -->
                        <v-text-field
                          v-model="customer.cpnumber"
                          :error-messages="cpnumberError"
                          placeholder="Contact Phone Number*"
                          single-line
                          type="integer"
                          :maxlength="max"
                          dense
                          required
                          @keypress="onlyNumber"
                          @keydown="checknumber"
                          class="ma-2"
                        ></v-text-field>

                        <!-- <vs-button
                          class="ma-2"
                          outlined
                          color="indigo"
                          @click="checkRecExist()"
                          size="mini"
                        >
                          CHECK RECORD
                        </vs-button> -->
                        <v-chip x-medium class="ma-2"
                          >Email Address (OPTIONAL)</v-chip
                        >

                        <v-text-field
                          v-model="customer.emailaddress"
                          placeholder="Email Address (OPTIONAL)"
                          required
                          dense
                          class="ma-2"
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>
                        <v-chip x-medium class="ma-2">Last Name *</v-chip>
                        <v-text-field
                          v-model="customer.lastname"
                          placeholder="Last Name"
                          :error-messages="lastnameError"
                          required
                          dense
                          class="ma-2"
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>
                        <v-chip x-medium class="ma-2">First Name *</v-chip>
                        <v-text-field
                          v-model="customer.firstname"
                          :error-messages="firstnameError"
                          placeholder="First Name"
                          required
                          dense
                          class="ma-2"
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>
                        <v-chip x-medium class="ma-2">Middle Name</v-chip>
                        <v-text-field
                          v-model="customer.middlename"
                          placeholder="Middle Name"
                          :error-messages="middlenameError"
                          required
                          dense
                          class="ma-2"
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>
                        <v-chip x-medium class="ma-2">Contact Person</v-chip>
                        <v-text-field
                          v-model="customer.contactperson"
                          placeholder="Contact Person"
                          :error-messages="contactpersonError"
                          required
                          dense
                          class="ma-2"
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>
                        <v-chip x-medium class="ma-2"
                          >Contact/Telephone NO. (OPTIONAL)</v-chip
                        >
                        <!-- <v-text-field
                          v-model="customer.telephoneno"
                          
                          required
                          dense
                          class="ma-2"
                        ></v-text-field> -->
                        <v-text-field
                          v-model="customer.telephoneno"
                          placeholder="Telephone No. (OPTIONAL)"
                          hide-details
                          single-line
                          type="integer"
                          :maxlength="max"
                          dense
                          required
                          @keypress="onlyNumber"
                          class="ma-2"
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>
                        <v-chip x-medium class="ma-2">LANDMARK</v-chip>
                        <v-text-field
                          class="ma-2"
                          v-model="customer.landmark"
                          placeholder="LANDMARK "
                          required
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>
                        <v-chip x-medium v-if="reqIdentifier == 3" class="ma-2"
                          >SURVEY LOCATION</v-chip
                        >
                        <v-text-field
                          class="ma-2"
                          v-if="reqIdentifier == 3"
                          v-model="data.usage.locationofinstallation"
                          placeholder="Survey Location"
                          required
                          dense
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <v-card class="pa-3" height="1100">
                        <v-chip x-medium class="ma-1">Region *</v-chip>
                        <v-select
                          v-model="customer.region"
                          :items="addressesListDown.region"
                          placeholder="Region"
                          item-text="region_name"
                          item-value="region_code"
                          required
                          dense
                          class="ma-1"
                          @change="regionD()"
                          :error-messages="regionError"
                          :disabled="checkIdentifier == 1"
                        ></v-select>
                        <v-chip x-medium class="ma-1">Province *</v-chip>
                        <v-select
                          class="ma-1"
                          v-model="customer.province"
                          :items="addressesListDown.province"
                          :error-messages="provinceError"
                          dense
                          placeholder="Province"
                          item-text="province_name"
                          item-value="province_name"
                          required
                          @change="provinceD()"
                          :disabled="checkIdentifier == 1"
                        ></v-select>
                        <v-chip x-medium class="ma-1"
                          >Municipality/City *</v-chip
                        >
                        <v-select
                          class="ma-1"
                          v-model="customer.mcity"
                          :items="addressesListDown.mcity"
                          :error-messages="mcityError"
                          dense
                          placeholder="Municipality/City"
                          item-text="city_name"
                          item-value="city_code"
                          required
                          @change="mcityD()"
                          :disabled="checkIdentifier == 1"
                        ></v-select>
                        <v-chip x-medium class="ma-1">Barangay *</v-chip>
                        <v-select
                          class="ma-1"
                          v-model="customer.barangay"
                          :items="addressesListDown.barangay"
                          :error-messages="barangayError"
                          placeholder="Barangay"
                          item-text="brgy_name"
                          item-value="brgy_name"
                          required
                          dense
                          @change="brgyD()"
                          :disabled="checkIdentifier == 1"
                        ></v-select>

                        <v-chip x-medium class="ma-1">Street</v-chip>
                        <v-text-field
                          v-model="customer.street"
                          :error-messages="streetError"
                          placeholder="Street"
                          required
                          dense
                          class="ma-1"
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>
                        <v-chip x-medium class="ma-1">House No.</v-chip>
                        <v-text-field
                          v-model="customer.houseno"
                          placeholder="House No."
                          :error-messages="housenoError"
                          required
                          dense
                          class="ma-1"
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>
                        <v-chip x-medium class="ma-1"
                          >{{
                            reqIdentifier == 3 || reqIdentifier == 4
                              ? "NAME OF ORGANIZATION"
                              : "LOCATION OF UNIT"
                          }}
                        </v-chip>

                        <v-text-field
                          v-if="reqIdentifier == 3 || reqIdentifier == 4"
                          v-model="customer.organizationname"
                          :placeholder="
                            reqIdentifier == 3 || reqIdentifier == 4
                              ? 'NAME OF ORGANIZATION'
                              : 'LOCATION OF UNIT'
                          "
                          required
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>

                        <v-text-field
                          v-if="reqIdentifier == 1 || reqIdentifier == 2"
                          v-model="data.usage.locationofinstallation"
                          :placeholder="
                            reqIdentifier == 3 || reqIdentifier == 4
                              ? 'NAME OF ORGANIZATION'
                              : 'LOCATION OF UNIT'
                          "
                          required
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-text-field>

                        <v-chip
                          x-medium
                          color="success"
                          v-if="reqIdentifier == 3 || reqIdentifier == 4"
                          >Is this an organization?</v-chip
                        >
                        <v-radio-group
                          v-if="reqIdentifier == 4 || reqIdentifier == 3"
                          v-model="customer.organization"
                          row
                        >
                          <v-radio label="Yes" value="1"></v-radio>
                          <v-radio label="No" value="2"></v-radio>
                        </v-radio-group>
                        <v-chip
                          x-medium
                          v-if="
                            checkwarranty ||
                            reqIdentifier == 2 ||
                            reqIdentifier == 3 ||
                            reqIdentifier == 4 ||
                            customer.attachment.length
                          "
                          >Sales Invoice/cof/aisf/Mrf
                        </v-chip>

                        <v-file-input
                          v-if="
                            checkwarranty ||
                            reqIdentifier == 2 ||
                            reqIdentifier == 3 ||
                            reqIdentifier == 4 ||
                            customer.attachment.length
                          "
                          :label="filenamelabel"
                          counter
                          multiple
                          truncate-length="15"
                          v-model="customer.attachment"
                        >
                        
                        </v-file-input>
                    
                        <v-chip x-medium v-if="reqIdentifier == 4"
                          >Sketch
                        </v-chip>

                        <v-file-input
                          v-if="reqIdentifier == 4"
                          counter
                          truncate-length="15"
                          v-model="customer.sketch"
                        >
                        </v-file-input>
                        <v-textarea
                          prepend-inner-icon="mdi-comment"
                          class="mx-2"
                          label="SPECIAL INSTRUCTION"
                          rows="1"
                          v-model="customer.specialinstruction"
                          v-uppercase
                          :disabled="checkIdentifier == 1"
                        ></v-textarea>

                        <!-- <h3>Any additional request?</h3>

                        <vs-checkbox
                          v-model="customer.additionalrequest1"
                          val="Long ladder needed for unit located above 10ft/3m (+Php 380)"
                        >
                          Long ladder needed for unit located above 10ft/3m
                          (+Php 380)
                        </vs-checkbox>
                        <vs-checkbox
                          v-model="customer.additionalrequest2"
                          val="Freon re-charge may be needed (additional charges applies)"
                        >
                          Freon re-charge may be needed (additional charges
                          applies)
                        </vs-checkbox> -->
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-card class="pa-1">
                        <v-chip x-medium color="success">UNITS/ITEMS</v-chip>
                        <v-simple-table dense>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">UNITID</th>
                                <th class="text-left">SERIAL</th>
                                <th class="text-left">ACTIONS</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in units" :key="item.unitid">
                                <td>
                                  <strong>{{ item.unitid }}</strong>
                                </td>
                                <td>
                                  <strong>{{ item.serialno }}</strong>
                                </td>
                                <td>
                                  <!-- <v-btn icon @click="editItem(item)">
                                  <v-icon
                                      >mdi-eye
                                    </v-icon>
                                  </v-btn> -->
                                  <v-btn icon @click="trashUnits(item)">
                                    <v-icon>mdi-delete</v-icon>
                                  </v-btn>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                        <vs-button
                          class="ma-2"
                          outlined
                          color="indigo"
                          @click="checkout()"
                          :disabled="CustomerALLError"
                        >
                          REVIEW AND CHECKOUT
                        </vs-button>
                        <vs-button
                          class="ma-2"
                          @click="add()"
                          outlined
                          color="indigo"
                          :disabled="UnitsALLError"
                          v-if="addIden == 0"
                        >
                          SUBMIT
                        </vs-button>
                        <v-chip x-medium class="ma-2"> LOGGED BY *   </v-chip>
                       
                        <v-text-field
                          outlined
                          v-model="customer.bookby"
                          name="LOGGED BY :"
                          :label="logbylabel"
                          :error-messages="lognameError"
                          @input="$v.customer.bookby.$touch()"
                          required
                          v-uppercase
                        ></v-text-field>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>

          <v-dialog v-model="checkrecords" width="500">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Customer List
              </v-card-title>
              <v-data-table
                dense
                :headers="customerListHeaders"
                :items="customerList"
                item-key="name"
                class="elevation-1"
              >
                <template v-slot:item.cpnumber="{ item }">
                  <vs-button transparent @click="selectedCustomer(item)">
                    {{ item.cpnumber }}
                  </vs-button>
                </template>
              </v-data-table>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="restoreBK" width="500" v-if="!checkrebook">
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                RESTORE DRAFT
              </v-card-title>
              <v-data-table
                dense
                :headers="restoreHead"
                :items="restoreList"
                item-key="name"
                class="elevation-1"
              >
                <template v-slot:item.ActionRestore="{ item }">
                  <vs-button transparent @click="restoreNow(item)">
                    RESTORE
                  </vs-button>
                </template>
              </v-data-table>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="confirmdialog" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Confirm your request details</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <strong>Contact Name</strong>
                      <br />{{ customer.lastname }},
                      {{ customer.firstname }}
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <strong>Email Address</strong>
                      <br />{{ customer.emailaddress }}
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <strong>Contact Number</strong>
                      <br />{{ customer.cpnumber }}
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <strong>Address Details</strong>
                      <br />
                      {{
                        customer.barangay +
                        ", " +
                        customer.customerCity +
                        ", " +
                        customer.province
                      }}
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <strong>Request Type</strong>
                      <br />{{ activerequest.name }}
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <strong>Dealer Name</strong>
                      <br />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <strong>Special Instruction</strong>
                      <br />{{ customer.specialinstruction }}
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <strong>Telephone #</strong>
                      <br />{{ customer.telephoneno }}
                    </v-col>

                    <v-col cols="12">
                      <strong>Units Details</strong>
                      <br />
                      <v-simple-table dense>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">Appliance Type</th>
                              <th class="text-left">Brand</th>
                              <th class="text-left">Model</th>
                              <th class="text-left">Appliance</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in units" :key="item.unitid">
                              <td>{{ item.appliancetype }}</td>
                              <td>{{ item.brand }}</td>
                              <td>{{ item.model }}</td>
                              <td>{{ item.prodcategories }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="confirmdialog = false || submit(5)"
                   v-if="!checkrebook"
                >
                  DRAFT
                </v-btn>
                <v-btn color="blue darken-1" text @click="submit(1)">
                   {{checkrebook ? 'UPDATE SERVICE REQUEST':'SUBMIT SERVICE REQUEST'}}
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="confirmdialog = false"
                >
                  CLOSE
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-dialog v-model="RefDialog" max-width="400">
              <v-card>
                <v-card-title class="text-h5">
                  {{
                    msg.data.iden == 0
                      ? "Request successfully submitted"
                      : msg.data.iden == 5
                      ? "Request Submitted as Draft"
                      : "File Exist"
                  }}
                </v-card-title>
                <v-card-text>
                  {{
                    msg.data.iden == 0
                      ? "Your Request ID is:" + msg.data.ref
                      : ""
                  }}</v-card-text
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="RefDialog = false || rebook()"
                  >
                    Rebook Same Client
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="RefDialog = false || booknew()"
                  >
                    Book New Client
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-dialog>
        </v-dialog>
      </div>
      <v-row no-gutters>
        <v-col cols="12" sm="4">
          <v-card class="pa-2" outlined tile>
            <vs-button
              style="background-color: white; min-width: 70px; color: black"
              @click="request({ name: 'REPAIR', id: 1 })"
              animation-type="scale"
            >
              <v-img src="/repair.png" style="width: 100px"> </v-img
              ><strong>REPAIR</strong>
              <template #animate>
                <strong style="margin-left: 10px">REQUEST &#9881;</strong>
                <v-img
                  src="/repair.png"
                  style="width: 70px; height: 70px"
                ></v-img>
              </template>
            </vs-button>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="pa-2" outlined tile>
            <vs-button
              style="background-color: white; min-width: 70px; color: black"
              @click="request({ name: 'CLEANING', id: 2 })"
              animation-type="scale"
            >
              <v-img src="/cleaning.png" style="width: 90px"> </v-img
              ><strong>CLEANING</strong>
              <template #animate>
                <strong style="margin-left: 10px">REQUEST &#9881;</strong>
                <v-img
                  src="/cleaning.png"
                  style="width: 70px; height: 70px"
                ></v-img>
              </template>
            </vs-button>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="pa-2" outlined tile>
            <vs-button
              style="background-color: white; min-width: 70px; color: black"
              @click="request({ name: 'SITE SURVEY', id: 3 })"
              animation-type="scale"
            >
              <v-img src="/survey.png" style="width: 100px"> </v-img
              ><strong>SITE SURVEY</strong>
              <template #animate>
                <strong style="margin-left: 10px">REQUEST &#9881;</strong>
                <v-img
                  src="/survey.png"
                  style="width: 70px; height: 70px"
                ></v-img>
              </template>
            </vs-button>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="pa-2" outlined tile>
            <vs-button
              style="background-color: white; min-width: 70px; color: black"
              @click="request({ name: 'INSTALLATION', id: 4 })"
              animation-type="scale"
            >
              <v-img src="/installation.png" style="width: 100px"> </v-img
              ><strong>INSTALLATION</strong>
              <template #animate>
                <strong style="margin-left: 10px"> REQUEST &#9881;</strong>
                <v-img
                  src="/installation.png"
                  style="width: 70px; height: 70px"
                ></v-img>
              </template>
            </vs-button>
          </v-card>
        </v-col>
      </v-row>
          <v-dialog v-model="purchaseorderalert" max-width="400">
          <v-card>
            <v-card-title>Purchased Order Date Verification</v-card-title>
            <v-card-text>
               Please Verify Purchased Order Date Before Proceed
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="proceed">Proceed</v-btn>
             
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- <vs-row>
        <vs-button
          style="background-color: white; min-width: 70px; color: black"
          @click="request({ name: 'REPAIR', id: 1 })"
          animation-type="scale"
        >
          <v-img src="/repair.png" style="width: 100px"> </v-img
          ><strong>REPAIR</strong>
          <template #animate>
            <strong style="margin-left: 10px">REQUEST &#9881;</strong>
            <v-img src="/repair.png" style="width: 70px; height: 70px"></v-img>
          </template>
        </vs-button>
        <vs-button
          style="background-color: white; min-width: 70px; color: black"
          @click="request({ name: 'CLEANING', id: 2 })"
          animation-type="scale"
        >
          <v-img src="/cleaning.png" style="width: 90px"> </v-img
          ><strong>CLEANING</strong>
          <template #animate>
            <strong style="margin-left: 10px">REQUEST &#9881;</strong>
            <v-img
              src="/cleaning.png"
              style="width: 70px; height: 70px"
            ></v-img>
          </template>
        </vs-button>

        <vs-button
          style="background-color: white; min-width: 70px; color: black"
          @click="request({ name: 'SITE SURVEY', id: 3 })"
          animation-type="scale"
        >
          <v-img src="/survey.png" style="width: 100px"> </v-img
          ><strong>SITE SURVEY</strong>
          <template #animate>
            <strong style="margin-left: 10px">REQUEST &#9881;</strong>
            <v-img src="/survey.png" style="width: 70px; height: 70px"></v-img>
          </template>
        </vs-button>

        <vs-button
          style="background-color: white; min-width: 70px; color: black"
          @click="request({ name: 'INSTALLATION', id: 4 })"
          animation-type="scale"
        >
          <v-img src="/installation.png" style="width: 100px"> </v-img
          ><strong>INSTALLATION</strong>
          <template #animate>
            <strong style="margin-left: 10px">REQUEST &#9881;</strong>
            <v-img
              src="/installation.png"
              style="width: 70px; height: 70px"
            ></v-img>
          </template>
        </vs-button>

        <vs-button
          style="background-color: white; min-width: 70px; color: black"
          @click="request({ name: 'INSTALLATION', id: 4 })"
          animation-type="scale"
        >
          <v-img src="/installation.png" style="width: 100px"> </v-img
          ><strong>INSTALLATION</strong>
          <template #animate>
            <strong style="margin-left: 10px">TEST &#9881;</strong>
            <v-img
              src="/installation.png"
              style="width: 70px; height: 70px"
            ></v-img>
          </template>
        </vs-button>
      </vs-row> -->
    </v-container>
  </div>
</template>
  
  <script>
var bookbyid;
var mapid;
import axios from "axios";
 // import
// Main JS (in UMD format)
import VueTimepicker from "vue2-timepicker";

// CSS
import "vue2-timepicker/dist/VueTimepicker.css";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength,
  numeric,
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import {
  regionByCode,
  provincesByCode,
  provinceByName,
  regions,
  provinces,
  cities,
  citiesName,
  barangays,
} from "select-philippines-address";
export default {
  components: { VueTimepicker },
  mixins: [validationMixin],
  validations: {
    data: {
      units: {
        serialno: { required },
        appliancetype: { required },
        brand: { required },
        model: { required },
        // unitcondition: { required },
        warrantycondition: { required },
        problem: { required },
        customer: { required },
        /// qty: { required },
      },

      usage: {
        propertytype: { required },
        wallfinish: { required },
        withpowersupply: { required },
        area: { required },
      },
    },
    customer: {
      cpnumber: {
        numeric,
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
      },
      lastname: { required },
      firstname: { required },
      bookby: { required },
      /// middlename: { required },
      ///  contactperson: { required },
      ///  houseno: { required },
      /// street: { required },
      barangay: { required },
      mcity: { required },
      province: { required },
      region: { required },
    },
  },
  data() {
    return {
      logbylabel: 'Enter Your Complete Name',
      filenamelabel: '',
      purchaseorderalert: false,
      customerid: '',
      rebookid: '',
      restoreId: "",
      menu1: "",
      addIden: 0,
      Identifier2: 1,
      InstallationAddress: 0,
      max: 11,
      maxtelephone: 8,
      text: "",
      sqm: "",
     // usersData: [],
      isLoading: false,
      itemsAuto: [],
      modelAuto: null,
      search: null,
      tab: null,
      ifcommercial: 0,
      problemItemsAuto: [],
      problemAuto: null,
      searchP: '',
       
      restoreBK: false,
      restoreHead: [
        { text: "REQUEST TYPE", value: "requesttype" },
        { text: "FIRSTNAME", value: "customer.firstname" },
        { text: "LASTNAME", value: "customer.lastname" },
        { text: "CONTACT NO", value: "customer.cpnumber" },
        { text: "DATE CREATED", value: "created_at" },
        { text: "RESTORE", value: "ActionRestore" },
      ],
      restoreList: [],
      checkrecords: false,
      msg: { data: { ref: "", iden: 4 } },
      RefDialog: false,
      confirmdialog: false,
      reqIdentifier: 0,
      requestType: "",
      row: null,
      bookingmodal: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      time: null,
      menu2: false,
      menu3: false,
      modal2: false,
      activerequest: { name: "" },
      selectedIndex: "",
      units: [],
      storeDataFinal: [],
      customerList: [],
      customerListHeaders: [
        { text: "FIRST NAME", value: "firstname" },
        { text: "LAST NAME", value: "lastname" },
        { text: "MOBILE NUMBER", value: "cpnumber" },
      ],
      customer: {
        landmark: "",
        customerCity: "",
        cpnumber: "",
        lastname: "",
        firstname: "",
        emailaddress: "",
        middlename: "",
        contactperson: "",
        telephoneno: "",
        houseno: "",
        street: "",
        region: "",
        barangay: "",
        mcity: {},
        province: "",
        locationunit: "",
        organization: "",
        organizationname: "",
        attachment: [],
        sketch: [],
        specialinstruction: "N/A",
        additionalrequest1: "N/A",
        additionalrequest2: "N/A",
        bookby: "ddd",
      },
      data: {
        units: {
          problem: "",
          prodcategories: "",
          appliancetype: "",
          brand: "",
          model: "",
          serialno: "",
          unitcondition: "",
          warrantycondition: "",
          qty: 1,
          demandreplacement: "",
          priority: "",
          datepurchase: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
        },
        usage: {
          or: "",
          propertytype: "",
          level: "",
          location: "",
          wallfinish: "",
          withpowersupply: "",
          area: 0,
          deliverydate: "",
          time: null,
          locationofinstallation: "",
          paidamoun: "",
        },
      },
      usagedetailsListDown: {
        propertytype: [],
        level: [],
        location: [],

        wallfinish: [
          { name: "YES", value: "YES" },
          { name: "NO", value: "NO" },
          {
            name: "N/A",
            value: "N/A",
          },
        ],
        withpowersupply: [
          { name: "INDOOR", value: "INDOOR" },
          { name: "OUTDOOR", value: "OUTDOOR" },
          { name: "NONE", value: "NONE" },
          {
            name: "N/A",
            value: "N/A",
          },
        ],
      },
      addressesListDown: {
        region: [],
        barangay: [],
        mcity: [],
        province: [],
      },
      productListDown: {
        problem: [
          {
            name: "NOT COOLING",
            value: "NOT COOLING",
          },
          {
            name: "NOISY MOTOR",
            value: "NOISY MOTOR",
          },
          {
            name: "POOR COOLING",
            value: "POOR COOLING",
          },
          {
            name: "AUTO SHUT OFF",
            value: "AUTO SHUT OFF",
          },
          {
            name: "NO PICTURE",
            value: "NO PICTURE",
          },
          {
            name: "NO SOUND",
            value: "NO SOUND",
          },
        ],

        prodcategories: [],
        appliancetype: [],
        brand: [],
        unitcondition: [
          {
            name: "BRAND NEW",
            value: "BRAND NEW",
          },
          {
            name: "REPO",
            value: "REPO",
          },
          {
            name: "STOCK",
            value: "STOCK",
          },
          {
            name: "CUSTOMER",
            value: "CUSTOMER",
          },
        ],
        warrantycondition: [
          {
            name: "WARRANTY",
            value: "WARRANTY",
          },
          {
            name: "OUT WARRANTY",
            value: "OUT WARRANTY",
          },
          {
            name: "REPOSSESSED",
            value: "REPOSSESSED",
          },
        ],
        demandreplacement: [
          {
            name: "7 DAYS WARRANTY",
            value: "7 DAYS WARRANTY",
          },
          {
            name: "DEFECTIVE UPON OPENING",
            value: "DEFECTIVE UPON OPENING",
          },
          {
            name: "N/A",
            value: "N/A",
          },
        ],
        priority: [
          {
            name: "HIGH",
            value: "HIGH",
          },
          {
            name: "MEDIUM",
            value: "MEDIUM",
          },
          {
            name: "LOW",
            value: "LOW",
          },
        ],
      },
    };
  },
  watch: {
    
    modelAuto(val) {
      if (val != null) this.tab = 0;
      else this.tab = null;
    },
    search(val) {
      // Items have already been loaded
      if (this.itemsAuto.length > 0) return;
      this.isLoading = true;
      // Lazily load input items
      fetch(this.$URLs.backend + "/api/random/exec")
        .then((res) => res.clone().json())
        .then((res) => {
          this.itemsAuto = res;
          console.log(res)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },

    problemAuto(val) {
      if (val != null) this.tab = 0;
      else this.tab = null;
    },
    searchP(val) {
      
      // Items have already been loaded
      if (this.problemItemsAuto.length > 0) return;
      this.isLoading = true;
      // Lazily load input items
      fetch(this.$URLs.frontend + "/api2/problem.json")
        .then((res) => res.clone().json())
        .then((res) => {
        
          this.problemItemsAuto = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  async mounted() {
    
     mapid = this.$route.params.mapid;
    if (mapid) {
      var data = JSON.parse(atob(mapid));
       
       this.$store
        .dispatch("app_booking_sys/getRequest", data.requestID)
        .then((res)   =>  {
          console.log(res)
           
          this.CopyDataRebook(res.data[0])
     
          if (res.data[0].requesttype == "INSTALLATION") {
     
            this.request2({ name: "INSTALLATION", id: 4 ,  requestid: res.data[0].requestid });
          } else if (res.data[0].requesttype == "REPAIR") {
     
           this.request2({ name: "REPAIR", id: 1 ,  requestid: res.data[0].requestid  });
          } else if (res.data[0].requesttype == "CLEANING") {
    
            this.request2({ name: "CLEANING", id: 2 ,  requestid: res.data[0].requestid  });
          } else if (res.data[0].requesttype == "SITE SURVEY") {
      
            this.request2({ name: "SITE SURVEY", id: 3 ,  requestid: res.data[0].requestid  });
          }
          //this.customer.cpnumber = res.data[0].customer.cpnumber;
          //bookbyid =  res.data[0].bookby
          //this.data.units = res.data[0].units[0]
          //this.data.usage = res.data[0].units[0]
           
          //this.filenamelabel = res.data[0].filename
          //this.logbylabel = bookbyid
          var data = {
              id: 20,
              Brand: res.data[0].units[0].brand,
              model: res.data[0].units[0].model,
              nomodel: '',
              type:  res.data[0].units[0].appliancetype,
              categories: res.data[0].units[0].prodcategories,
              SQM: '' 
          }
         
          //this.checkRecExist()
          this.modelsActivate(data)
          this.units = []
          this.addIden = 0

          // this.data = {
          //   units: {
          //     problem: "dddd",
          //     prodcategories: "",
          //     appliancetype: "",
          //     brand: "",
          //     model: "",
          //     serialno: "333",
          //     unitcondition: "",
          //     warrantycondition: "",
          //     qty: 1,
          //     demandreplacement: "",
          //     priority: "",
          //     datepurchase: new Date(
          //       Date.now() - new Date().getTimezoneOffset() * 60000
          //     )
          //       .toISOString()
          //       .substr(0, 10),
          //   },
          //   usage: {
          //     or: "",
          //     propertytype: "",
          //     level: "",
          //     location: "",
          //     wallfinish: "",
          //     withpowersupply: "",
          //     area: 0,
          //     deliverydate: "",
          //     time: null,
          //     locationofinstallation: "",
          //     paidamoun: "",
          //   },
          // };
        });
    }
  },
  created() {
    
    if(!axios.defaults.headers.common["Authorization"]){
        this.$router.push('/verify');
    }
 
    // this.$store.dispatch("fetchDBAll");
    this.$store.dispatch("app_booking_sys/FetchUnitFields").then((res) => {
      console.log(res.data);
      this.usagedetailsListDown.propertytype = res.data.propertytype;
      this.usagedetailsListDown.level = res.data.level;
      this.usagedetailsListDown.location = res.data.level;
    });
    regions().then((region) => (this.addressesListDown.region = region));

   // this.usersData = this.$store.state.currentUser;
    fetch(this.$URLs.backend + "/api/random/exec")
      .then((res) => res.clone().json())
      .then((res) => {
        this.itemsAuto = res;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));
  },
  computed: {
    checkrebook(){
      return this.rebookid
    },
    areaError() {
      const errors = [];
      if (parseFloat(this.sqm) < parseFloat(this.data.usage.area)) {
        alert("Area is Under Capacity");
        return "MAX SQM UP TO " + this.sqm;
      } else {
        return "";
      }
    },

    checkwarranty() {
      const checkwarranties =
        this.data.units.warrantycondition == "WARRANTY" ? true : false;
      return checkwarranties;
    },
    // PRODUCT INFO VALIDATION
    appliancetypeError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.appliancetype.$dirty) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.appliancetype.required && errors.push(RequiredError);
      return errors;
    },
    brandError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.brand.$dirty) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.brand.required && errors.push(RequiredError);
      return errors;
    },
    serialError() {
      const errors = [];
      var RequiredError = null;
      if (this.activerequest.name == "REPAIR") {
        return errors;
      } else if (this.activerequest.name == "SITE SURVEY") {
        return errors;
      } else if (this.activerequest.name == "CLEANING") {
        return errors;
      } else {
        if (!this.$v.data.units.serialno.$dirty) return errors;
        RequiredError = "This field is required.";
        !this.$v.data.units.serialno.required && errors.push(RequiredError);
        return errors;
      }
    },
    modelError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.model.$dirty) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.model.required && errors.push(RequiredError);
      return errors;
    },
    qtyError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.qty) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.qty.required && errors.push(RequiredError);
      return errors;
    },
    // unitconditionError() {
    //   const errors = [];
    //   var RequiredError = null;
    //   if (!this.$v.data.units.unitcondition) return errors;
    //   RequiredError = "This field is required.";
    //   !this.$v.data.units.unitcondition.required && errors.push(RequiredError);
    //   return errors;
    // },
    lognameError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.bookby) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.bookby.required && errors.push(RequiredError);
      return errors;
    },
    problemError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.problem) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.problem.required && errors.push(RequiredError);
      return errors;
    },
    warrantyconditionError() {
      const errors = [];
      var RequiredError = null;

      if (
        this.activerequest.name == "SITE SURVEY" ||
        this.activerequest.name == "CLEANING"
      ) {
        return errors;
      } else {
        if (!this.$v.data.units.warrantycondition) return errors;
        RequiredError = "This field is required.";
        !this.$v.data.units.warrantycondition.required &&
          errors.push(RequiredError);
        return errors;
      }
    },
    //->CONTACT INFO VALIDATE
    cpnumberError() {
      const errors = [];
      var RequiredError = null;
      if (this.customer.cpnumber.length !== 11) {
        RequiredError = "Ex: 09152212736";
        errors.push(RequiredError);
      }
      return errors;
    },
    checkIdentifier() {
      var v;
      if (this.customer.cpnumber.length !== 11) {
        v = 1;
      } else {
        v = 0;
      }
      return v;
    },
    lastnameError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.lastname) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.lastname.required && errors.push(RequiredError);
      return errors;
    },
    firstnameError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.firstname) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.firstname.required && errors.push(RequiredError);
      return errors;
    },
    middlenameError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.middlename) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.middlename.required && errors.push(RequiredError);
      return errors;
    },
    contactpersonError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.contactperson) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.contactperson.required && errors.push(RequiredError);
      return errors;
    },
    housenoError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.houseno) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.houseno.required && errors.push(RequiredError);
      return errors;
    },
    streetError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.street) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.street.required && errors.push(RequiredError);
      return errors;
    },
    barangayError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.barangay) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.barangay.required && errors.push(RequiredError);
      return errors;
    },

    mcityError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.mcity) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.mcity.required && errors.push(RequiredError);
      return errors;
    },
    provinceError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.province) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.province.required && errors.push(RequiredError);
      return errors;
    },
    regionError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.region) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.region.required && errors.push(RequiredError);
      return errors;
    },

    CustomerALLError() {
      this.$v.customer.$touch();
      if (!this.$v.customer.$error) {
        if (!this.units || !this.units.length) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },

    UnitsALLError() {
      // || this.activerequest.name == 'SITE SURVEY' || this.activerequest.name == 'CLEANING'
      if (this.activerequest.name == "REPAIR") {
        this.$v.data.units.$touch();
        if (
          !this.$v.data.units.appliancetype.$error &&
          !this.$v.data.units.brand.$error &&
          // !this.$v.data.units.unitcondition.$error &&
          !this.$v.data.units.warrantycondition.$error &&
          !this.$v.data.units.problem.$error
        ) {
          return false;
        }
      } else if (this.activerequest.name == "CLEANING") {
        if (
          !this.$v.data.units.appliancetype.$error &&
          !this.$v.data.units.brand.$error
          // !this.$v.data.units.unitcondition.$error &&
          //!this.$v.data.units.warrantycondition.$error
        ) {
          return false;
        }
      } else if (this.activerequest.name == "SITE SURVEY") {
        if (
          !this.$v.data.units.appliancetype.$error &&
          !this.$v.data.units.brand.$error
          // !this.$v.data.units.unitcondition.$error &&
          // !this.$v.data.units.warrantycondition.$error
        ) {
          return false;
        }
      } else {
        if (
          !this.$v.data.units.appliancetype.$error &&
          !this.$v.data.units.brand.$error &&
          // !this.$v.data.units.unitcondition.$error &&
          !this.$v.data.units.warrantycondition.$error &&
          !this.$v.data.units.serialno.$error
        ) {
          return false;
        }
      }

      return true;
    },
    withpowersupplyError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.usage.withpowersupply) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.usage.withpowersupply.required &&
        errors.push(RequiredError);
      return errors;
    },
    wallfinishError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.usage.wallfinish) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.usage.wallfinish.required && errors.push(RequiredError);
      return errors;
    },
    propertytypeError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.usage.propertytype) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.usage.propertytype.required && errors.push(RequiredError);
      return errors;
    },
  },
  methods: {
    getBook() {
      alert();
    },
    regionD() {
      provinces(this.customer.region).then(
        (province) => (this.addressesListDown.province = province)
      );
    },
    provinceD() {
      provinceByName(this.customer.province).then((province) =>
        cities(province.province_code).then(
          (city) => (this.addressesListDown.mcity = city)
        )
      );
    },
    mcityD() {
      barangays(this.customer.mcity).then(
        (barangays) => (this.addressesListDown.barangay = barangays)
      );
    },
    brgyD() {
      citiesName(this.customer.mcity).then(
        (city) => (this.customer.customerCity = city[0].city_name)
      );
    },
    getindex: function () {
      const AIRCONDITION = [
        {
          name: "SPLIT TYPE",
          value: "SPLIT TYPE",
        },
        {
          name: "WINDOW TYPE",
          value: "WINDOW TYPE",
        },
        {
          name: "FLOOR MOUNTED",
          value: "FLOOR MOUNTED",
        },
        {
          name: "CEILING CASSETTE",
          value: "CEILING CASSETTE",
        },
        {
          name: "CEILING MOUNTED",
          value: "CEILING MOUNTED",
        },
        {
          name: "PORTABLE TYPE",
          value: "PORTABLE TYPE",
        },
        {
          name: "VRF TYPE",
          value: "VRF TYPE",
        },
        {
          name: "MULTI-SPLIT TYPE",
          value: "MULTI-SPLIT TYPE",
        },
      ];
      const REFREGERATOR = [
        {
          name: "SIDE BY SIDE",
          value: "SIDE BY SIDE",
        },
        {
          name: "TWO DOOR",
          value: "TWO DOOR",
        },
        {
          name: "SINGLE DOOR",
          value: "SINGLE DOOR",
        },
      ];
      const EMPTY = [
        {
          name: "N/A",
          value: "N/A",
        },
      ];

      const APPLIANCETYPE = this.data.units.prodcategories;
      if (APPLIANCETYPE == "REFRIGERATOR") {
        // this.productListDown.appliancetype = REFREGERATOR;
      } else if (APPLIANCETYPE == "AIRCONDITION") {
        // this.productListDown.appliancetype = AIRCONDITION;
      } else {
        // this.productListDown.appliancetype = EMPTY;
      }
      this.$store
        .dispatch("app_booking_sys/getCat", this.data.units.prodcategories)
        .then((res) => {
          this.productListDown.appliancetype = res.data;
        });
    },
    gen() {
      var testData = {
        units: {
          prodcategories: "AIRCONDITION",
          appliancetype: "SPLIT TYPE",
          brand: "CARRIER",
          model: "LG2-374933",
          serialno: "342546335",
          unitcondition: "BRAND NEW",
          warrantycondition: "OUT WARRANTY",
          qty: 1,
          demandreplacement: "7 DAYS WARRANTY",
          priority: "HIGH",
          datepurchase: "12/12/2022",
        },
      };

      var usage = {
        usage: {
          propertytype: "UNIVERSITY",
          level: "1 FLOOR",
          location: "OFFICE",
          area: "200",
          wallfinish: "YES",
          withpowersupply: "YES",
          deliverydate: "",
          time: null,
          locationofinstallation: "ASINGAN",
          paidamoun: "20000",
        },
        units: {
          prodcategories: "AIRCONDITION",
          appliancetype: "SPLIT TYPE",
          brand: "CARRIER",
          model: "LG2-374933",
          serialno: "342546335",
          unitcondition: "BRAND NEW",
          warrantycondition: "OUT WARRANTY",
          qty: 1,
          demandreplacement: "7 DAYS WARRANTY",
          priority: "HIGH",
          datepurchase: "12/12/2022",
        },
      };
      this.customer = {
        cpnumber: "9384736475",
        lastname: "CALIMLIM",
        firstname: "STEVEN",
        emailaddress: "calimlim.steven@gmail.com",
        middlename: "FERNANDEZ",
        contactperson: "JAMES DOE",
        telephoneno: "34534453",
        houseno: "243",
        street: "PUROK SILAW",
        barangay: "Domanpot",
        mcity: "Asingan",
        province: "Pangasinan",
        locationunit: "N/A",
        organization: "1",
        attachment: [],
        specialinstruction: "NONE",
        additionalrequest1:
          "Long ladder needed for unit located above 10ft/3m (+Php 380)",
        additionalrequest2: "",
      };

      if (this.activerequest.name == "INSTALLATION") {
        this.data = usage;
      }
      if (this.activerequest.name == "CLEANING") {
        this.data = testData;
      }
    },
    add() {
      if (this.activerequest.name == "INSTALLATION") {
        if (this.data.usage.area !== "") {
          this.$v.data.units.$touch();
          this.$v.data.usage.$touch();
          if (
            !this.$v.data.units.appliancetype.$error &&
            !this.$v.data.units.brand.$error &&
            !this.$v.data.units.model.$error &&
            // !this.$v.data.units.unitcondition.$error &&
            !this.$v.data.units.warrantycondition.$error &&
            !this.$v.data.usage.$error
          ) {
            const add = {
              unitid:
                "UNIT-" +
                this.data.units.brand +
                "-" +
                Math.ceil(Math.random() * 1000000),
              prodcategories: this.data.units.prodcategories,
              appliancetype: this.data.units.appliancetype,
              brand: this.data.units.brand,
              model: this.data.units.model,
              serialno: this.data.units.serialno,
              unitcondition: this.data.units.unitcondition,
              warrantycondition: this.data.units.warrantycondition,
              qty: this.data.units.qty,
              demandreplacement: this.data.units.demandreplacement,
              priority: this.data.units.priority,
              datepurchase: this.data.units.datepurchase,
              problem: this.data.units.problem,
              //usage
              ornumber: this.data.usage.or,
              propertytype: this.data.usage.propertytype,
              level: this.data.usage.level,
              location: this.data.usage.location,
              area: this.data.usage.area,
              wallfinish: this.data.usage.wallfinish,
              withpowersupply: this.data.usage.withpowersupply,
              deliverydate: this.data.usage.deliverydate,
              time: this.data.usage.time,
              locationofinstallation:
                this.InstallationAddress == 0
                  ? 0
                  : this.data.usage.locationofinstallation,
              paidamoun: this.data.usage.paidamoun,
            };
            this.units.push(add);
            this.storeDataFinal.push(add);
            this.addIden = 1;
          }
        } else {
          alert("Area Required!");
        }
      } else if (this.activerequest.name == "REPAIR") {
        this.$v.data.units.$touch();

        if (
          !this.$v.data.units.appliancetype.$error &&
          !this.$v.data.units.brand.$error &&
          !this.$v.data.units.model.$error &&
          // !this.$v.data.units.unitcondition.$error &&
          !this.$v.data.units.warrantycondition.$error &&
          !this.$v.data.units.problem.$error
        ) {
          const add = {
            unitid:
              "UNIT-" +
              this.data.units.brand +
              "-" +
              Math.ceil(Math.random() * 1000000),
            prodcategories: this.data.units.prodcategories,
            appliancetype: this.data.units.appliancetype,
            brand: this.data.units.brand,
            model: this.data.units.model,
            serialno: this.data.units.serialno,
            unitcondition: this.data.units.unitcondition,
            warrantycondition: this.data.units.warrantycondition,
            qty: this.data.units.qty,
            demandreplacement: this.data.units.demandreplacement,
            priority: this.data.units.priority,
            datepurchase: this.data.units.datepurchase,
            problem: this.data.units.problem,
            //usage
            ornumber: this.data.usage.or,
            propertytype: this.data.usage.propertytype,
            level: this.data.usage.level,
            location: this.data.usage.location,
            area: this.data.usage.area,
            wallfinish: this.data.usage.propertytype,
            withpowersupply: this.data.usage.wallfinish,
            deliverydate: this.data.usage.deliverydate,
            time: this.data.usage.time,
            locationofinstallation:
              this.InstallationAddress == 0
                ? 0
                : this.data.usage.locationofinstallation,
            paidamoun: this.data.usage.paidamoun,
          };
          this.units.push(add);
          this.storeDataFinal.push(add);
          this.addIden = 1;
        }
      } else if (this.activerequest.name == "SITE SURVEY") {
        this.$v.data.units.$touch();

        if (
          !this.$v.data.units.appliancetype.$error &&
          !this.$v.data.units.brand.$error &&
          !this.$v.data.units.model.$error
          // !this.$v.data.units.unitcondition.$error &&
          // !this.$v.data.units.warrantycondition.$error &&
        ) {
          const add = {
            unitid:
              "UNIT-" +
              this.data.units.brand +
              "-" +
              Math.ceil(Math.random() * 1000000),
            prodcategories: this.data.units.prodcategories,
            appliancetype: this.data.units.appliancetype,
            brand: this.data.units.brand,
            model: this.data.units.model,
            serialno: this.data.units.serialno,
            unitcondition: this.data.units.unitcondition,
            warrantycondition: "",
            qty: this.data.units.qty,
            demandreplacement: this.data.units.demandreplacement,
            priority: this.data.units.priority,
            datepurchase: this.data.units.datepurchase,
            problem: this.data.units.problem,
            //usage
            ornumber: this.data.usage.or,
            propertytype: this.data.usage.propertytype,
            level: this.data.usage.level,
            location: this.data.usage.location,
            area: this.data.usage.area,
            wallfinish: this.data.usage.propertytype,
            withpowersupply: this.data.usage.wallfinish,
            deliverydate: this.data.usage.deliverydate,
            time: this.data.usage.time,
            locationofinstallation:
              this.InstallationAddress == 0
                ? 0
                : this.data.usage.locationofinstallation,
            paidamoun: this.data.usage.paidamoun,
          };
          this.units.push(add);
          this.storeDataFinal.push(add);
          this.addIden = 1;
        }
      } else if (this.activerequest.name == "CLEANING") {
        this.$v.data.units.$touch();
        if (
          !this.$v.data.units.appliancetype.$error &&
          !this.$v.data.units.brand.$error &&
          !this.$v.data.units.model.$error
          // !this.$v.data.units.unitcondition.$error &&
        ) {
          const add = {
            unitid:
              "UNIT-" +
              this.data.units.brand +
              "-" +
              Math.ceil(Math.random() * 1000000),
            prodcategories: this.data.units.prodcategories,
            appliancetype: this.data.units.appliancetype,
            brand: this.data.units.brand,
            problem: this.data.units.problem,
            model: this.data.units.model,
            serialno: this.data.units.serialno,
            unitcondition: this.data.units.unitcondition,
            warrantycondition: this.data.units.warrantycondition,
            qty: this.data.units.qty,
            demandreplacement: this.data.units.demandreplacement,
            priority: this.data.units.priority,
            datepurchase: this.data.units.datepurchase,
            locationofinstallation:
              this.InstallationAddress == 0
                ? 0
                : this.data.usage.locationofinstallation,
          };
          this.units.push(add);
          this.storeDataFinal.push(add);
          this.addIden = 1;
        }
      } else {
        this.$v.data.units.$touch();
        if (
          !this.$v.data.units.appliancetype.$error &&
          !this.$v.data.units.brand.$error &&
          !this.$v.data.units.model.$error &&
          // !this.$v.data.units.unitcondition.$error &&
          !this.$v.data.units.warrantycondition.$error
        ) {
          const add = {
            unitid:
              "UNIT-" +
              this.data.units.brand +
              "-" +
              Math.ceil(Math.random() * 1000000),
            prodcategories: this.data.units.prodcategories,
            appliancetype: this.data.units.appliancetype,
            brand: this.data.units.brand,
            problem: this.data.units.problem,
            model: this.data.units.model,
            serialno: this.data.units.serialno,
            unitcondition: this.data.units.unitcondition,
            warrantycondition: this.data.units.warrantycondition,
            qty: this.data.units.qty,
            demandreplacement: this.data.units.demandreplacement,
            priority: this.data.units.priority,
            datepurchase: this.data.units.datepurchase,
            locationofinstallation:
              this.InstallationAddress == 0
                ? 0
                : this.data.usage.locationofinstallation,
          };
          this.units.push(add);
          this.storeDataFinal.push(add);
          this.addIden = 1;
        }
      }
    },

    editItem() {
      var items = this.units[0];
      this.productListDown.prodcategories = {
        name: items.prodcategories,
        value: items.prodcategories,
      };
      this.productListDown.appliancetype = {
        name: items.appliancetype,
        value: items.appliancetype,
      };
      this.productListDown.brand = { name: items.brand, value: items.brand };

      this.data = {
        units: {
          prodcategories: items.prodcategories,
          appliancetype: items.appliancetype,
          brand: items.brand,
          model: items.model,
          serialno: items.serialno,
          unitcondition: items.unitcondition,
          warrantycondition: items.warrantycondition,
          qty: items.qty,
          demandreplacement: items.demandreplacement,
          priority: items.priority,
          datepurchase: items.datepurchase,
          problem: items.problem,
        },
        usage: {
          propertytype: items.propertytype,
          level: items.level,
          location: items.location,
          area: items.area,
          wallfinish: items.wallfinish,
          withpowersupply: items.withpowersupply,
          deliverydate: items.deliverydate,
          time: items.time,
          locationofinstallation: items.locationofinstallation,
          paidamoun: items.paidamoun,
          or: items.ornumber,
        },
      };
    },
    trashUnits(item) {
      this.addIden = 0;
      this.units.splice(this.units.indexOf(item), 1);
      this.storeDataFinal.splice(this.storeDataFinal.indexOf(item), 1);
    },
    checkoutFinal() {
      if (!this.$v.customer.$error) {
        this.confirmdialog = true;
      }
    },
    checkout() {
      alert("Please Verify Purchased Order Date Before Proceed")
      var message =
        "Please ensure that all required attachments are provided:\n\n" +
        "- Sketch\n" +
        "- Invoice - Required if Items are Warranty\n" +
        "Failure to include these files may impact the processing of your request.";

      if (this.reqIdentifier == 4) {
        if (this.checkwarranty == true) {
          //true
          if (this.customer.attachment.length !== 0 && this.customer.sketch) {
            this.checkoutFinal();
          } else {
            this.reqIdentifier;
            if (this.reqIdentifier == 3 || this.reqIdentifier == 2) {
              this.checkoutFinal();
            } else {
              alert(message);
            }
          }
        } else {
          //false
          if (this.customer.sketch) {
            this.checkoutFinal();
          } else {
            this.reqIdentifier;
            if (this.reqIdentifier == 3 || this.reqIdentifier == 2) {
              this.checkoutFinal();
            } else {
              alert(message);
            }
          }
        }
      } else {
        if (this.reqIdentifier == 1) {
          if (this.checkwarranty == true) {
            //true
            if (this.customer.attachment.length !== 0) {
              this.checkoutFinal();
            } else {
              alert(message);
            }
          } else {
            this.checkoutFinal();
          }
        } else {
          this.checkoutFinal();
        }
      }
    },

    increment() {
      this.data.units.qty++;
    },
    decrement() {
      if (this.data.units.qty === 1) {
        alert("Negative quantity not allowed");
      } else {
        this.data.units.qty--;
      }
    },
    rebook() {
      this.addIden = 0;
      this.confirmdialog = false;
      this.storeDataFinal = [];
      this.units = [];
      this.requestType =
        "REF-" + this.activerequest + "-" + Math.ceil(Math.random() * 1000000);
      this.data = {
        units: {
          prodcategories: "",
          appliancetype: "",
          brand: "",
          model: "",
          serialno: "",
          unitcondition: "",
          warrantycondition: "",
          qty: "",
          demandreplacement: "",
          priority: "",
          datepurchase: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
        },

        usage: {
          propertytype: "",
          level: "",
          location: "",
          or: "",
          area: "",
          wallfinish: "",
          withpowersupply: "",
          deliverydate: "",
          time: null,
          locationofinstallation: "",
          paidamoun: "",
        },
      };
    },
   request(data) { 
      this.clearcookies();
      //this.bookingmodals = true;
      this.bookingmodal = true;
      this.activerequest = data;
      this.reqIdentifier = data.id;
      console.log(data);
      this.requestType =
        "REF-" + data.name + "-" + Math.ceil(Math.random() * 1000000);
      this.rebookid = data.requestid
           
    },
    request2(data) { 
    
      //this.bookingmodals = true;
      this.bookingmodal = true;
      this.activerequest = data;
      this.reqIdentifier = data.id;
      console.log(data);
      this.requestType =
        "REF-" + data.name + "-" + Math.ceil(Math.random() * 1000000);
      this.rebookid = data.requestid
           
    },
    submit(req) {
     
      const d = {
        identify: req,
        requestid: this.requestType,
        requestType: this.activerequest.name,
        customer: this.customer,
        units: this.units,
        restoreid: this.restoreId,
        rebookid: this.rebookid
      };
    
      if(this.rebookid){
        console.log(d)
        // var dta = JSON.parse(atob(mapid));
        //     this.$store.dispatch("app_booking_sys/RebookBooking", d).then((res) => {
        //     this.msg = res;
        //     this.RefDialog = true;
        //     this.$socket.emit("notification", res);
        //     this.$store.dispatch("app_booking_sys/RebookAction", dta)
                
        //     this.$swal.fire(
        //                     "Rebook",
        //                     "Your file has been Rebook",
        //                     "success"
        //                 );
        //     this.$router.push('/app/booking/jobs/');
        //    });
      }else{
         console.log(d)
         this.$store.dispatch("app_booking_sys/selfBooking", d).then((res) => {
            console.log(res)
                
          });
      }
      
    },
    
    refresh() {},
    clearcookies() {
      this.storeDataFinal = [];
      this.units = [];
      (this.reqIdentifier = 0),
        (this.customer = {
          
          cpnumber: "",
          lastname: "",
          firstname: "",
          emailaddress: "",
          middlename: "",
          contactperson: "",
          telephoneno: "",
          houseno: "",
          street: "",
          barangay: "",
          mcity: "",
          province: "",
          locationunit: "",
          organization: "",
          attachment: [],
          specialinstruction: "",
          additionalrequest1: "",
          additionalrequest2: "",
        }),
        (this.data = {
          units: {
            prodcategories: "",
            appliancetype: "",
            brand: "",
            model: "",
            serialno: "",
            unitcondition: "",
            warrantycondition: "",
            qty: "",
            demandreplacement: "",
            priority: "",
            datepurchase: new Date(
              Date.now() - new Date().getTimezoneOffset() * 60000
            )
              .toISOString()
              .substr(0, 10),
          },

          usage: {
            or: "",
            propertytype: "",
            level: "",
            location: "",
            area: "",
            wallfinish: "",
            withpowersupply: "",
            deliverydate: "",
            time: null,
            locationofinstallation: "",
            paidamoun: "",
          },
        });
    },
    trash(data) {},
    checkRecExist() {
      let id = { number: this.customer.cpnumber };
      this.$store
        .dispatch("app_booking_sys/JobsCheckRecords", id)
        .then((res) => {
          console.log(res.data);
          this.customerList = res.data;
          if (this.customerList[0]) {
            this.Identifier2 = 2;
            this.selectedCustomer(this.customerList[0]);
            //this.checkrecords = true;
          } else {
            this.Identifier2 = 2;
          }
        });
    },
    selectedCustomer(data) {
      (this.addressesListDown.province = {
        province_name: data.province,
        brgy_code: data.province,
      }),
        (this.addressesListDown.mcity = {
          city_name: data.mcity,
          brgy_code: data.mcity,
        }),
        (this.addressesListDown.barangay = {
          brgy_name: data.barangay,
          brgy_code: data.barangay,
        }),
        (this.customer = {
          customerCity: data.mcity,
          cpnumber: data.cpnumber,
          lastname: data.firstname,
          firstname: data.lastname,
          emailaddress: data.emailaddress,
          middlename: data.middlename,
          contactperson: data.contactperson,
          telephoneno: data.telephoneno,
          attachment: [],
          region: data.region_id,
          houseno: data.houseno,
          street: data.street,
          barangay: data.barangay,
          mcity: data.mcity,
          province: data.province,
        });
      this.checkrecords = false;
    },

    restore() {
      this.restoreBK = true;

      var data = {
        type: this.requestType,
      };
      this.$store.dispatch("app_booking_sys/restoreBk", data).then((res) => {
        this.restoreList = res.data;

        console.log(res.data);
      });
    },
    restoreNow(restoreData) {
      const DATA = [];
      restoreData.units.map(function (value, key) {
        const add = {
          unitid:
            "UNIT-" + value.brand + "-" + Math.ceil(Math.random() * 1000000),
          prodcategories: value.prodcategories,
          appliancetype: value.appliancetype,
          brand: value.brand,
          model: value.model,
          serialno: value.serialno,
          unitcondition: value.unitcondition,
          warrantycondition: value.warrantycondition,
          qty: value.qty,
          demandreplacement: value.demandreplacement,
          priority: value.priority,
          datepurchase: value.datepurchase,
          problem: value.problem,
          //usage
          propertytype: value.propertytype,
          level: value.level,
          location: value.location,
          area: value.area,
          wallfinish: value.wallfinish,
          withpowersupply: value.withpowersupply,
          deliverydate: value.deliverydate,
          time: value.time,
          locationofinstallation: value.locationofinstallation,
          paidamoun: value.paidamoun,
        };

        DATA.push(add);
      });
      this.units = DATA;
      this.storeDataFinal = DATA;
      (this.addressesListDown.province = {
        province_name: restoreData.customer.province,
        brgy_code: restoreData.customer.province,
      }),
        (this.addressesListDown.mcity = {
          city_name: restoreData.customer.mcity,
          brgy_code: restoreData.customer.mcity,
        }),
        (this.addressesListDown.barangay = {
          brgy_name: restoreData.customer.barangay,
          brgy_code: restoreData.customer.barangay,
        }),
        (this.customer = {
          organizationname: restoreData.organizationname,
          bookby: restoreData.bookby,
          customerCity: restoreData.customer.mcity,
          cpnumber: restoreData.customer.cpnumber,
          lastname: restoreData.customer.lastname,
          firstname: restoreData.customer.firstname,
          region: { region_code: restoreData.customer.region_id },
          emailaddress:
            restoreData.customer.emailaddress == "null"
              ? "N/A"
              : restoreData.customer.emailaddress,
          middlename: restoreData.customer.middlename,
          contactperson: restoreData.customer.contactperson,
          telephoneno:
            restoreData.customer.telephoneno == "null"
              ? "N/A"
              : restoreData.customer.telephoneno,
          landmark: restoreData.landmark,
          houseno: restoreData.customer.houseno,
          street: restoreData.customer.street,
          barangay: restoreData.customer.barangay,
          mcity: restoreData.customer.mcity,
          province: restoreData.customer.province,
          locationunit: restoreData.customer.locationunit,
          organization: restoreData.customer.organization,
          attachment: restoreData.attachment
            ? [{ name: restoreData.filename, path: restoreData.attachment }]
            : "",
          specialinstruction: restoreData.customer.specialinstruction,
          additionalrequest1: restoreData.customer.additionalrequest1,
          additionalrequest2: restoreData.customer.additionalrequest2,
          sketch: [{ name: restoreData.attachfiles[0].name, path: restoreData.attachfiles[0].attachment_loc }]
        });
      this.requestType =
        "REF-" +
        restoreData.requesttype +
        "-" +
        Math.ceil(Math.random() * 1000000);
      //this.$store.dispatch("app_booking_sys/closeRestore",{id: restoreData['id']})
      this.restoreId = restoreData["id"];
      this.restoreList.splice(this.restoreList.indexOf(restoreData), 1);
      this.addIden = 1;
      this.editItem();
    },
    CopyDataRebook(restoreData) {
       let attachData = restoreData.attachfiles?.[0] ? [{ 
          name: restoreData.attachfiles[0].name, 
          path: restoreData.attachfiles[0].attachment_loc 
      }] : "";
      const DATA = [];
      restoreData.units.map(function (value, key) {
        const add = {
          unitid:
            "UNIT-" + value.brand + "-" + Math.ceil(Math.random() * 1000000),
          prodcategories: value.prodcategories,
          appliancetype: value.appliancetype,
          brand: value.brand,
          model: value.model,
          serialno: value.serialno,
          unitcondition: value.unitcondition,
          warrantycondition: value.warrantycondition,
          qty: value.qty,
          demandreplacement: value.demandreplacement,
          priority: value.priority,
          datepurchase: value.datepurchase,
          problem: value.problem,
          //usage
          propertytype: value.propertytype,
          level: value.level,
          location: value.location,
          area: value.area,
          wallfinish: value.wallfinish,
          withpowersupply: value.withpowersupply,
          deliverydate: value.deliverydate,
          time: value.time,
          locationofinstallation: value.locationofinstallation,
          paidamoun: value.paidamoun,
        };

        DATA.push(add);
      });
      this.units = DATA;
      this.storeDataFinal = DATA;
      (this.addressesListDown.province = {
        province_name: restoreData.customer.province,
        brgy_code: restoreData.customer.province,
      }),
        (this.addressesListDown.mcity = {
          city_name: restoreData.customer.mcity,
          brgy_code: restoreData.customer.mcity,
        }),
        (this.addressesListDown.barangay = {
          brgy_name: restoreData.customer.barangay,
          brgy_code: restoreData.customer.barangay,
        }),
        (this.customer = {
          organizationname: restoreData.organizationname,
          bookby: restoreData.bookby,
          customerCity: restoreData.customer.mcity,
          cpnumber: restoreData.customer.cpnumber,
          lastname: restoreData.customer.lastname,
          firstname: restoreData.customer.firstname,
          region: { region_code: restoreData.customer.region_id },
          emailaddress:
            restoreData.customer.emailaddress == "null"
              ? "N/A"
              : restoreData.customer.emailaddress,
          middlename: restoreData.customer.middlename,
          contactperson: restoreData.customer.contactperson,
          telephoneno:
            restoreData.customer.telephoneno == "null"
              ? "N/A"
              : restoreData.customer.telephoneno,
          landmark: restoreData.landmark,
          houseno: restoreData.customer.houseno,
          street: restoreData.customer.street,
          barangay: restoreData.customer.barangay,
          mcity: restoreData.customer.mcity,
          province: restoreData.customer.province,
          locationunit: restoreData.customer.locationunit,
          organization: restoreData.customer.organization,
           attachment: restoreData.attachment
            ? [{ name: restoreData.filename, path: restoreData.attachment }]
            : "",
          specialinstruction: restoreData.customer.specialinstruction,
          additionalrequest1: restoreData.customer.additionalrequest1,
          additionalrequest2: restoreData.customer.additionalrequest2,
          sketch:  attachData 
        });
      this.requestType =
        "REF-" +
        restoreData.requesttype +
        "-" +
        Math.ceil(Math.random() * 1000000);
      //this.$store.dispatch("app_booking_sys/closeRestore",{id: restoreData['id']})
      
      this.restoreList.splice(this.restoreList.indexOf(restoreData), 1);
      this.addIden = 1;
      this.editItem();
    },
    modelsActivate(data) {
       
      this.sqm = data.SQM;
      this.productListDown.prodcategories = data.categories;
      this.productListDown.appliancetype = data.type;
      this.productListDown.brand = data.Brand;
      this.data.units.brand = data.Brand;

      this.data.units.prodcategories = data.categories;
      if (data.nomodel == 1) {
        this.productListDown.brand = data.Brand2;
        this.productListDown.prodcategories = data.cat;
        this.productListDown.appliancetype = data.type;
      }
      if (data.type) {
        this.data.units.appliancetype = data.type;
      } else {
        const AIRCONDITION = [
          {
            name: "SPLIT TYPE",
            value: "SPLIT TYPE",
          },
          {
            name: "WINDOW TYPE",
            value: "WINDOW TYPE",
          },
          {
            name: "FLOOR MOUNTED",
            value: "FLOOR MOUNTED",
          },
          {
            name: "CEILING CASSETTE",
            value: "CEILING CASSETTE",
          },
          {
            name: "CEILING MOUNTED",
            value: "CEILING MOUNTED",
          },
          {
            name: "PORTABLE TYPE",
            value: "PORTABLE TYPE",
          },
          {
            name: "VRF TYPE",
            value: "VRF TYPE",
          },
          {
            name: "MULTI-SPLIT TYPE",
            value: "MULTI-SPLIT TYPE",
          },
        ];
        const REFREGERATOR = [
          {
            name: "SIDE BY SIDE",
            value: "SIDE BY SIDE",
          },
          {
            name: "TWO DOOR",
            value: "TWO DOOR",
          },
          {
            name: "SINGLE DOOR",
            value: "SINGLE DOOR",
          },
        ];
        const EMPTY = [
          {
            name: "N/A",
            value: "N/A",
          },
        ];

        const APPLIANCETYPE = data.categories;
        if (APPLIANCETYPE == "REFRIGERATOR") {
          this.productListDown.appliancetype = REFREGERATOR;
        } else if (APPLIANCETYPE == "AIRCONDITION") {
          this.productListDown.appliancetype = AIRCONDITION;
        } else {
          this.productListDown.appliancetype = EMPTY;
        }
      }
         
    },

    booknew() {
      this.addIden = 0;
      this.confirmdialog = false;
      this.storeDataFinal = [];
      this.units = [];
      this.requestType =
        "REF-" +
        this.activerequest.name +
        "-" +
        Math.ceil(Math.random() * 1000000);
      this.data = {
        units: {
          prodcategories: "",
          appliancetype: "",
          brand: "",
          model: "",
          serialno: "",
          unitcondition: "",
          warrantycondition: "",
          qty: "",
          demandreplacement: "",
          priority: "",
          datepurchase: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
        },

        usage: {
          propertytype: "",
          level: "",
          location: "",
          area: "",
          wallfinish: "",
          withpowersupply: "",
          deliverydate: "",
          time: null,
          locationofinstallation: "",
          paidamoun: "",
        },
      };

      this.customer = {
        cpnumber: "",
        lastname: "",
        firstname: "",
        emailaddress: "",
        middlename: "",
        contactperson: "",
        telephoneno: "",
        houseno: "",
        street: "",
        barangay: "",
        mcity: "",
        province: "",
        locationunit: "",
        organization: "",
        attachment: [],
        specialinstruction: "",
        additionalrequest1: "",
        additionalrequest2: "",
      };
    },

    autoclear() {
      var i = this.data.units.model ? 1 : 2;
      if (i == 2) {
        this.data.units.prodcategories = "";
        this.data.units.appliancetype = "";
        this.data.units.brand = "";
        this.data.units.model = "";

        this.productListDown.brand = "";
        this.productListDown.prodcategories = "";
        this.productListDown.appliancetype = "";
      }
    },
    onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    checknumber($event) {
      if ($event.key === "Backspace") {
        // if(this.customer.cpnumber.length !== 11){

        this.customer = {
          bookby: "",
          cpnumber: this.customer.cpnumber,
          lastname: "",
          firstname: "",
          emailaddress: "",
          middlename: "",
          contactperson: "",
          telephoneno: "",
          houseno: "",
          street: "",
          barangay: "",
          mcity: "",
          province: "",
          locationunit: "",
          organization: "",
          attachment: [],
          specialinstruction: "",
          additionalrequest1: "",
          additionalrequest2: "",
        };

        // }
      }
    },
    checkrecordauto() {
      if (this.customer.cpnumber.length == 11) {
        this.checkRecExist();
      }
    },
    // clearcustomer(){

    //     this.customerList = ''
    // },
    checkAreaKey($event) {
      if (parseInt(this.sqm) < this.data.usage.area) {
        if ($event.keyCode > 48) {
          $event.preventDefault();
        }
        this.data.usage.area = 0;
      } else {
        console.log("pasok");
      }

      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    verifywall() {
      console.log(this.data.usage.wallfinish);
      if (this.data.usage.wallfinish == "NO") {
        alert(
          "NOT ADVISABLE TO INSTALL DUE TO WALL NOT YET FINISH PROCEED, DISREGARD, SAVE AS DRAFT AS A CHOICE"
        );
      }
    },

    addressV() {
      if (this.InstallationAddress == 1) {
        this.data.usage.locationofinstallation = "";
      } else {
        this.data.usage.locationofinstallation = 0;
      }
      console.log(this.data.usage.locationofinstallation);
    },
    propertyTypeController() {
      if (this.data.usage.propertytype !== "RESIDENTIAL") {
        // this.usagedetailsListDown.wallfinish = { name: 'N/A', value: 'N/A' }
        // this.usagedetailsListDown.withpowersupply = { name: 'N/A', value: 'N/A' }
        // this.usagedetailsListDown.level = { name: 'N/A', value: 'N/A' }
        // this.usagedetailsListDown.location = { name: 'N/A', value: 'N/A' }
        this.data.usage.level = "N/A";
        this.data.usage.location = "N/A";
        this.data.usage.wallfinish = "N/A";
        this.data.usage.withpowersupply = "N/A";
        this.data.usage.area = "N/A";
        this.ifcommercial = 1;
      } else {
        this.ifcommercial = 0;
        this.usagedetailsListDown = {
          propertytype: [
            {
              name: "UNIVERSITY",
              value: "UNIVERSITY",
            },
            {
              name: "RESIDENTIAL",
              value: "RESIDENTIAL",
            },
            {
              name: "COMMERCIAL",
              value: "COMMERCIAL",
            },
            {
              name: "INDUSTRIAL",
              value: "INDUSTRIAL",
            },
            {
              name: "LAND",
              value: "LAND",
            },
          ],
          level: [
            {
              name: "1st FLOOR",
              value: "1st FLOOR",
            },
            {
              name: "2nd FLOOR",
              value: "2nd FLOOR",
            },
            {
              name: "3rd FLOOR",
              value: "3rd FLOOR",
            },
            {
              name: "4th FLOOR",
              value: "4th FLOOR",
            },
            {
              name: "5th FLOOR",
              value: "5th FLOOR",
            },
            {
              name: "6th FLOOR",
              value: "6th FLOOR",
            },
            {
              name: "7th FLOOR",
              value: "7th FLOOR",
            },
            {
              name: "8th FLOOR",
              value: "8th FLOOR",
            },
            {
              name: "9th FLOOR",
              value: "9th FLOOR",
            },
            {
              name: "10th FLOOR",
              value: "10th FLOOR",
            },
          ],

          location: [
            { name: "COMFORT ROOM", value: "COMFORT ROOM" },
            { name: "ENTERTAINMENT ROOM", value: "ENTERTAINMENT ROOM" },
            { name: "DINING ROOM", value: "DINING ROOM" },
            { name: "BED ROOM", value: "BED ROOM" },
            { name: "LIVING ROOM", value: "LIVING ROOM" },
            { name: "OFFICE", value: "OFFICE" },
            { name: "KITCHEN", value: "KITCHEN" },
          ],
          wallfinish: [
            { name: "YES", value: "YES" },
            { name: "NO", value: "NO" },
          ],
          withpowersupply: [
            { name: "INDOOR", value: "INDOOR" },
            { name: "OUTDOOR", value: "OUTDOOR" },
            { name: "NONE", value: "NONE" },
          ],
        };
      }
    },
    reset() {
      this.addIden = 0;
    },
    showalert(){
      this.purchaseorderalert = true
    },
    proceed(){
      this.purchaseorderalert = false
    },
    
    
  },
};
</script>
  
  <style>
#app {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
pre {
  background: #eee;
  padding: 1rem;
  border-radius: 5px;
}
</style>