<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-flex xs12>
        <v-row>
          <v-col class="text-right">
            <v-btn class="ma-2" @click="create()" outlined color="indigo">
              CREATE NEW ESCALATE</v-btn
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <v-card class="pa-2" outlined tile>
              <v-icon style="margin-right: 5px; color: yellowgreen"
                >mdi-arrow-collapse-up</v-icon
              >
              <strong
                >Total Escalations

                <h2>2</h2></strong
              >
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="pa-2" outlined tile>
              <v-icon style="margin-right: 5px; color: red">mdi-restore</v-icon>
              <strong
                >Pending
                <h2>2</h2></strong
              >
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="pa-2" outlined tile>
              <v-icon style="margin-right: 5px; color: blue">mdi-wrench</v-icon>
              <strong
                >Resolved
                <h2>1</h2></strong
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
      </v-card-title>
      <v-data-table
        dense
        :headers="headers"
        :items="datas"
        item-key="requestid"
        class="elevation-1"
        :search="search"
        :items-per-page="5"
      >
        <!-- <template v-slot:item.customer="{ item }">
          {{ item.customer.lastname }},
          {{ item.customer.firstname }}
        </template> -->
      </v-data-table>
      <v-dialog v-model="createEszalateDialog" max-width="500px">
        <v-card>
          <v-card-title> Create New Escalation </v-card-title>

          <v-list three-line
            class="pa-5"><v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="searchCustomer"
              color="white"
              hide-no-data
              hide-selected
              item-text="whole"
              item-value="whole"
              label="Customer Name"
              @change="getData(model)"
              placeholder="Start typing to Search"
              prepend-icon="mdi-account-search"
              return-object
            ></v-autocomplete>
          </v-list>
          <v-list three-line class="pa-5">
            <v-autocomplete
              v-model="category"
              label="Category"
              :items="categories"
              item-text="name"
              item-value="value"
            ></v-autocomplete>
          </v-list>
          <v-list three-line class="pa-5">
            <v-textarea
              v-model="note"
              outlined
              name="input-7-4"
              label="Note"
              value=""
            ></v-textarea>
          </v-list>
          <v-card-actions>
            <v-btn color="primary" text @click="createEszalateDialog = false">
              CLOSE
            </v-btn>
            <v-btn text @click="send()" outlined color="indigo"> SUBMIT </v-btn>
          </v-card-actions>
        </v-card>
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
  validations: {},
  data() {
    return {
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      searchCustomer: null,

      note: "",
      search: "",
      datas: [],
      headers: [
        { text: "DATE CREATED", value: "created_at" },
        { text: "CUSTOMER NAME", value: "customername" },
        { text: "CATEGORY", value: "categories" },
        { text: "STATUS", value: "status" },
        { text: "ACTION", value: "action" },
      ],
      createEszalateDialog: false,
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
    };
  },

  computed: {
    users() {
      var us = this.usersData.employment.position.id
        ? this.usersData.employment.position.id
        : "";
      return us;
    },
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    items() {
      return this.entries.map((entry) => {
        const Description = entry.whole
          entry.whole.length > this.descriptionLimit
            ? entry.whole.slice(0, this.descriptionLimit) + "..."
            : entry.whole;

        return Object.assign({}, entry, { Description });
      });
    },
  },

  mounted() {
    this.$store.dispatch("app_booking_sys/scalateBk").then((res) => {
      this.datas = res.data;
    });
  },

  methods: {
    create() {
      this.createEszalateDialog = true;
    },
    send() {
      var note = this.note;
      alert(note);
    },
    getData(data){
      console.log(data)
    }
  },

  watch: {
    searchCustomer(val) {
      
    
      this.isLoading = true;

      // Lazily load input items
      fetch("http://192.168.1.19:8009/api/jobs/customers/list?q="+val)
        .then((res) => res.json())
        .then((res) => {
           
          this.entries = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
