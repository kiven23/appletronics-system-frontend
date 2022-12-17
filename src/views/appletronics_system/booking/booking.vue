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
              style="background: linear-gradient( 137deg,  rgba(0, 0, 0, 1) 9%, rgba(231, 95, 94, 0.5872549703475141) 100%
                );
              "
            >
              <v-btn icon dark @click="bookingmodal = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>
                REQUEST-<strong>{{  activerequest.name }}</strong
              ></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items> </v-toolbar-items>
            </v-toolbar>

            <v-list three-line subheader>
              <v-list-item>
                <v-list-item-content>
                  <v-row no-gutters>
                    <v-col cols="12" sm="2">
                      <v-card class="pa-3" height="700"> 
                        <h4>PRODUCT INFORMATION</h4>
                        <v-select
                          style="margin: 6px"
                          v-model="data.units.prodcategories"
                          :items="productListDown.prodcategories"
                          :error-messages="prodcategoriesError"
                          placeholder="Product Categories"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                          @change="getindex()"
                        ></v-select>

                        <v-select
                          style="margin: 6px"
                          v-model="data.units.appliancetype"
                          :items="productListDown.appliancetype"
                          :error-messages="appliancetypeError"
                          placeholder="Appliance Type*"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>
                        <v-select
                          style="margin: 6px"
                          v-model="data.units.brand"
                          :items="productListDown.brand"
                          :error-messages="brandError"
                          placeholder="Brand*"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>
                        <v-text-field
                          style="margin: 6px"
                          v-model="data.units.model"
                          :error-messages="modelError"
                          placeholder="Model*"
                          required
                          dense
                        ></v-text-field>

                        <vs-input
                          style="margin: 6px"
                          v-model="data.units.serialno"
                          placeholder="Serial No."
                          required
                          dense
                        ></vs-input>
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
                        ></v-select>

                        <v-select
                          style="margin: 6px"
                          v-model="data.units.warrantycondition"
                          :items="productListDown.warrantycondition"
                          :error-messages="warrantyconditionError"
                          placeholder="Warranty Condition*"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>
                        <h4 style="margin: 5px">Date of Purchase</h4>
                        <vs-input
                          type="date"
                          v-model="data.units.datepurchase"
                        />
                        <v-text-field
                          style="margin: 6px"
                          v-model="data.units.qty"
                          placeholder="QTY"
                          :error-messages="qtyError"
                          required
                        ></v-text-field>
                        <v-select
                          style="margin: 6px"
                          v-model="data.units.demandreplacement"
                          :items="productListDown.demandreplacement"
                          placeholder="Demand Replacement"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>
                        <v-select
                          style="margin: 6px"
                          v-model="data.units.priority"
                          :items="productListDown.priority"
                          placeholder="Priority"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>
                        <v-btn
                          class="ma-2"
                          @click="add()"
                          outlined
                          color="indigo"
                          :disabled="UnitsALLError"
                        >
                          ADD
                        </v-btn>
                        <v-btn @click="gen()" outlined color="indigo">
                          TESTDATA
                        </v-btn>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="3" v-if="reqIdentifier == 4">
                      <v-card class="pa-3" height="700">
                        <h4>>></h4>
                        <v-select
                          style="margin: 6px"
                          v-model="data.usage.propertytype"
                          :items="usagedetailsListDown.propertytype"
                          :error-messages="propertytypeError"
                          placeholder="Property Type*"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>

                        <v-select
                          style="margin: 6px"
                          v-model="data.usage.level"
                          :items="usagedetailsListDown.level"
                          placeholder="Level"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>
                        <v-select
                          style="margin: 6px"
                          v-model="data.usage.location"
                          :items="usagedetailsListDown.location"
                          placeholder="Location"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>
                        <v-text-field
                          style="margin: 6px"
                          v-model="data.usage.area"
                          prefix="sqm"
                          placeholder="Area"
                          required
                          dense
                        ></v-text-field>
                        <v-select
                          style="margin: 6px"
                          v-model="data.usage.wallfinish"
                          :items="usagedetailsListDown.wallfinish"
                          :error-messages="wallfinishError"
                          placeholder="Wall Finish*"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>
                        <v-select
                          style="margin: 6px"
                          v-model="data.usage.withpowersupply"
                          :items="usagedetailsListDown.withpowersupply"
                          :error-messages="withpowersupplyError"
                          placeholder="With Power Supply*"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>
                        <h4 style="margin: 5px">Date of Delivery</h4>
                        <vs-input
                          type="date"
                          v-model="data.usage.deliverydate"
                        />
                        <v-dialog
                          ref="dialog"
                          v-model="modal2"
                          :return-value.sync="data.usage.time"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="data.usage.time"
                              label="Picker in dialog"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="modal2"
                            v-model="data.usage.time"
                            full-width
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal2 = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(data.usage.time)"
                            >
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
                        <vs-input
                          style="margin: 6px"
                          v-model="data.usage.locationofinstallation"
                          placeholder="Location of Installation"
                          required
                          dense
                        ></vs-input>
                        <v-text-field
                          style="margin: 6px"
                          prefix="PHP"
                          v-model="data.usage.paidamoun"
                          placeholder="Amount Paid"
                          required
                          dense
                        ></v-text-field>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <v-card class="pa-3" height="700">
                        <h4>CUSTOMER INFORMATION</h4>
                        <v-text-field
                          v-model="customer.cpnumber"
                          :error-messages="cpnumberError"
                          placeholder="Contact Phone Number*"
                          prefix="+63"
                          dense
                          required
                        ></v-text-field>
                        <v-btn
                          class="ma-2"
                          outlined
                          color="indigo"
                          @click="checkRecExist()"
                        >
                          CHECK RECORD
                        </v-btn>
                        <vs-input
                          v-model="customer.emailaddress"
                          placeholder="Email Address (OPTIONAL)"
                          required
                          dense
                        ></vs-input>
                        <v-text-field
                          v-model="customer.lastname"
                          placeholder="Last Name"
                          :error-messages="lastnameError"
                          required
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="customer.firstname"
                          :error-messages="firstnameError"
                          placeholder="First Name"
                          required
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="customer.middlename"
                          placeholder="Middle Name"
                          :error-messages="middlenameError"
                          required
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="customer.contactperson"
                          placeholder="Contact Person"
                          :error-messages="contactpersonError"
                          required
                          dense
                        ></v-text-field>
                        <vs-input
                          v-model="customer.telephoneno"
                          placeholder="Telephone No. (OPTIONAL)"
                          required
                          dense
                        ></vs-input>
                        <v-text-field
                          v-model="customer.houseno"
                          placeholder="House No."
                          :error-messages="housenoError"
                          required
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="customer.street"
                          :error-messages="streetError"
                          placeholder="Street"
                          required
                          dense
                        ></v-text-field>
                        <v-select
                          v-model="customer.barangay"
                          :items="addressesListDown.barangay"
                          :error-messages="barangayError"
                          placeholder="Barangay"
                          item-text="name"
                          item-value="value"
                          required
                          dense
                        ></v-select>
                        <v-select
                          v-model="customer.mcity"
                          :items="addressesListDown.mcity"
                          :error-messages="mcityError"
                          dense
                          placeholder="Municipality/City"
                          item-text="name"
                          item-value="value"
                          required
                        ></v-select>
                        <v-select
                          v-model="customer.province"
                          :items="addressesListDown.province"
                          :error-messages="provinceError"
                          dense
                          placeholder="Province"
                          item-text="name"
                          item-value="value"
                          required
                        ></v-select>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <v-card class="pa-3" height="700">
                        <h4>>></h4>
                        <vs-input
                          v-model="customer.locationunit"
                          placeholder="Location of Unit"
                          required
                        ></vs-input>
                        <h3>Is this an organization?</h3>
                        <v-radio-group v-model="customer.organization" row>
                          <v-radio label="Yes" value="1"></v-radio>
                          <v-radio label="No" value="2"></v-radio>
                        </v-radio-group>
                        <h3>SALES INVOICE:</h3>
                        <v-file-input
                          counter
                          multiple
                          show-size
                          truncate-length="15"
                          v-model="customer.attachment"
                        ></v-file-input>
                        <v-textarea
                          prepend-inner-icon="mdi-comment"
                          class="mx-2"
                          label="SPECIAL INSTRUCTION"
                          rows="1"
                          v-model="customer.specialinstruction"
                        ></v-textarea>
                        <h3>Any additional request?</h3>

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
                        </vs-checkbox>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-card class="pa-4" >
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
                                  <v-btn icon @click="editItem(item)">
                                    <v-icon>mdi-content-paste </v-icon>/<v-icon
                                      >mdi-eye
                                    </v-icon>
                                  </v-btn>
                                  <v-btn icon @click="trashUnits(item)">
                                    <v-icon>mdi-delete</v-icon>
                                  </v-btn>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                        <v-btn
                          class="ma-2"
                          outlined
                          color="indigo"
                          @click="checkout()"
                          :disabled="CustomerALLError"
                        >
                          REVIEW AND CHECKOUT
                        </v-btn>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>

          <v-dialog
              v-model="checkrecords"
              width="500"
            >
 
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
                    <vs-button
                      transparent
                      @click="selectedCustomer(item)"
                    >
                     {{item.cpnumber}}
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
                        <strong>Property Type</strong>
                        <br />
                        N/A
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <strong>Address Details</strong>
                        <br />{{
                          customer.houseno +
                          " " +
                          customer.street +
                          " " +
                          customer.barangay +
                          " " +
                          customer.mcity +
                          " " +
                          customer.province
                        }}
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <strong>Request Type</strong>
                        <br />{{ requestType }}
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <strong>Dealer Name</strong>
                        <br />ADDESSA
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <strong>Special Instruction</strong>
                        <br />{{ customer.specialinstruction }}
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
                  <small>#ref03948300</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="confirmdialog = false"
                  >
                    BACK
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="submit()">
                    SUBMIT SERVICE REQUEST
                  </v-btn>
                </v-card-actions>
              </v-card>


     <v-dialog
      v-model="RefDialog"
      persistent
      max-width="400"
    >
   
      <v-card>
        <v-card-title class="text-h5">
          {{msg.data.iden == 0? 'Request successfully submitted':'File Exist Please RE Book Again' }}
        </v-card-title>
        <v-card-text>  {{msg.data.iden == 0? 'Your Request ID is:'+msg.data.ref:'' }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="RefDialog = false ||rebook()"
          >
            Rebook Same Client
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="RefDialog = false"
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
      <v-col
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
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
        >
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
      <v-col
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
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
        >
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
        </v-card>
      </v-col>
    </v-row>
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
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  mixins: [validationMixin],
  validations: {
    data: {
      units: {
        appliancetype: { required },
        brand: { required },
        model: { required },
        serialno: { required },
        unitcondition: { required },
        warrantycondition: { required },
        qty: { required },
      },

      usage: {
        propertytype: { required },
        wallfinish: { required },
        withpowersupply: { required },
      },
    },
    customer: {
      cpnumber: { required },
      lastname: { required },
      firstname: { required },
      middlename: { required },
      contactperson: { required },
      houseno: { required },
      street: { required },
      barangay: { required },
      mcity: { required },
      province: { required },
    },
  },
  data() {
    return {
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
      modal2: false,
      activerequest: {name: ''},
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
      },
      data: {
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
      },
      usagedetailsListDown: {
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
            name: "1 FLOOR",
            value: "1 FLOOR",
          },
          {
            name: "2 FLOOR",
            value: "2 FLOOR",
          },
          {
            name: "3 FLOOR",
            value: "3 FLOOR",
          },
          {
            name: "4 FLOOR",
            value: "4 FLOOR",
          },
          {
            name: "5 FLOOR",
            value: "5 FLOOR",
          },
          {
            name: "6 FLOOR",
            value: "6 FLOOR",
          },
          {
            name: "7 FLOOR",
            value: "7 FLOOR",
          },
          {
            name: "8 FLOOR",
            value: "8 FLOOR",
          },
          {
            name: "9 FLOOR",
            value: "9 FLOOR",
          },
          {
            name: "10 FLOOR",
            value: "10 FLOOR",
          },
        ],

        location: [
          { name: "OFFICE", value: "OFFICE" },
          { name: "HOME", value: "HOME" },
        ],
        wallfinish: [
          { name: "YES", value: "YES" },
          { name: "NO", value: "NO" },
        ],
        withpowersupply: [
          { name: "YES", value: "YES" },
          { name: "NO", value: "NO" },
        ],
      },
      addressesListDown: {
        barangay: [
          {
            name: "Domanpot",
            value: "Domanpot",
          },
          {
            name: "Macalong",
            value: "Macalong",
          },
          {
            name: "Baro",
            value: "Baro",
          },
        ],
        mcity: [
          {
            name: "Asingan",
            value: "Asingan",
          },
        ],
        province: [
          {
            name: "Pangasinan",
            value: "Pangasinan",
          },
        ],
      },
      productListDown: {
        prodcategories: [
          {
            name: "AIRCONDITION",
            value: "AIRCONDITION",
          },
          {
            name: "REFRIGERATOR",
            value: "REFRIGERATOR",
          },
          {
            name: "WASHING MACHINE",
            value: "WASHING MACHINE",
          },
          {
            name: "GAS RANGE",
            value: "GAS RANGE",
          },
          {
            name: "FREEZER",
            value: "FREEZER",
          },
          {
            name: "CHILLER",
            value: "CHILLER",
          },
          {
            name: "WATER DESPENSER",
            value: "WATER DESPENSER",
          },
          {
            name: "AIR COOLER",
            value: "AIR COOLER",
          },
          {
            name: "RANGE HOOD",
            value: "RANGE HOOD",
          },
          {
            name: "MICROWAVE OVEN",
            value: "MICROWAVE OVEN",
          },
          {
            name: "OVEN TOASTER",
            value: "OVEN TOASTER",
          },
          {
            name: "BLENDER",
            value: "BLENDER",
          },
          {
            name: "VACUUM",
            value: "VACUUM",
          },
          {
            name: "CTV",
            value: "CTV",
          },
          {
            name: "ELECTRIC FAN",
            value: "ELECTRIC FAN",
          },
          {
            name: "PRINTER",
            value: "BLENDER",
          },
          {
            name: "AUDIO/SPEAKER",
            value: "AUDIO/SPEAKER",
          },
        ],
        appliancetype: [],
        brand: [
          {
            name: "LG",
            value: "LG",
          },
          {
            name: "CARRIER",
            value: "CARRIER",
          },
          {
            name: "SAMSUNG",
            value: "SAMSUNG",
          },
          {
            name: "HAIER",
            value: "HAIER",
          },
          {
            name: "SHARP",
            value: "SHARP",
          },
          {
            name: "EVEREST",
            value: "EVEREST",
          },
          {
            name: "PANASONIC",
            value: "PANASONIC",
          },
          {
            name: "SKYWORTH",
            value: "SKYWORTH",
          },
          {
            name: "GE",
            value: "GE",
          },
          {
            name: "MABE",
            value: "MABE",
          },
          {
            name: "MIDEA",
            value: "MIDEA",
          },
          {
            name: "ARISTON",
            value: "ARISTON",
          },
          {
            name: "TECHNOGAS",
            value: "TECHNOGAS",
          },
          {
            name: "AMERICAN MASTER",
            value: "AMERICAN MASTER",
          },
          {
            name: "EUROTEK",
            value: "EUROTEK",
          },
          {
            name: "EUREKA",
            value: "EUREKA",
          },
          {
            name: "XTREME",
            value: "XTREME",
          },
          {
            name: "FUJIDENZO",
            value: "FUJIDENZO",
          },
          {
            name: "WHIRLPOOL",
            value: "WHIRLPOOL",
          },
          {
            name: "MAYTAG",
            value: "MAYTAG",
          },
          {
            name: "GLEM",
            value: "GLEM",
          },
          {
            name: "CHANGHONG",
            value: "CHANGHONG",
          },
          {
            name: "CONDURA",
            value: "CONDURA",
          },
        ],
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
        ],
        priority: [
          {
            name: "HIGH",
            value: "HIGH",
          },
          {
            name: "LOW",
            value: "LOW",
          },
        ],
      },
    };
  },
  created() {
    this.$store.dispatch("fetchDBAll");
  },
  computed: {
    ...mapGetters({
      databaseData: "getDBLIST",
    }),

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
    unitconditionError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.unitcondition) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.unitcondition.required && errors.push(RequiredError);
      return errors;
    },
    warrantyconditionError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.warrantycondition) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.warrantycondition.required &&
        errors.push(RequiredError);
      return errors;
    },
    //->CONTACT INFO VALIDATE
    cpnumberError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.customer.cpnumber) return errors;
      RequiredError = "This field is required.";
      !this.$v.customer.cpnumber.required && errors.push(RequiredError);
      return errors;
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
      this.$v.data.units.$touch();
      if (!this.$v.data.units.$error) {
        return false;
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
        this.productListDown.appliancetype = REFREGERATOR;
      } else if (APPLIANCETYPE == "AIRCONDITION") {
        this.productListDown.appliancetype = AIRCONDITION;
      } else {
        this.productListDown.appliancetype = EMPTY;
      }
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
        this.$v.data.units.$touch();
        this.$v.data.usage.$touch();
        if (!this.$v.data.units.$error && !this.$v.data.usage.$error) {
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

            //usage
            propertytype: this.data.usage.propertytype,
            level: this.data.usage.level,
            location: this.data.usage.location,
            area: this.data.usage.area,
            wallfinish: this.data.usage.propertytype,
            withpowersupply: this.data.usage.wallfinish,
            deliverydate: this.data.usage.deliverydate,
            time: this.data.usage.time,
            locationofinstallation: this.data.usage.locationofinstallation,
            paidamoun: this.data.usage.paidamoun,
          };
          this.units.push(add);
          this.storeDataFinal.push(add);
        }
      } else {
        this.$v.data.units.$touch();
        if (!this.$v.data.units.$error) {
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
          };
          this.units.push(add);
          this.storeDataFinal.push(add);
        }
      }
    },
    editItem(items) {
      console.log(items);
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
        },
        usage: {
          propertytype: items.propertytype,
          level: items.level,
          location: items.location,
          area: items.area,
          wallfinish: items.propertytype,
          withpowersupply: items.wallfinish,
          deliverydate: items.deliverydate,
          time: items.time,
          locationofinstallation: items.locationofinstallation,
          paidamoun: items.paidamoun,
        },
      };
    },
    trashUnits(item) {
      this.units.splice(this.units.indexOf(item), 1);
      this.storeDataFinal.splice(this.storeDataFinal.indexOf(item), 1);
    },
    checkout() {
      this.$v.customer.$touch();
      if (!this.$v.customer.$error) {
        this.confirmdialog = true;
      }
    },
    rebook() {
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
      this.requestType =
        "REF-" + data.name + "-" + Math.ceil(Math.random() * 1000000);
    },
    submit() {
      const d = {
        requestid: this.requestType,
        requestType: this.activerequest.name,
        customer: this.customer,
        units: this.storeDataFinal,
      };
      //SAVE TO DB
      this.$store.dispatch("app_booking_sys/storeBooking", d).then((res) => {
        this.msg = res;
        this.RefDialog = true;
      });
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
          this.customerList = res.data;
          this.checkrecords = true;
        });
    },
    selectedCustomer(data) {
      this.customer = {
        cpnumber: data.cpnumber,
        lastname: data.firstname,
        firstname: data.lastname,
        emailaddress: data.emailaddress,
        middlename: data.middlename,
        contactperson: data.contactperson,
        telephoneno: data.telephoneno,
        houseno: data.houseno,
        street: data.street,
        barangay: data.barangay,
        mcity: data.mcity,
        province: data.province,
      };
    },
  },
};
</script>
  
  <style>
</style>