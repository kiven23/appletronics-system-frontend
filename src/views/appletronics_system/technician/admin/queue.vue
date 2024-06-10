<template>
  <div>
    <v-container grid-list-md text-xs-center>
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

      <div>
        <v-toolbar style="margin-top: -70px">
          <template v-slot:extension>
            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="black"></v-tabs-slider>
              <v-tab v-for="item in tabitem" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                
                <v-data-table
                  fixed-header
                  height="300"
                  dense
                  :headers="Transferheaders"
                  :items="transferDATA"
                  item-key="requestid"
                  class="elevation-1 headersk"
                  :search="search"
                  :items-per-page="15"
                >
                </v-data-table
              ></v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
 
                <v-data-table
                  fixed-header
                  height="300"
                  dense
                  :headers="Reschedheaders"
                  :items="rescheduleDATA"
                  item-key="requestid"
                  class="elevation-1 headersk"
                  :search="search"
                  :items-per-page="15"
                >
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-data-table
                  fixed-header
                  height="300"
                  dense
                  :headers="Escalateheaders"
                  :items="escalateDATA"
                  item-key="requestid"
                  class="elevation-1 headersk"
                  :search="search"
                  :items-per-page="15"
                >
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-data-table
                  fixed-header
                  height="300"
                  dense
                  :headers="Rejectheaders"
                  :items="rejectDATA"
                  item-key="requestid"
                  class="elevation-1 headersk"
                  :search="search"
                  :items-per-page="15"
                >
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
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
      search: '',
      transferDATA: [],
      rescheduleDATA: [],
      escalateDATA: [],
      rejectDATA: [],
      sheet4: false,
      sheet3: false,
      sheet2: false,
      sheet1: false,
      tab: null,
      tabitem: ["TRANSFER", "RESCHEDULE", "ESCALATE", "REJECT"],
      Transferheaders: [
        {
          text: "Creator_ID",
          align: "start",
          sortable: false,
          value: "creator_id",
        },
         {
          text: "Call ID",
          align: "start",
          sortable: false,
          value: "callid",
        },
         {
          text: "Transfer To",
          align: "start",
          sortable: false,
          value: "totech",
        },
         {
          text: "Transfer Reason",
          align: "start",
          sortable: false,
          value: "reason",
        },
         {
          text: "Remarks",
          align: "start",
          sortable: false,
          value: "remarks",
        },
         {
          text: "Created Date",
          align: "start",
          sortable: false,
          value: "created_at",
        },
        {
          text: "Action",
          align: "start",
          sortable: false,
          value: "action",
        },
      ],
      Reschedheaders: [
        {
          text: "Creator_ID",
          align: "start",
          sortable: false,
          value: "creator_id",
        },
         {
          text: "Call ID",
          align: "start",
          sortable: false,
          value: "callid",
        },
         {
          text: "Reschedule Reason",
          align: "start",
          sortable: false,
          value: "reason",
        },
         {
          text: "Schedule Date",
          align: "start",
          sortable: false,
          value: "scheduledate",
        },
         {
          text: "Remarks",
          align: "start",
          sortable: false,
          value: "remarks",
        },
         {
          text: "Created Date",
          align: "start",
          sortable: false,
          value: "created_at",
        },
        {
          text: "Action",
          align: "start",
          sortable: false,
          value: "action",
        },
      ],
      Escalateheaders: [
        {
          text: "Creator_ID",
          align: "start",
          sortable: false,
          value: "creator_id",
        },
         {
          text: "Call ID",
          align: "start",
          sortable: false,
          value: "callid",
        },
         {
          text: "Escalate To",
          align: "start",
          sortable: false,
          value: "escalateto",
        },
         {
          text: "Reason of Escalation",
          align: "start",
          sortable: false,
          value: "reason",
        },
         {
          text: "Remarks",
          align: "start",
          sortable: false,
          value: "remarks",
        },
         {
          text: "Created Date",
          align: "start",
          sortable: false,
          value: "created_at",
        },
        {
          text: "Action",
          align: "start",
          sortable: false,
          value: "action",
        },
      ],
      Rejectheaders: [
         {
          text: "Creator_ID",
          align: "start",
          sortable: false,
          value: "creator_id",
        },
         {
          text: "Call ID",
          align: "start",
          sortable: false,
          value: "callid",
        },
        
         {
          text: "Rejection Reason",
          align: "start",
          sortable: false,
          value: "reason",
        },
         {
          text: "Remarks",
          align: "start",
          sortable: false,
          value: "remarks",
        },
         {
          text: "Created Date",
          align: "start",
          sortable: false,
          value: "created_at",
        },
        {
          text: "Action",
          align: "start",
          sortable: false,
          value: "action",
        },
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
  },

  watch: {},

  async mounted() {
    function transferTable(data){
      var items = []
       data.forEach((item, index)=>{
      
        if(item.type == 1){
            items.push(item)
              
        }
      })
        
      return items;
    }
    function rescheduleTable(data){
      
        var items = []
       data.forEach((item, index)=>{
        if(item.type == 2){
            items.push(item)
        }
      })
      return items;
    }
    function escalateTable(data){
        var items = []
       data.forEach((item, index)=>{
        if(item.type == 3){
             items.push(item)
        }
      })
      return items;
    }
    function rejectTable(data){
        var items = []
       data.forEach((item, index)=>{
        if(item.type == 4){
             items.push(item)
        }
      })
      return items;
    }
    await this.$store.dispatch("app_technician_sys/queueDATA").then((res)=>{
        this.data = res.data
    })
    this.transferDATA = await transferTable(this.data)
    this.rescheduleDATA = await rescheduleTable(this.data)
    this.escalateDATA = await escalateTable(this.data)
    this.rejectDATA = await rejectTable(this.data)
  },

  methods: {
    refreshData(){
      alert(0)
    }
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
.toast-center {
  left: 50%;
  top: auto;
  bottom: auto;
  transform: translateX(-50%);
}
</style>
 