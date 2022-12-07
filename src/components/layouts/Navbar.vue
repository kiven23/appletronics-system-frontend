<template>
  <nav>
    <v-navigation-drawer :value="drawer" app clipped  dark>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ currentUser.first_name }}&nbsp;{{ currentUser.last_name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{
                currentUser.employment
                  ? currentUser.employment.position
                    ? currentUser.employment.position.name
                    : "None"
                  : "None"
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <span v-for="(link, index) in permissions" :key="index">
          <v-list-group
            @click="toRoute(link.route)"
            :append-icon="link.subLinks ? 'keyboard_arrow_down' : ''"
            :prepend-icon="link.icon"
          >
            <template v-slot:activator>
              <v-list-item-title
                v-text="link.text"
              ></v-list-item-title>
            </template>

            <span
              v-for="(subLink, i2) in link.subLinks"
              :key="i2"
              :to="subLink.route"
            >
              <v-list-item v-if="!subLink.links">
                <v-list-item-action></v-list-item-action>
                <v-list-item-title class="text-wrap" v-text="subLink.text"></v-list-item-title>
                <v-list-item-action>
                  <v-icon v-text="subLink.icon"></v-icon>
                </v-list-item-action>
              </v-list-item>
            </span>

            <span v-for="(subLink, i3) in link.subLinks" :key="i3">
              <v-list-group v-if="subLink.links" no-action sub-group>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title class="text-wrap"
                      v-text="subLink.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="(_subLink, i) in subLink.links"
                  :key="i"
                  router
                  :to="_subLink.route"
                  link
                >
 
                   
                 
                  <v-list-item-title  class="text-wrap" v-text="_subLink.text" ></v-list-item-title>
                  <v-list-item-action>
                    <v-icon v-text="_subLink.icon"></v-icon>
                  </v-list-item-action>  
                </v-list-item>
              </v-list-group>
            </span>
          </v-list-group>
        </span>
      </v-list>
     
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      
    };
  },

  computed: {
    ...mapGetters({
      permissions: "userPermissions/getPermissions",
    }),
    drawer() {
      return this.$store.state.drawer;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    getCurrentRoutePath(){
      return this.$route.path;
    }
  },
  created() {
    this.$store.dispatch("userPermissions/fetchPermissions");
 
  },
  methods: {
    toRoute(_path) {
      if(!_path || this.getCurrentRoutePath == _path) {
        return
      }
      this.$router.push(_path);
    },
 
  },

};



</script>
