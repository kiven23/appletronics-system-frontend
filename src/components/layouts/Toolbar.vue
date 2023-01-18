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
      <v-toolbar-title> <strong>Appletronics Portal</strong>
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
          28
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

        <v-list   max-width="500">
          <v-list-item >
            <v-list three-line>
              <h1>COMING SOON</h1>
              <!-- <template v-for="(item, index) in items">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                  v-text="item.header"
                ></v-subheader>

                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                ></v-divider>

                <v-list-item
                  v-else
                  :key="item.title"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template> -->
            </v-list>



     
          </v-list-item>

         
        </v-list>

 
      </v-card>
    </v-menu>
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
      fav: true,
      menu: false,
      message: false,
      hints: true,
        items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
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
  },

 created() {
    console.log(this.$store.getters.currentUser);
    //this.$store.dispatch("fetchDatabase");
    this.$store.dispatch("app_booking_sys/Notification").then((res)=>{
      console.log(res);
    })
  },

  computed: {
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
