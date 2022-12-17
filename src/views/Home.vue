<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-row>
            <v-col cols="12" sm="4">
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
            </v-col>
            <v-col cols="12" sm="4">
              <v-card
                class="pa-2"
                outlined
                tile
               
                
              >
                <v-icon style="margin-right: 5px; color: yellowgreen"
                  >mdi-account-check</v-icon
                >
                <strong
                  >Accepted
                  <h2>{{ jobsCounts.accepted }}</h2></strong
                >
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
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
            </v-col>
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
    };
  },

  mounted() {
    this.$store.dispatch("app_booking_sys/JobsCount").then((res) => {
      this.jobsCounts = res.data;
    });
  },
};
</script>
