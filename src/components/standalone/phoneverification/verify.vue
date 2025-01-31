<template>
  <v-container class="text-center">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card elevation="12">
          <v-card-title class="headline grey lighten-2" style="background:  linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(1,3,4,0.999019676229867) 9%, rgba(121,9,20,1) 43%);border-radius: 10px;color: white; ">
            Phone Number Verification
          </v-card-title>
          
          <v-card-text>
            <v-form ref="form" v-model="valid" style="margin-top:  50px;">
              <!-- Full Name -->
              <v-text-field
                v-model="fullName"
                label="Full Name"
                :rules="[rules.required]"
                placeholder="Enter your full name"
                outlined
                clearable
              ></v-text-field>

              
               <v-autocomplete
                v-model="branch"
                :items="branchDATA"
                item-text="name" 
                item-value="name" 
                dense
                filled
                label="Select preferred Branch"
                 outlined
              ></v-autocomplete>
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
              <v-btn color="primary" @click="sendOtp" :disabled="!valid" :loading="loading">
                Send OTP
              </v-btn>
              <v-card-text>
                  <v-alert
                    border="bottom"
                    colored-border
                    type="warning"
                    elevation="2"
                  >
                     Access to this system is restricted to Appletronics customers only.
                  </v-alert>
              </v-card-text>
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
              <h3  v-if="otpSent">OTP Expiration: {{countdown}}</h3>
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
            <v-btn text @click="sendOtp" :loading="loading">Resend OTP</v-btn>
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
      loading: false,
      setInterval: '',
      countdown: '',
      fullName: '',
      branch: '',
      branchDATA: [],
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
     this.DecodeBranch();
     this.getbranch();
  },
  methods: {
    async getbranch(){
        axios.get('https://staging-backend.appletronics.com.ph/api/branch/getbranch').then((res)=>{
            this.branchDATA = res.data
        })
    },
    localIp(){
        return new Promise((resolve, reject) => {
            const ips = [];
            const rtcPeerConnection = new RTCPeerConnection({ iceServers: [] });

            rtcPeerConnection.createDataChannel('');

            rtcPeerConnection.createOffer().then((offer) => {
              rtcPeerConnection.setLocalDescription(offer);

              rtcPeerConnection.onicecandidate = (event) => {
                if (event && event.candidate && event.candidate.candidate) {
                  const candidate = event.candidate.candidate;
                  const ipRegex = /(?:\d{1,3}\.){3}\d{1,3}/g; // Regex to extract IPs
                  const ipMatch = candidate.match(ipRegex);
                  if (ipMatch) {
                    ipMatch.forEach((ip) => {
                      if (!ips.includes(ip)) {
                        ips.push(ip);
                      }
                    });
                  }
                } else {
                  resolve(ips);
                }
              };
            }).catch(reject);
          });
    },
    DecodeBranch(){
    return  this.branch = atob(atob(atob(atob(this.$route.query.token))))

    },
    async getIPAddress() {
       try {
        const response = await fetch('https://api.ipify.org?format=json');

        // Ensure the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        return data.ip; // Access the 'ip' field from the parsed response
      } catch (error) {
        return error.message; // Return the error message
      }

    },
 async sendOtp() {
         
         
        var ip = await this.getIPAddress()
        var data = {
        name: this.fullName,
        phone: this.phoneNumber,
        branch: this.branch,
        ipaddress: ip,
        token: this.$route.query.token 
        
      }
      this.loading = true
      // Placeholder for sending OTP logic
      if(this.$route.query.key == 'SHhikA97phXxk4jCye9SPpPxr0gnJarPdFUtt779KSTANZg7DBMzHaDpvHUrgDz0ok4uBfoguOtQKJU1lerQ'){
       await this.$store.dispatch("app_booking_sys/sendOtp", data).then((res)=>{
       if(res.data == 1){
        alert('Please Try Again Tomorrow Or Goto Near Branch to file booking schedule')
       }else if(res.data == 2){
        alert('Sorry Customer Not Found')
       }else{
         this.otpSent = true;
         clearInterval(this.setInterval)
         let count = 60; // Use let instead of const
         this.setInterval = setInterval(() => {
             this.countdown = count-- 
          },   1000); // 3 minutes in milliseconds
       }
         this.loading = false    
        })
        
    
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
        otp: this.otpCode,
        token: this.$route.query.token 
      }
      
      if(this.$route.query.key == 'SHhikA97phXxk4jCye9SPpPxr0gnJarPdFUtt779KSTANZg7DBMzHaDpvHUrgDz0ok4uBfoguOtQKJU1lerQ'){
        await this.$store.dispatch("app_booking_sys/verifyPhone", data).then((res)=>{
            clearInterval(this.setInterval)
            if(res.data.token){
              var token = res.data.token.original.access_token
            } 
            
            if(token){
           
              localStorage.setItem("token", `Bearer ${token}`);
              localStorage.setItem("user", JSON.stringify(res.data.data));
              localStorage.setItem("guest", 1);
              axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
              
              this.$router.push('/booking/guest')
            }else{
                 
                 this.$swal.fire(this.otpCode, res.data, "warning" );
            }
            
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
