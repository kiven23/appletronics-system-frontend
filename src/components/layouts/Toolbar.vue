<template>
  <nav>
    <v-app-bar dark app clipped-left  style="background:  linear-gradient(137deg, rgba(0,0,0,1) 9%, rgba(231,95,94,0.5872549703475141) 100%); border-radius: 10px; color: white;">
      <!-- <v-app-bar-nav-icon @click.stop="drawer"></v-app-bar-nav-icon> -->
      <v-btn icon @click.stop="drawer">
        <v-icon>{{ toggleDrawer ? "mdi-menu" : "mdi-menu-open" }}</v-icon>
      </v-btn>
      <v-img
        src="/logo.jpg"
        max-width="40"
        max-height="40"
        style="margin: 5px"
      ></v-img>
      <v-toolbar-title> <strong>Appletronics Portal  {{counting.count}}</strong>
        <p style="font-size: 11px">Appletronics Services Inc.</p></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    
 
                  <!-- <v-select
                      style="margin-top: 15px; margin-right: 15px; width: 10px"
                      :items="connections.databases"
                      label="Select Database"
                      v-model="connections.connection"
                      item-value="id"
                      item-text="dbname"
                      dense
                      :loading="loadingStatus"
                      @change ="change()"
                      :hidden="true"
                 ></v-select> -->

      
    
      <!-- <v-tooltip-title > -->
        <strong style="text-align: center">{{currentUser.branch? '': currentUser.branch.name}}</strong>
      <!-- </v-tooltip-title> -->
<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
     
     
    >
      <template v-slot:activator="{ on, attrs }">
        <!-- <v-btn
          color="white"
          dark
          v-bind="attrs"
          v-on="on"
          icon
        >
          <strong style="color: green">7</strong>  
        </v-btn> -->

           <vs-avatar primary   v-bind="attrs"
          v-on="on">
        <v-icon >mdi-bell-ring-outline</v-icon>
        <template #badge>
          {{items.count}}
        </template>
      </vs-avatar>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
    

            <v-list-item-content>
             <strong>Notification</strong>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>mdi-email-open-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
    <v-list two-line  max-width="400">
      <v-list-item-group
        multiple
      >    <v-sheet
                id="scrolling-techniques-7"
                class="overflow-y-auto"
                max-height="400"
              >
        <template v-for="(item, index) in items.data">
          <v-list-item :key="item.categories" @click="view(item)">
            <template>
              <v-list-item-content><strong>From: {{item.name}}</strong>
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.categories"
                ></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.customername"></v-list-item-subtitle>
                Updates:<v-list-item-subtitle v-text="item.event_logs"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-text="item.created_at"></v-list-item-action-text>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-sheet>
      </v-list-item-group>
    </v-list>
      </v-card>
    </v-menu>
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
  </div>
  
</template>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="goDark">
            <v-icon>
              {{ isDark ? "mdi-brightness-4" : "mdi-brightness-7" }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ isDark ? "Go Dark" : "Go Light" }}</span>
      </v-tooltip>
   
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="logout">
            <v-icon>logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>
  </nav>
  
</template>

<script>
import { mapGetters } from 'vuex';
 
export default {
     data: () => ({
      threadsData: {data : { status: ''}},
      viewThreads: false,

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
      usersData: [],
      category: "",
      category2: "",
      note: "",
      loadings: false,
      fav: true,
      menu: false,
      message: false,
      hints: true,
          items: [  ],
    }),
  methods: {
    change(){
      const data = {'id': this.connections.connection}
      this.$store.dispatch("updateDB", data);
    },
    drawer() {
      this.$store.state.drawer = !this.$store.state.drawer;

    },

    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },

    goDark() {
 
      this.$store.state.goDark = !this.$store.state.goDark;
    },
    view(data){
      
      this.$store.dispatch("app_booking_sys/ViewNotification", data.event_id).then((res)=>{
        this.threadsData = res.data[0]
        console.log(res.data)
      })
        this.viewThreads = true
        this.$socket.emit("notification", 1);
         this.$store.dispatch("app_booking_sys/Notification").then((res)=>{
           this.items = res.data
      }) 
    },
    sendThreads(data){
      var datas = {"scalate_id": data, "thread": this.note}
      this.$store
        .dispatch("app_booking_sys/scalateSendThreadsBk", datas)
        .then((res) => {
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
  },

 created() {
    console.log(this.$store.getters.currentUser);
    //this.$store.dispatch("fetchDatabase");
    this.$store.dispatch("app_booking_sys/Notification").then((res)=>{
      this.items = res.data
    })
     this.usersData = this.$store.state.currentUser
      this.sockets.subscribe("notification", (res)=>{
           
      this.$store.dispatch("app_booking_sys/Notification").then((res)=>{
           this.items = res.data
      })
      })
     this.usersData.branch_id
  },

  computed: {
    counting(){
     
      return this.items
    },
    connections(){
     return  this.$store.state.connections;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    
    loadingStatus() {
      return this.$store.state.loading;
    },

    isDark() {
      return this.$store.state.goDark;
    },

    toggleDrawer() {
      return this.$store.state.drawer;
    },
  },
};
</script>
