<template>
  <footer>
    <v-footer app style="background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(1,3,4,0.999019676229867) 9%, rgba(121,9,20,1) 43%); ">
      <v-card class="flex" flat >
        <v-card-actions class="justify-center" style="background: linear-gradient(270deg, rgba(112,43,43,0.05504208519345233) 2%, rgba(50,48,48,0.8869748583026961) 100%);">
          &copy;&nbsp;{{ new Date().getFullYear() }} -
          <strong>&nbsp;Appletronics System All Rights Reserved.</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-google-plus",
        "fab fa-linkedin",
        "fab fa-instagram"
      ]
    };
  }
};
</script>
