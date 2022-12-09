<template>
  <div>
    <v-container text-xs-center>
      <div class="center">
        <vs-dialog overflow-hidden full-screen v-model="bookingmodal">
          <template #header>
            <h4 class="not-margin">
              REQUEST-<strong>{{ activerequest.name }}</strong>
            </h4>
          </template>

          <div class="con-form">
            <v-row>
              <v-col cols="2">
                <vs-card>
                  <template #title>
                    <h3>Product Information</h3>
                  </template>

                  <template #text>
                   
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
                    <vs-input type="date" v-model="data.units.datepurchase" />
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
                    <v-btn class="ma-2" @click="add()" outlined color="indigo">
                      ADD
                    </v-btn>
                  </template>
                </vs-card>
              </v-col>
            
              <v-col cols="2">
                <vs-card>
                  <template #title>
                    <h3>Customer Information</h3>
                  </template>
                  <template #text>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      
                      placeholder="Contact Phone Number*"
                      required
                      
                    ></vs-input>
                    <v-btn class="ma-2" outlined color="indigo">
                      CHECK RECORD
                    </v-btn>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      
                      placeholder="Contact Email Address"
                      required
                      
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      
                      placeholder="Last Name"
                      required
                     
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                       
                      placeholder="First Name"
                      required
                     
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                   
                      placeholder="Middle Name"
                      required
                      
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                       
                      placeholder="Contact Person"
                      required
                     
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                    
                      placeholder="Telephone No."
                      required
                      
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                     
                      placeholder="House No."
                      required
                     
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                    
                      placeholder="Street"
                      required
                      
                    ></vs-input>
                    <vs-select
                      style="margin: 6px"
                      v-model="priority"
                      :items="priority"
                     
                      placeholder="Barangay"
                      item-text="name"
                      item-value="value"
                      required
                      
                    ></vs-select>
                    <vs-select
                      style="margin: 6px"
                      v-model="priority"
                      :items="priority"
                      
                      placeholder="Municipality/City"
                      item-text="name"
                      item-value="value"
                      required
    
                    ></vs-select>
                    <vs-select
                      style="margin: 6px"
                      v-model="priority"
                      :items="priority"
                      
                      placeholder="Province"
                      item-text="name"
                      item-value="value"
                      required
                     
                    ></vs-select>
                  </template>
                </vs-card>
              </v-col>
              <v-col cols="3">
                <vs-card>
                  <template #title>
                    <h3>>></h3>
                  </template>
                  <template #text>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      
                      placeholder="Location of Unit"
                      required
                     
                    ></vs-input>
                    <h3>Is this an organization?</h3>
                    <v-radio-group v-model="row" row>
                      <v-radio label="Yes" value="1"></v-radio>
                      <v-radio label="No" value="2"></v-radio>
                    </v-radio-group>
                    <h3>SALES INVOICE:</h3>
                    <v-file-input
                      counter
                      multiple
                      show-size
                      truncate-length="15"
                    ></v-file-input>
                    <v-textarea
                      prepend-inner-icon="mdi-comment"
                      class="mx-2"
                      label="SPECIAL INSTRUCTION"
                      rows="1"
                    ></v-textarea>
                    <h3>Any additional request?</h3>

                    <vs-checkbox
                      v-model="option"
                      value="Long ladder needed for unit located above 10ft/3m (+Php 380)"
                    >
                      Long ladder needed for unit located above 10ft/3m (+Php
                      380)
                    </vs-checkbox>
                    <vs-checkbox
                      v-model="option"
                      value="Freon re-charge may be needed (additional charges applies)"
                    >
                      Freon re-charge may be needed (additional charges applies)
                    </vs-checkbox>
                  </template>
                </vs-card>
              </v-col>
              <v-col cols="3">
                <vs-card>
                  <template #title>
                    <h3>Units</h3>
                  </template>
                  <template #text>
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
                            <td><strong>{{ item.unitid }}</strong></td>
                            <td><strong>{{ item.serialno }}</strong></td>
                            <td>
                              <v-btn icon @click="editItem(item)">
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                              <v-btn icon>
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-btn class="ma-2" outlined color="indigo">
                      REVIEW AND CHECKOUT
                    </v-btn>
                  </template>
                </vs-card>
              </v-col>
            </v-row>
          </div>
        </vs-dialog>
      </div>

      <vs-row>
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
      </vs-row>
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
              appliancetype: {required},
              brand: {required},
              model: {required},
              serialno: {required},
              unitcondition: {required},
              warrantycondition: {required},
              qty: {required},
         

             }
       }
     
  },
  data() {
    return {
      row: null,
      bookingmodal: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      activerequest: null,
      selectedIndex: '',
      units: [ ],
      data: {
        units: {
          prodcategories: '',
          appliancetype: '',
          brand: '',
          model: '',
          serialno: '',
          unitcondition: '',
          warrantycondition: '',
          qty: '',
          demandreplacement: '',
          priority: '',
          datepurchase:  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
        },
        customer:{
           name: ''
        },
     },
     productListDown: {
          prodcategories: [
                {
                  name: 'AIRCONDITION',
                  value: 'AIRCONDITION',

                },
                {
                  name: 'REFRIGERATOR',
                  value: 'REFRIGERATOR'
                },
                {
                  name: 'WASHING MACHINE',
                  value: 'WASHING MACHINE'
                },
                {
                  name: 'GAS RANGE',
                  value: 'GAS RANGE'
                },
                {
                  name: 'FREEZER',
                  value: 'FREEZER'
                },
                {
                  name: 'CHILLER',
                  value: 'CHILLER'
                },
                {
                  name: 'WATER DESPENSER',
                  value: 'WATER DESPENSER'
                },
                {
                  name: 'AIR COOLER',
                  value: 'AIR COOLER'
                },
                {
                  name: 'RANGE HOOD',
                  value: 'RANGE HOOD'
                },
                {
                  name: 'MICROWAVE OVEN',
                  value: 'MICROWAVE OVEN'
                },
                {
                  name: 'OVEN TOASTER',
                  value: 'OVEN TOASTER'
                },
                {
                  name: 'BLENDER',
                  value: 'BLENDER'
                },
                {
                  name: 'VACUUM',
                  value: 'VACUUM'
                },
                {
                  name: 'CTV',
                  value: 'CTV'
                },
                {
                  name: 'ELECTRIC FAN',
                  value: 'ELECTRIC FAN'
                },
                {
                  name: 'PRINTER',
                  value: 'BLENDER'
                },
                {
                  name: 'AUDIO/SPEAKER',
                  value: 'AUDIO/SPEAKER'
                },
          ],
          appliancetype: [],
          brand:[
            {
            name: 'LG',
            value: 'LG',
            },
            {
            name: 'CARRIER',
            value: 'CARRIER',
            },
            {
            name: 'SAMSUNG',
            value: 'SAMSUNG',
            },
            {
            name: 'HAIER',
            value: 'HAIER',
            },
            {
            name: 'SHARP',
            value: 'SHARP',
            },
            {
            name: 'EVEREST',
            value: 'EVEREST',
            },
            {
            name: 'PANASONIC',
            value: 'PANASONIC',
            },
            {
            name: 'SKYWORTH',
            value: 'SKYWORTH',
            },
            {
            name: 'GE',
            value: 'GE',
            },
            {
            name: 'MABE',
            value: 'MABE',
            },
            {
            name: 'MIDEA',
            value: 'MIDEA',
            },
            {
            name: 'ARISTON',
            value: 'ARISTON',
            },
            {
            name: 'TECHNOGAS',
            value: 'TECHNOGAS',
            },
            {
            name: 'AMERICAN MASTER',
            value: 'AMERICAN MASTER',
            },
            {
            name: 'EUROTEK',
            value: 'EUROTEK',
            },
            {
            name: 'EUREKA',
            value: 'EUREKA',
            },
            {
            name: 'XTREME',
            value: 'XTREME',
            },
            {
            name: 'FUJIDENZO',
            value: 'FUJIDENZO',
            },
            {
            name: 'WHIRLPOOL',
            value: 'WHIRLPOOL',
            },
            {
            name: 'MAYTAG',
            value: 'MAYTAG',
            },
            {
            name: 'GLEM',
            value: 'GLEM',
            },
            {
            name: 'CHANGHONG',
            value: 'CHANGHONG',
            },
            {
            name: 'CONDURA',
            value: 'CONDURA',
            }, 
        ],
        unitcondition: [
          {
            name: 'BRAND NEW',
            value: 'BRAND NEW' 
          },
          {
            name: 'REPO',
            value: 'REPO' 
          },
          {
            name: 'STOCK',
            value: 'STOCK' 
          }
           ],
        warrantycondition:[
          {
            name: 'WARRANTY',
            value: 'WARRANTY' 
          },
          {
            name: 'OUT WARRANTY',
            value: 'OUT WARRANTY' 
          }
         ],
         demandreplacement:[
          {
            name: '7 DAYS WARRANTY',
            value: '7 DAYS WARRANTY' 
          },
          {
            name: 'DEFECTIVE UPON OPENING',
            value: 'DEFECTIVE UPON OPENING' 
          }
         ],
         priority:[
          {
            name: 'HIGH',
            value: 'HIGH' 
          },
          {
            name: 'LOW',
            value: 'LOW' 
          }
         ],

     }
    };
  },
  created() {
    this.$store.dispatch("fetchDBAll");
  },
  computed: {
    ...mapGetters({
      databaseData: "getDBLIST",
    }),
 
    appliancetypeError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.appliancetype.$dirty) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.appliancetype.required &&
        errors.push(RequiredError);
      return errors;
    },
    brandError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.brand.$dirty) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.brand.required &&
        errors.push(RequiredError);
      return errors;
    },
    modelError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.model.$dirty) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.model.required &&
        errors.push(RequiredError);
      return errors;
    },
    qtyError(){
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.qty) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.qty.required &&
        errors.push(RequiredError);
      return errors;
    },
    unitconditionError() {
      const errors = [];
      var RequiredError = null;
      if (!this.$v.data.units.unitcondition) return errors;
      RequiredError = "This field is required.";
      !this.$v.data.units.unitcondition.required &&
        errors.push(RequiredError);
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
  
    
     
  },
  methods: {
    getindex: function () {
         const AIRCONDITION = 
          [ {
              name: 'SPLIT TYPE',
              value: 'SPLIT TYPE'
              },
              {
              name: 'WINDOW TYPE',
              value: 'WINDOW TYPE'
              },
              {
              name: 'FLOOR MOUNTED',
              value: 'FLOOR MOUNTED'
              },
              {
              name: 'CEILING CASSETTE',
              value: 'CEILING CASSETTE'
              },
              {
              name: 'CEILING MOUNTED',
              value: 'CEILING MOUNTED'
              },
              {
              name: 'PORTABLE TYPE',
              value: 'PORTABLE TYPE'
              },
              {
              name: 'VRF TYPE',
              value: 'VRF TYPE'
              },
              {
              name: 'MULTI-SPLIT TYPE',
              value: 'MULTI-SPLIT TYPE'
              },
           ];
          const REFREGERATOR = [
            {
              name: 'SIDE BY SIDE',
              value: 'SIDE BY SIDE'
            },
            {
              name: 'TWO DOOR',
              value: 'TWO DOOR'
            },
            {
              name: 'SINGLE DOOR',
              value: 'SINGLE DOOR'
            },
          ];
          const EMPTY = [ {
              name: 'N/A',
              value: 'N/A'
            },];
  
        const APPLIANCETYPE = this.data.units.prodcategories; 
        if(APPLIANCETYPE == 'REFRIGERATOR'){
          this.productListDown.appliancetype = REFREGERATOR;
        }
        else if(APPLIANCETYPE == 'AIRCONDITION'){
          this.productListDown.appliancetype = AIRCONDITION;
        }else{
          this.productListDown.appliancetype = EMPTY
        }

       },
    add(){
      this.$v.$touch()
      if (!this.$v.$error){
        const add =  
          {
             
            unitid: 'UNIT-'+this.data.units.brand+'-'+Math.ceil(Math.random()*1000000),
            prodcategories: this.data.units.prodcategories,
            appliancetype: this.data.units.appliancetype,
            brand: this.data.units.brand,
            model: this.data.units.model,
            serialno: this.data.units.serialno,
            unitcondition: this.data.units.unitcondition,
            warrantycondition: this.data.units.warrantycondition,
            qty: this.data.units.warrantycondition,
            demandreplacement: this.data.units.demandreplacement,
            priority: this.data.units.priority,
            datepurchase: this.data.units.datepurchase
           }
         ;
        this.units.push(add)
      } 
          
    },
    editItem(items){
      console.log(items)
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
          datepurchase: items.datepurchase
        }
      
     }
    },
    request(data) {
      this.bookingmodal = true;
      this.activerequest = data;
    },
    submit() {
      this.$v.$touch();
      let data = {
      
      };
      if (this.id) {
        this.$store.dispatch("updateDBcon", data).then((res) => {
          if (res.status == 200) {
            this.refresh();
          }
        });
      } else {
        this.$store.dispatch("createDBcon", data).then((res) => {
          if (res.status == 200) {
            this.refresh();
          }
        });
      }
      //this.refresh();
    },
    refresh() {
      this.id = "";
      this.host = "";
      this.dbname = "";
      this.username = "";
      this.password = "";
      this.port = "1433";
      this.connection = "mssql";
      this.$store.dispatch("fetchDBAll");
    },
    edit(item) {
      this.host = item.host;
      this.dbname = item.dbname;
      this.username = item.username;
      this.password = item.password;
      this.port = item.port;
      this.connection = item.connection;
      this.id = item.id;
      this.entryname = item.entry;
    },
    create() {
      this.id = "";
      this.host = "";
      this.dbname = "";
      this.username = "";
      this.password = "";
      this.port = "1433";
      this.connection = "mssql";
    },
    trash(data) {
      const trash = {
        id: data.id,
        entryname: data.entry,
      };
      this.$store.dispatch("deleteDBcon", trash).then((res) => {
        if (res.status == 200) {
          this.refresh();
        }
      });
    },
  },
};
</script>
  
  <style>
</style>