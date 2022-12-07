<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md5>
        <v-card class="elevation-12" style="background:linear-gradient(356deg, rgba(0,0,0,1) 9%, rgba(255,255,255,0.5872549703475141) 100%);">
          <v-toolbar dark  >
            <v-img
              src="/logo.jpg"
              max-width="50"
              max-height="50"
              class="mr-2"
            ></v-img
            ><v-toolbar-title
              ><strong>Appletronics Service</strong>
              <p style="font-size: 11px">Appletronics System INC.</p>
              </v-toolbar-title
            >
          </v-toolbar>
          <v-card-text >
            <v-form >
              <v-text-field
                
                autofocus
                dense
                prepend-icon="person"
                v-model="form.email"
                label="Username"
                type="text"
                @keydown.enter="authenticate"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                dense
                v-model="form.password"
                label="Password"
                type="password"
                @keydown.enter="authenticate"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
             dark
              @click="authenticate"
              :loading="loadingStatus"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { login } from "../../helpers/auth";

export default {
  name: "login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    authenticate() {
      this.$store.dispatch("login");

      login(this.$data.form)
        .then((response) => {
          this.$store.commit("loginSuccess", response);
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          const networkError = error;
          let payload = [
            { status: true, message: networkError, timeout: 3000 },
          ];
          this.$store.commit("SNACKBAR_STATUS", payload, { root: true });
        });
    },
  },

  computed: {
    loadingStatus() {
      return this.$store.state.loading;
    },
  },

  created() {
    this.$store.commit("LOADING_STATUS", false, { root: true });
  },
};
</script>
<style>
 
</style>