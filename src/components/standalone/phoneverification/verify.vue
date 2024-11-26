<template>
  <v-container class="text-center">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card elevation="12">
          <v-card-title class="headline grey lighten-2">
            Phone Number Verification
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <!-- Full Name -->
              <v-text-field
                v-model="fullName"
                label="Full Name"
                :rules="[rules.required]"
                placeholder="Enter your full name"
                outlined
                clearable
              ></v-text-field>

              <!-- Branch -->
              <v-text-field
                v-model="branch"
                label="Branch"
                :rules="[rules.required]"
                placeholder="Enter your branch"
                outlined
                clearable
                :disabled="true"
              ></v-text-field>

              <!-- Phone Number -->
              <v-text-field
                v-model="phoneNumber"
                label="Phone Number"
                :rules="[rules.required, rules.phone]"
                placeholder="Enter your phone number"
                outlined
                clearable
              ></v-text-field>

              <!-- Send OTP Button -->
              <v-btn color="primary" @click="sendOtp" :disabled="!valid">
                Send OTP
              </v-btn>

              <!-- OTP Code -->
              <v-text-field
                v-if="otpSent"
                v-model="otpCode"
                label="Enter OTP"
                :rules="[rules.required, rules.otp]"
                placeholder="Enter the OTP sent to your phone"
                outlined
                clearable
              ></v-text-field>

              <!-- Verify OTP Button -->
              <v-btn
                v-if="otpSent"
                color="success"
                @click="verifyOtp"
                :disabled="otpCode.length !== 6"
              >
                Verify OTP
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="resendOtp">Resend OTP</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      fullName: '',
      branch: '',
      phoneNumber: "",
      otpCode: "",
      otpSent: false,
      valid: false,
      rules: {
        required: (value) => !!value || "This field is required.",
        phone: (value) =>
          /^[0-9]{10,15}$/.test(value) || "Enter a valid phone number.",
        otp: (value) =>
          /^[0-9]{6}$/.test(value) || "OTP must be 6 digits.",
      },
    };
  },
  created(){
     this.DecodeBranch()
  },
  methods: {
    DecodeBranch(){
    return  this.branch = atob(atob(atob(atob(this.$route.query.token))))

    },
    async getIPAddress() {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
         return response.data.ip;
      } catch (error) {
         return '123.123.123.123'
      }
    },
    sendOtp() {
      // Placeholder for sending OTP logic
      if(this.$route.query.key == 'SHhikA97phXxk4jCye9SPpPxr0gnJarPdFUtt779KSTANZg7DBMzHaDpvHUrgDz0ok4uBfoguOtQKJU1lerQ'){
      this.otpSent = true;
      console.log("OTP sent to:", this.phoneNumber);
      }else{
         alert('Not Authenticate')
      }
    },
    async verifyOtp() {
      var data = {
        name: this.fullName,
        phone: this.phoneNumber,
        branch: this.branch,
        ipaddress: await this.getIPAddress(),
        
      }
      
      if(this.$route.query.key == 'SHhikA97phXxk4jCye9SPpPxr0gnJarPdFUtt779KSTANZg7DBMzHaDpvHUrgDz0ok4uBfoguOtQKJU1lerQ'){
           this.$store.dispatch("app_booking_sys/verifyPhone", data).then((res)=>{
                console.log(res)
           })
      }else{
        alert('Not Authenticate')
      }
    
      //  alert()
      // // Placeholder for verifying OTP logic
      // if (this.otpCode === "123456") {
      //     var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuMTk6ODAwOVwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTczMjU4NzY0MSwiZXhwIjoxNzMyNTk0ODQxLCJuYmYiOjE3MzI1ODc2NDEsImp0aSI6IkllbnR1MnlkQ3EwRjlvemwiLCJzdWIiOjE3MTEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.giSDShew9YHZugt4jz9KCwEsvsktXslZHb9GhdY25NU";
      //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //     this.$router.push('/booking/guest')
      // } else {
      //   alert("Invalid OTP. Please try again.");
      // }
    },
    resendOtp() {
      // Placeholder for resending OTP logic
      console.log("OTP resent to:", this.phoneNumber);
    },
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 10%;
}
.v-btn {
  margin: 10px 0;
}
</style>
