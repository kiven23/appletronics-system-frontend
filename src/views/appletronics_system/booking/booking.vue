<template>
  <div>
    <v-container text-xs-center>
      <vs-row>
       
          <vs-button
            style="
              background-color: white;
              min-width: 70px;
              color: black;
            "
            @click="dialog = true"
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
            <vs-button
            style="
              background-color: white;
              min-width: 70px;
              color: black;
            "
            @click="dialog = true"
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
            style="
              background-color: white;
              min-width: 70px;
              color: black;
            "
            @click="dialog = true"
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
       

       
            <vs-button
            style="
              background-color: white;
              min-width: 70px;
              color: black;
            "
            @click="dialog = true"
            animation-type="scale"
          >
            <v-img src="/repair.png" style="width: 100px"> </v-img
            ><strong>INSTALLATION</strong>
            <template #animate>
              <strong style="margin-left: 10px">REQUEST &#9881;</strong>
              <v-img
                src="/repair.png"
                style="width: 70px; height: 70px"
              ></v-img>
            </template>
          </vs-button>
       
      </vs-row>
    </v-container>
    <v-dialog
      v-model="dialog"
      hide-overlay
      transition="dialog-bottom-transition"
      color="black"
    >
      <v-card color="#f2e7d0">
        <v-toolbar dark color="#f2e7d0">
          <v-btn icon dark @click="dialog = false">
            <v-icon style="color: black">mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title style="color: black"
            >Database / Configure</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- <v-btn dark text @click="submit()" style="color: black">
                Save Configure
              </v-btn> -->
            <vs-button size="large" @click="submit()">
              <v-icon>mdi-content-save-all</v-icon>
            </vs-button>
            <vs-button size="large" @click="create()"> CREATE </vs-button>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-row no-gutters>
            <v-col cols="12" sm="6">
              <v-card class="pa-2" outlined tile>
                <v-subheader>DATABASE / CREATE</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <form>
                      <v-text-field
                        v-model="host"
                        :error-messages="hostErrors"
                        label="Host"
                        required
                        @input="$v.host.$touch()"
                        @blur="$v.host.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="dbname"
                        :error-messages="dbnameErrors"
                        label="Database Name"
                        required
                        @input="$v.dbname.$touch()"
                        @blur="$v.dbname.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="username"
                        :error-messages="usernameErrors"
                        label="Username"
                        required
                        @input="$v.username.$touch()"
                        @blur="$v.username.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        :error-messages="passwordErrors"
                        label="Password"
                        type="password"
                        required
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                      ></v-text-field>

                      <v-select
                        v-model="connection"
                        :items="connections"
                        :error-messages="connectionsErrors"
                        label="Connection"
                        item-text="name"
                        item-value="value"
                        required
                        @change="$v.connections.$touch()"
                        @blur="$v.connections.$touch()"
                      ></v-select>
                      <v-select
                        v-model="port"
                        :items="ports"
                        :error-messages="portsErrors"
                        label="Port"
                        item-text="name"
                        item-value="value"
                        required
                        @change="$v.ports.$touch()"
                        @blur="$v.ports.$touch()"
                      ></v-select>
                    </form>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card class="pa-2" outlined tile>
                <v-subheader>DATABASE / UPDATE </v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-data-table
                      :headers="headers"
                      :items="databaseData"
                      :items-per-page="5"
                      class="elevation-1"
                    >
                      <template v-slot:item.action="{ item }">
                        <vs-button-group>
                          <vs-button border @click="edit(item)">
                            <v-icon>mdi-grease-pencil</v-icon>
                          </vs-button>
                          <vs-button border icon @click="trash(item)">
                            <v-icon>mdi-delete</v-icon>
                          </vs-button>
                        </vs-button-group>
                      </template>
                    </v-data-table>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-list>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
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
      headers: [
        { text: "HOST", value: "host" },
        { text: "DBNAME", value: "dbname" },
        { text: "USERNAME", value: "username" },
        { text: "PASSWORD", value: "password" },
        { text: "CONNECTION", value: "connection" },
        { text: "PORT", value: "port" },
        { text: "ACTION", value: "action" },
      ],
      id: "",
      entryname: "",
      dialog: false,
      host: "",
      dbname: "",
      username: "",
      password: "",
      connections: [
        { name: "Mssql", value: "sqlsrv" },
        { name: "mysql", value: "mysql" },
        { name: " PostgreSQL", value: "pgsql" },
      ],
      ports: [
        { name: "3306", value: "3306" },
        { name: "1433", value: "1433" },
      ],
      connection: "",
      port: "",
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