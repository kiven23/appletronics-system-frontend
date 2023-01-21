
<template>
  <v-card>
    <v-app-bar class="nav-color">
      <v-img
        src="/addessa_logo.png"
        max-width="40"
        max-height="40"
        style="margin: 5px"
      ></v-img>
      <v-toolbar-title
        class="textfont2"
        style="color: #14a76c"
        data-aos="fade-down"
        >ADDESSA RAFFLE DRAW</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-card
            v-on="on"
            class="mx-auto"
            max-width="450"
            data-aos="fade-right"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title style="color: #14a76c" class="textfont2">
                  Raffle Draw Start on</v-list-item-title
                >
                <v-list-item-subtitle>{{
                  new Date(RaffleDate)
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </template>
      </v-tooltip>
    </v-app-bar>

    <v-container class="card-color" center style="height: 720px">
      <v-card dark style="margin-bottom: 20px">
        <v-card-title
          class="textfont2"
          style="color: #ffe400"
          data-aos="fade-right"
        >
          Announcement
        </v-card-title>

        <v-card-subtitle>
          <v-alert
            v-model="alert"
            dismissible
            color="cyan"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-message"
          >
            Message to customer
          </v-alert>
        </v-card-subtitle>
      </v-card>
      <v-row>
        <v-col cols="12">
          <v-card style="min-height: 500px">
            <v-card-title class="text-h5"> </v-card-title>

            <v-card-subtitle>
              <v-row>
                <v-col cols="12 ">
                  <p
                    v-if="timer != 0"
                    style="
                      color: #14a76c;
                      font-size: 100px;
                      text-align: center;
                      margin-top: 150px;
                    "
                    class="textfont1"
                  >
                    {{ timer }}
                  </p>
                  <v-card
                    v-if="timer == 0 && go == 1"
                    style="
                      margin-bottom: 20px;
                      min-height: 200px;
                      text-align: center;
                    "
                  >
                    <!-- <v-card-title class="textfont2" style="color: #14a76c"
                      >Congratulations..! You are the winner</v-card-title
                    >

                    <div v-for="(win, $index) in Winners.data[0]" :key="$index">
                      <v-card-subtitle style="margin: 5px" data-aos="fade-left"
                        ><strong
                          >Customer: {{ win.customer }} <br />Invoice:
                          {{ win.invoice }}</strong
                        >
                        <br />
                        You are the winner of 1,000,000 pesos and House in lot 1
                        hectires with rice field bagong tanim, I hope you are
                        prepared for the great and exciting changes that will
                        come to your life soon. Enjoy and stay safe.
                      </v-card-subtitle>
                    </div> -->
                    <v-avatar class="ma-3" size="125" tile>
                      <v-img src="/trophy.webp"></v-img> </v-avatar
                    ><br /><br />
                    <p class="textfont2" style="font-size: 50px">
                      Congratulations
                    </p>
                    <br />
                    <p>
                      You are the winner of 1,000,000 pesos and House in lot 1
                      hectires with rice field bagong tanim, I hope you are
                      prepared for the great and exciting changes that will come
                      to your life soon. Enjoy and stay safe.
                    </p>
                    <v-btn
                      color="dark"
                      small
                      dense
                      style="margin: 10px"
                      @click="results = true"
                      >Raffle Result</v-btn
                    >
                    <v-dialog v-model="results" max-width="290" >
                      <v-card style="text-align: center">
                        <v-card-title class="textfont2" >
                          Raffle Draw Winners
                        </v-card-title>

                        <v-card-text  >
                          <div
                            v-for="(win, $index) in Winners.data[0]"
                            :key="$index"
                          >
                            <strong>
                              {{ win.customer }} <br />Invoice:
                              <p style="color: #14a76c">
                                {{ win.invoice }}
                              </p></strong
                            >
                          </div>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      results: false,
      RaffleDate: "07/18/2022 12:30",
      timer: "",
      percent: 0,
      go: 0,
      winners: [],
    };
  },
  computed: {
    ...mapGetters({
      Winners: "raffledraw/getWinner",
    }),
    countdownDate() {
      return new Date(this.RaffleDate).getTime();
    },
  },
 
  methods: {},
  mounted() {

 this.sockets.subscribe("check", (res) => {
      this.timer = res.status;
      console.log(res);
      if (res.status == 0) {
        //LOADING
        const loading = this.$vs.loading({
          percent: this.percent,
        });
        const interval = setInterval(() => {
          if (this.percent <= 100) {
            loading.changePercent(`${this.percent++}%`);
          }
        }, 40);
        setTimeout(() => {
          loading.close();
          clearInterval(interval);
          this.percent = 0;
          this.go = 1;
       
        }, 4800);
        this.$store.dispatch("raffledraw/GetWinner");
      }
    });
    
 
   
  },
};
</script>
<style >
@font-face {
  font-family: myFirstFont;
  src: url(http://192.168.1.19:8012/Macondo-Regular.ttf);
}
@font-face {
  font-family: myFirstFont2;
  src: url(http://192.168.1.19:8012/LuckiestGuy-Regular.ttf);
}
p {
  font-family: myFirstFont;
}
.textfont1 {
  font-family: myFirstFont;
}
.textfont2 {
  font-family: myFirstFont2;
}
.nav-color {
  background: linear-gradient(
    90deg,
    rgba(28, 27, 27, 1) 17%,
    rgba(20, 167, 108, 1) 74%
  );
}

.card-color {
  background: linear-gradient(
    167deg,
    rgba(255, 255, 255, 1) 17%,
    rgba(30, 98, 71, 1) 86%
  );
}
.card-color2 {
  background: linear-gradient(
    0deg,
    rgba(54, 50, 50, 0.9149860627844888) 19%,
    rgba(186, 52, 23, 0.6656863428965336) 53%,
    rgba(143, 51, 32, 0.8813726174063375) 80%
  );
}
</style>