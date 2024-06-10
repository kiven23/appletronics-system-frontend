<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-flex xs12>
        <v-row>
          <v-col cols="12" sm="12">
            <v-card class="pa-2" outlined tile>
              <strong
                >TODAY'S JOBS
                <h4>As of {{data.count.dashboard.asof}}</h4></strong
              >
              <h2>
                 
              </h2>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="2">
            <v-card class="pa-2" outlined tile>
              <v-icon style="margin-right: 5px; color: black"
                >mdi-wrench</v-icon
              >
              <strong
                >SERVICE

                <h2>{{data.count.dashboard.service}}</h2></strong
              >
            </v-card>
          </v-col>
          <v-col cols="12" sm="2">
            <v-card class="pa-2" outlined tile>
              <v-icon style="margin-right: 5px; color: black"
                >mdi mdi-account-hard-hat-outline</v-icon
              >
              <strong
                >INSTALLATION

                <h2>{{data.count.dashboard.installation}}</h2></strong
              >
            </v-card>
          </v-col>
          <v-col cols="12" sm="2">
            <v-card class="pa-2" outlined tile>
              <v-icon style="margin-right: 5px; color: black"
                >mdi mdi-home-search-outline</v-icon
              >
              <strong
                >SURVEY

                <h2>{{data.count.dashboard.survey}}</h2></strong
              >
            </v-card>
          </v-col>
          <v-col cols="12" sm="2">
            <v-card class="pa-2" outlined tile>
              <v-icon style="margin-right: 5px; color: black"
                >mdi mdi-close-box-multiple</v-icon
              >
              <strong
                >DISMANTLING
                <h2>{{data.count.dashboard.dismantling}}</h2></strong
              >
            </v-card>
          </v-col>
          <v-col cols="12" sm="2">
            <v-card
              class="pa-2"
              outlined
              tile
              
            >
              <v-icon style="margin-right: 5px; color: black"
                >mdi mdi-reload</v-icon
              >
              <strong
                >SYS REPROCESS
                <h2>0</h2></strong
              >
            </v-card>
          </v-col>
          <v-col cols="12" sm="2">
            <v-card class="pa-2" outlined tile>
              <v-icon style="margin-right: 5px; color: black"
                >mdi mdi-monitor-shimmer</v-icon
              >
              <strong
                >CLEANING
                <h2>{{data.count.dashboard.cleaning}}</h2></strong
              >
            </v-card>
          </v-col>
            <v-col cols="12" sm="6">
            
            <v-card class="pa-2"  >   <h4>PENDING JOBS</h4>
              <apexchart 
                   type="bar" 
                  :options="options" :series="series" >
              </apexchart>  
              
            </v-card>
          </v-col>
             <v-col cols="12" sm="6">
               
            <v-card class="pa-2"  > <h4>COMPLETED JOBS</h4>
               <apexchart type="pie"    :options="chartOptions" :series="piedata"></apexchart>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
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
      data: [],
        options: {
      chart: {
        id: 'vuechart-example',
       
      },  
      xaxis: {
        categories: [
         "1",
         "2",
         "3",
         "4",
         "5",
         "6",
         "7",
         "8",
         "9",
         "10",
         "11",
         "12",
         "13",
         "14",
         "15",
         "16",
         "17",
         "18",
         "19",
         "20",
         "21",
         "22",
         "23",
         "24",
         "25",
         "26",
         "27",
         "28",
         "29",
         "30"
        ]
      }
    },
    chartOptions: {
      chart: {
        type: 'pie' // Specify pie chart type
      },
      labels: ['SERVICE', 'INSTALLATION', 'SURVEY', 'DISMANTLING', 'CLEANING']
    },
    piedata: [],
    series: [{
      name: 'PENDING JOBS',
      data: [],
    }],

    };
  },

  computed: {},

  watch: {},

  mounted() {
     this.$store.dispatch("app_technician_sys/fetchMyJobs").then((res) => {
          this.data = res.data
          var barchart = res.data.count.dashboard.barchart
          var piechart = res.data.count.dashboard.piechart
          this.piedata = [piechart.service,piechart.installation,piechart.survey,piechart.dismantling,piechart.cleaning]
          this.series[0].data = barchart
    })
  },

  methods: {},
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
 