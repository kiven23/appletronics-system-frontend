<template>
  <v-container class="text-center">
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card elevation="12">
          <v-card-title class="headline grey lighten-2">
            Appletronics Booking System is on Maintenance Mode
          </v-card-title>
          <v-card-text>
            <p>We are currently performing maintenance to improve your experience.</p>
            <p>Please check back later. Thank you for your understanding.</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MaintenancePage',


  created(){
    this.$store.commit("logout");
    this.$router.push("/maintenance");
  }
}
</script>

<style>
  /* Add any custom styles here */
</style>
