<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap class="mt-16">
        <v-flex xs12  >
          <v-row  >
            <v-col cols="12" sm="2">
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
                
               
              >
                <v-icon style="margin-right: 5px; color: red"
                  >mdi-email-alert</v-icon
                >
                <strong
                  >Unassigned

                  <h2>{{ jobsCounts.unsigned }}</h2></strong
                >
              </v-card>
              </v-skeleton-loader>
            </v-col>
            <v-col cols="12" sm="2">
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
               
                
              >
                <v-icon style="margin-right: 5px; color: yellowgreen"
                  >mdi-account-check</v-icon
                >
                <strong
                  >Hold
                  <h2>{{ jobsCounts.hold }}</h2></strong
                >
              </v-card>
              </v-skeleton-loader>
            </v-col>
            <v-col cols="12" sm="2">
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
               
                
              >
                <v-icon style="margin-right: 5px; color: yellowgreen"
                  >mdi-account-check</v-icon
                >
                <strong
                  >Pending
                  <h2>{{ jobsCounts.accepted }}</h2></strong
                >
              </v-card>
              </v-skeleton-loader>
            </v-col>
            <v-col cols="12" sm="2">
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
                 
             
              >
                <v-icon style="margin-right: 5px; color: blue"
                  >mdi-teamviewer</v-icon
                >
                <strong
                  >Dispatch to Other ASC
                  <h2>{{ jobsCounts.asc }}</h2></strong
                >
              </v-card>
              </v-skeleton-loader>
            </v-col>
            <v-col cols="12" sm="2">
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
                 
             
              >
                <v-icon style="margin-right: 5px; color: green"
                  >mdi-account-check</v-icon
                >
                <strong
                  >Completed
                  <h2>{{ jobsCounts.completed }}</h2></strong
                >
              </v-card>
              </v-skeleton-loader>
            </v-col>
                     <v-col cols="12" sm="2">
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
                 
             
              >
                <v-icon style="margin-right: 5px; color: red"
                  >mdi-account-off</v-icon
                >
                <strong
                  >Rejected
                  <h2>{{ jobsCounts.rejected }}</h2></strong
                >
              </v-card>
            </v-skeleton-loader>
            </v-col>

            <!-- CALENDAR -->
            <v-col >
 <v-skeleton-loader
      class="mx-auto"
       type="table-heading, list-item-two-line, image, table-tfoot"
      :loading="loadingForTable"
    >
 <v-sheet height="50">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-2"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
                
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="500" >
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          :interval-height="60"
        >
          <template v-slot:event="{ event }">
           {{event.name}}
          </template>
        
        </v-calendar>
       
  <v-menu
  v-model="selectedOpen"
  :close-on-content-click="false"
  :activator="selectedElement"
  offset-x
   
>
  <v-card
    color="grey lighten-4"
    min-width="350px"
    flat
  >
    <v-toolbar
      :color="selectedEvent.color"
      dark
    >
      <v-toolbar-title>{{new Date(selectedEvent.start).toLocaleDateString('en-CA',{ hour: 'numeric' })}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
        
      <div v-if="selectedEvent.events && selectedEvent.events.length"  style="max-height: 600px; width:500px; "
       class="overflow-y-auto">
       
 
        <v-list>
             <div   v-for="event in selectedEvent.events" :key="event.id">
                   <template v-if="new Date(event.start).toLocaleDateString('en-CA', { hour: 'numeric' }) === new Date(selectedEvent.start).toLocaleDateString('en-CA', { hour: 'numeric' })">
                     <v-subheader>
                        {{event.name}}
                     </v-subheader>
                   
                    <v-list-item>
                          
                      <v-list-item-content>
                        <strong>
                       SCHEDULE: <span style="color:red">{{event.start}}</span>
                     </strong>
                              <strong>CALLID:</strong> <span v-html="event.details.callid"></span><br> 
                              <strong>ADDRESS:</strong> <span v-html="event.details.customer.barangay+','+event.details.customer.mcity+','+event.details.customer.province"></span><br> 
                              <strong>TELEPHONE:</strong> <span v-html="event.details.customer.telephoneno"></span><br> 
                              <strong>CONTACT PERSON:</strong> <span v-html="event.details.customer.contactperson"></span><br> 
                              <strong>CP NUMBER:</strong> <span v-html="event.details.customer.cpnumber"></span><br> 
                              <strong>EMAIL:</strong> <span v-html="event.details.customer.emailaddress"></span><br>  
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider>
                    </v-divider>
                  </template>
             </div>
           
        </v-list>


      </div>
   
    </v-card-text>
  </v-card>
</v-menu>
  
      </v-sheet>
 </v-skeleton-loader>

                
            </v-col>
            <!-- END CALENDAR -->
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobsCounts: "",
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: { name:'',color: '',details: {
        callid: '',
        customer: {
          barangay: '',
          mcity:'',
          province: '',
          telephoneno: '',
          contactperson: '',
          cpnumber: '',
          emailaddress: ''

        }
      } },
      selectedElement: null,
      selectedOpen: false,
      events: [],
      loadingForCount: true,
      loadingForTable: false
    };
  },
 
  mounted() {
    // JobsSchedule
    this.$refs.calendar.checkChange()
    this.$store.dispatch("app_booking_sys/JobsCount").then((res) => {
       
      this.jobsCounts = res.data;
      this.loadingForCount = false
    });
     this.loadingForTable = true
     this.$store.dispatch("app_booking_sys/JobsSchedule").then((res) => {
       
      this.events = res.data;
      this.loadingForTable = false
      
    });
  },
  methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {

    // Filter events with the same time as the clicked event
    const filteredEvents = this.events.filter(e => e.time === event.time)
    // Set the filtered events as the selected event
    this.selectedEvent = { ...event, events: filteredEvents }
    // Set the selected element as the clicked event element
    this.selectedElement = event.target
    // Open the menu
    this.selectedOpen = true





      },
      
    
    },
};
</script>
