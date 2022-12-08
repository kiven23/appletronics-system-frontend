<template>
  <div>
    <v-container text-xs-center>
      <div class="center">
       
        <vs-dialog overflow-hidden full-screen v-model="bookingmodal">
          <template #header>
            <h4 class="not-margin">REQUEST-<strong>{{activerequest.name}}</strong></h4>
          </template>

          <div class="con-form">
            <v-row>
              <v-col cols="2">
                <vs-card>
                  <template #title>
                    <h3>Product Information</h3>
                  </template>

                  <template #text>
                    <vs-select
                      style="margin: 6px"
                      v-model="prodcategories"
                      :items="prodcategories"
                      :error-messages="prodcategoriesError"
                      placeholder="Product Categories"
                      item-text="name"
                      item-value="value"
                      required
                      @change="$v.prodcategories.$touch()"
                      @blur="$v.prodcategories.$touch()"
                    ></vs-select>
                    <vs-select
                      style="margin: 6px"
                      v-model="appliancetype"
                      :items="appliancetype"
                      :error-messages="appliancetypeErrors"
                      placeholder="Appliance Type*"
                      item-text="name"
                      item-value="value"
                      required
                      @change="$v.appliancetype.$touch()"
                      @blur="$v.appliancetype.$touch()"
                    ></vs-select>
                    <vs-select
                      style="margin: 6px"
                      v-model="brand"
                      :items="brand"
                      :error-messages="brandErrors"
                      placeholder="Brand*"
                      item-text="name"
                      item-value="value"
                      required
                      @change="$v.brand.$touch()"
                      @blur="$v.brand.$touch()"
                    ></vs-select>
                    <vs-select
                      style="margin: 6px"
                      v-model="model"
                      :items="model"
                      :error-messages="modelErrors"
                      placeholder="Model*"
                      item-text="name"
                      item-value="value"
                      required
                      @change="$v.model.$touch()"
                      @blur="$v.model.$touch()"
                    ></vs-select>

                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      :error-messages="serialnoErrors"
                      placeholder="Serial No."
                      required
                      @input="$v.serialno.$touch()"
                      @blur="$v.serialno.$touch()"
                    ></vs-input>
                    <vs-select
                      style="margin: 6px"
                      v-model="unitcondition"
                      :items="unitcondition"
                      :error-messages="unitconditionErrors"
                      placeholder="Unit Condition*"
                      item-text="name"
                      item-value="value"
                      required
                      @change="$v.unitcondition.$touch()"
                      @blur="$v.unitcondition.$touch()"
                    ></vs-select>

                    <vs-select
                      style="margin: 6px"
                      v-model="warrantycondition"
                      :items="warrantycondition"
                      :error-messages="warrantyconditionErrors"
                      placeholder="Warranty Condition*"
                      item-text="name"
                      item-value="value"
                      required
                      @change="$v.warrantycondition.$touch()"
                      @blur="$v.warrantycondition.$touch()"
                    ></vs-select>
                    <h4 style="margin: 5px">Date of Purchase</h4>
                    <vs-input type="date" v-model="value7" />
                    <vs-input
                      style="margin: 6px"
                      v-model="qty"
                      :error-messages="qtyErrors"
                      placeholder="QTY"
                      required
                      @input="$v.qty.$touch()"
                      @blur="$v.qty.$touch()"
                    ></vs-input>
                    <vs-select
                      style="margin: 6px"
                      v-model="demandreplacement"
                      :items="connections"
                      :error-messages="demandreplacementErrors"
                      placeholder="Demand Replacement"
                      item-text="name"
                      item-value="value"
                      required
                      @change="$v.demandreplacement.$touch()"
                      @blur="$v.demandreplacement.$touch()"
                    ></vs-select>
                    <vs-select
                      style="margin: 6px"
                      v-model="priority"
                      :items="priority"
                      :error-messages="priorityErrors"
                      placeholder="Priority"
                      item-text="name"
                      item-value="value"
                      required
                      @change="$v.priority.$touch()"
                      @blur="$v.priority.$touch()"
                    ></vs-select>
                    <v-btn class="ma-2" outlined color="indigo">
                      ADD MORE UNIT
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
                      :error-messages="serialnoErrors"
                      placeholder="Contact Phone Number*"
                      required
                      @input="$v.serialno.$touch()"
                      @blur="$v.serialno.$touch()"
                    ></vs-input>
                    <v-btn class="ma-2" outlined color="indigo">
                      CHECK RECORD
                    </v-btn>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      :error-messages="serialnoErrors"
                      placeholder="Contact Email Address"
                      required
                      @input="$v.serialno.$touch()"
                      @blur="$v.serialno.$touch()"
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      :error-messages="serialnoErrors"
                      placeholder="Last Name"
                      required
                      @input="$v.serialno.$touch()"
                      @blur="$v.serialno.$touch()"
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      :error-messages="serialnoErrors"
                      placeholder="First Name"
                      required
                      @input="$v.serialno.$touch()"
                      @blur="$v.serialno.$touch()"
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      :error-messages="serialnoErrors"
                      placeholder="Middle Name"
                      required
                      @input="$v.serialno.$touch()"
                      @blur="$v.serialno.$touch()"
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      :error-messages="serialnoErrors"
                      placeholder="Contact Person"
                      required
                      @input="$v.serialno.$touch()"
                      @blur="$v.serialno.$touch()"
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      :error-messages="serialnoErrors"
                      placeholder="Telephone No."
                      required
                      @input="$v.serialno.$touch()"
                      @blur="$v.serialno.$touch()"
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      :error-messages="serialnoErrors"
                      placeholder="House No."
                      required
                      @input="$v.serialno.$touch()"
                      @blur="$v.serialno.$touch()"
                    ></vs-input>
                    <vs-input
                      style="margin: 6px"
                      v-model="serialno"
                      :error-messages="serialnoErrors"
                      placeholder="Street"
                      required
                      @input="$v.serialno.$touch()"
                      @blur="$v.serialno.$touch()"
                    ></vs-input>
                    <vs-select
                      style="margin: 6px"
                      v-model="priority"
                      :items="priority"
                      :error-messages="priorityErrors"
                      placeholder="Barangay"
                      item-text="name"
                      item-value="value"
                      required
                      @change="$v.priority.$touch()"
                      @blur="$v.priority.$touch()"
                    ></vs-select>
                    <vs-select
                      style="margin: 6px"
                      v-model="priority"
                      :items="priority"
                      :error-messages="priorityErrors"
                      placeholder="Municipality/City"
                      item-text="name"
                      item-value="value"
                      required
                      @change="$v.priority.$touch()"
                      @blur="$v.priority.$touch()"
                    ></vs-select>
                    <vs-select
                      style="margin: 6px"
                      v-model="priority"
                      :items="priority"
                      :error-messages="priorityErrors"
                      placeholder="Province"
                      item-text="name"
                      item-value="value"
                      required
                      @change="$v.priority.$touch()"
                      @blur="$v.priority.$touch()"
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
                      :error-messages="serialnoErrors"
                      placeholder="Location of Unit"
                      required
                      @input="$v.serialno.$touch()"
                      @blur="$v.serialno.$touch()"
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
                  
                      <vs-checkbox v-model="option" value="Long ladder needed for unit located above 10ft/3m (+Php 380)"> Long ladder needed for unit located above 10ft/3m (+Php 380) </vs-checkbox>
                      <vs-checkbox v-model="option" value="Freon re-charge may be needed (additional charges applies)"> Freon re-charge may be needed (additional charges applies) </vs-checkbox>
                   
                  </template>
                </vs-card>

              </v-col>
              <v-col cols="3">
                  <vs-card>
                  <template #title>
                    <h3>Units</h3>
                  </template>
                  <template #text>
                   
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
          @click="request({name: 'REPAIR', id: 1})"
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
          @click="request({name: 'CLEANING', id: 2})"
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
          @click="request({name: 'SITE SURVEY', id: 3})"
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
          @click="request({name: 'INSTALLATION', id: 4})"
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
    host: { required },
    dbname: { required },
    username: { required },
    password: { required },
    connections: { required },
    ports: { required },
  },
  data() {
    return {
      row: null,
      bookingmodal: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      activerequest: null
  
    };
  },
  created() {
    this.$store.dispatch("fetchDBAll");
  },
  computed: {
    ...mapGetters({
      databaseData: "getDBLIST",
    }),
    // databaseData() {
    //   return this.$store.state.database_data;
    // },
    hostErrors() {
      const errors = [];
      if (!this.$v.host.$dirty) return errors;
      !this.$v.host.required && errors.push("Host is required");
      return errors;
    },
    dbnameErrors() {
      const errors = [];
      if (!this.$v.dbname.$dirty) return errors;
      !this.$v.dbname.required && errors.push("Database Name is required");
      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("UserName is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    connectionsErrors() {
      const errors = [];
      if (!this.$v.connections.$dirty) return errors;
      !this.$v.connections.required && errors.push("Connection is required");
      return errors;
    },
    portsErrors() {
      const errors = [];
      if (!this.$v.ports.$dirty) return errors;
      !this.$v.ports.required && errors.push("Port is required");
      return errors;
    },
  },
  methods: {
    request(data){
      this.bookingmodal = true;
      this.activerequest = data;
    },
    submit() {
      this.$v.$touch();
      let data = {
        host: this.host,
        dbname: this.dbname,
        username: this.username,
        password: this.password,
        connection: this.connection,
        port: this.port,
        id: this.id,
        entry: this.entryname,
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