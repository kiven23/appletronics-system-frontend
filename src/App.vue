<template>
 
  <v-app :style="this.$route.name == 'login'?  'background:  linear-gradient(340deg, rgba(0,0,0,1) 9%, rgba(255,28,0,0.7777311608237045) 100%);':'background:  linear-gradient(270deg, rgba(112,43,43,0.05504208519345233) 2%, rgba(50,48,48,0.8869748583026961) 100%);'">
     <!-- <v-vanta v-if="this.$route.name == 'login'" effect="rings" :options="options">
      </v-vanta> -->
    <!-- Navbar -->
    <Navbar v-if="isLoggedIn" />

    <!-- Toolbar -->
    <Toolbar v-if="isLoggedIn" />

    <!-- Content -->
    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- Footer -->
    <Footer v-if="isLoggedIn" />

    <!-- Snackbar -->
    <Snackbar />
       
  </v-app>
 
</template>

<script>
import Navbar from "./components/layouts/Navbar";
import Toolbar from "./components/layouts/Toolbar";
import Footer from "./components/layouts/Footer";
import Snackbar from "./components/layouts/Snackbar";
//import VVanta from 'vue-vanta';
export default {
  
  components: {
    // VVanta,
    Navbar,
    Toolbar,
    Footer,
    Snackbar
  },
   data(){
     return{
        options: {
            mouseControls: true,
            touchControls: true,
            minHeight: 800,
            minWidth: 100.00,
            scale: 1.00,
            scaleMobile: 1.00
        }
     }
   },
  
  created() {
     
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    const windowWidth = this.$store.state.windowSize.width;
    if (windowWidth < 769) {
      this.$store.commit("DRAWER_STATUS", false);
    }
  },

  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      this.$store.commit("WINDOW_SIZE");
    }
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    goDark() {
      return this.$store.getters.goDark;
    }
  }
};
</script>
