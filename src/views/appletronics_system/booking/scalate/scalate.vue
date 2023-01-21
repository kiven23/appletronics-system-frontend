<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-flex xs12>
        <v-row>
          <v-col class="text-right">
            <v-btn class="ma-2" @click="create()" outlined color="indigo">
              CREATE NEW ESCALATE</v-btn
            >
           
                <v-btn class="ma-2" @click="notify()" outlined color="indigo">
              TEST</v-btn
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

                <h2>{{count.total}}</h2></strong
              >
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="pa-2" outlined tile>
              <v-icon style="margin-right: 5px; color: red">mdi-restore</v-icon>
              <strong
                >Pending
                <h2>{{count.pending}}</h2></strong
              >
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="pa-2" outlined tile>
              <v-icon style="margin-right: 5px; color: blue">mdi-wrench</v-icon>
              <strong
                >Resolved
                <h2>{{count.resolved}}</h2></strong
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
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="item.data.status == '1' ? 'orange' : 'green'"
            label
            outlined
          >
            {{ item.data.status == "1" ? "Pending" : "Resolved" }}</v-chip
          >
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn class="ma-1" outlined color="indigo" @click="itemView(item)">
            UPDATE
          </v-btn>
         
          <v-btn  class="ma-1" outlined color="green" v-if="item.data.status == 1 && checkpermission" @click="resolvedScalate(item)">
            RESOLVED
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="createEszalateDialog" max-width="500px">
        <v-card>
          <v-card-title> Create New Escalation </v-card-title>

          <v-list three-line class="pa-5"
            ><v-autocomplete
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
                  Customer <br>
                  <strong>{{threadsData.data.customername }}</strong><br>  
                  Status<br>
                 
                  <v-chip
                    :color="threadsData.data.status == '1' ? 'orange' : 'green'"
                    label
                    outlined
                    
                  >
                    {{ threadsData.data.status == "1" ? "Pending" : "Resolved" }}</v-chip
                  ><br>
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
                    <v-btn class="ma-2" v-if="threadsData.data.status == 1" @click="updateScalate(threadsData.data.id)" outlined color="indigo">
                  UPDATE</v-btn>
                       
                </v-list>
              
              </v-col>
              <v-col cols="12" sm="8" > 
                <v-btn v-if="threadsData.data.status == 2 && checkpermission" class="ma-2" @click="reopen(threadsData.data.id)" outlined color="indigo">
                   RE OPEN</v-btn>
                 <br>Escalation Date<br>
                  {{new Date(threadsData.data.created_at).toLocaleString()}}  
                  
                  <v-card-text>
                    <div class="font-weight-bold ">
                      Updates
                    </div>
                    <v-timeline
                      align-top
                      dense
                    >
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
                            <strong>{{ message.from_bys }}</strong> @{{ message.created_at }}
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
                      <v-btn class="ma-2"  v-if="threadsData.data.status == 1" @click="sendThreads(threadsData.data.id)" :disabled="note?false:true" color="grey">
                        SEND
                      </v-btn>
                      </v-col>
                    </v-list>
                     
                     
                 
</v-col>
            </v-row>
          
          <v-card-actions> </v-card-actions>
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
      permissions: '', 
      count: {total: 0, pending: 0 , resolved: 0},
      messages: [],
      threadsData: {data : { status: ''}},
      viewThreads: false,
      loadings: false,
      descriptionLimit: 60,
      entries: [],
      perm: [],
      isLoading: false,
      model: null,
      searchCustomer: null,
      createData: [],
      note: "",
      search: "",
      datas: [],
      headers: [
        { text: "DATE CREATED", value: "data.created_at" },
        { text: "CUSTOMER NAME", value: "data.customername" },
        { text: "CATEGORY", value: "data.categories" },
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
      category2: "",
    };
  },

  computed: {
    ...mapGetters({
        permissions: "userPermissions/getPermission",
    }),
    checkpermission(){
     return this.perm.includes("Approved");
    },
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
        const Description = entry.whole;
        entry.whole.length > this.descriptionLimit
          ? entry.whole.slice(0, this.descriptionLimit) + "..."
          : entry.whole;

        return Object.assign({}, entry, { Description });
      });
    },
  },

  mounted() {
    this.counting();
    this.$store.dispatch("app_booking_sys/scalateBk").then((res) => {
      this.datas = res.data;
    });
    this.$store.dispatch("userPermissions/fetchPermission").then((res)=>{
      this.perm = res.data
    });
 
  },

  methods: {
    counting(){
           this.$store.dispatch("app_booking_sys/ScalateCount").then((res) => {
      this.count = res.data;
    });
    },
    refresh() {

      this.$store.dispatch("app_booking_sys/scalateBk").then((res) => {
        this.datas = res.data;
      });
      this.counting();
    },
    create() {
      this.createEszalateDialog = true;
    },
    send() {
      var data = {
        identify: 1,
        customerdata: this.createData,
        category: this.category,
        note: this.note,
      };
      this.$store
        .dispatch("app_booking_sys/scalateCreateBk", data)
        .then((res) => {
          console.log(res.data);
          this.refresh();
        });
    },
    getData(data) {
      this.createData = data;
    },
    itemView(data) {
      this.viewThreads = true;
      this.threadsData = data;
      // this.loadings = true
      setTimeout(
        () => ((this.loadings = false), (this.viewThreads = true)),
        2000
      );
    },
    sendThreads(data){
      var datas = {"scalate_id": data, "thread": this.note}
      this.$store
        .dispatch("app_booking_sys/scalateSendThreadsBk", datas)
        .then((res) => {
          this.refresh();
          this.loadings = true
         setTimeout(
           () => (
            (
             this.loadings = false), 
             this.threadsData.threads.push(res.data[0])), 
            2000
          );
         
         this.$socket.emit("notification", 1);
        });
    },
    reopen(id){
      var data = {
          identify: 5,
          id: id,
        }
        this.$store
        .dispatch("app_booking_sys/scalateCreateBk", data)
        .then((res) => {
          this.viewThreads = false;
          //this.threadsData.data.status = 1;
          this.threadsData.threads.push(res.data[0])
          this.$socket.emit("notification", 1);
          this.refresh();
        });
    },
    updateScalate(datas){
      var data = {
        identify: 2,
        id: datas,
        category: this.category
      }
       this.$store
        .dispatch("app_booking_sys/scalateCreateBk", data)
        .then((res) => {
          // this.threadsData.data.status = 2;
          this.threadsData.threads.push(res.data[0])
          this.$socket.emit("notification", 1);
          this.refresh();
        });
    },
    resolvedScalate(datas){
        var data = {
          identify: 3,
          id: datas.data.id,
        }
        this.$store
          .dispatch("app_booking_sys/scalateCreateBk", data)
          .then((res) => {
            this.$socket.emit("notification", 1); 
            this.refresh();
          });
      },
  
  },

  watch: {
    searchCustomer(val) {
      this.isLoading = true;
      // Lazily load input items
      fetch("http://192.168.1.19:8009/api/jobs/customers/list?q=" + val)
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
