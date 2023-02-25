<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="schedules"
        :items-per-page="itemsPerPage"
        :search="search"
        :loading="loadingStatus"
        show-select
        class="elevation-1"
        @toggle-select-all="selectAllToggle"
        @current-items="currentItems"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Item Auto Selection Settings</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn text icon v-on="on" @click="openDialog">
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </template>
              <span>Add</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  :disabled="!selected.length > 0"
                  text
                  icon
                  v-on="on"
                  @click="deleteSchedules"
                  ><v-icon>delete</v-icon></v-btn
                >
              </template>
              <span>Delete</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn text icon v-on="on"><v-icon>print</v-icon></v-btn>
              </template>
              <span>Print</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <json-excel :data="schedules">
                  <v-btn text icon v-on="on"
                    ><v-icon>mdi-file-export</v-icon></v-btn
                  >
                </json-excel>
              </template>
              <span>Export</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn text icon v-on="on" @click="refreshData">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh</span>
            </v-tooltip>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

            <v-dialog
              persistent
              :value="dialog"
              max-width="500px"
              @keydown.esc="close"
            >
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-flex md12>
                    <v-dialog
                      ref="timeFromDialog"
                      v-model="timeFromModal"
                      :return-value.sync="editedSchedule.time_from"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedSchedule.time_from"
                          :error-messages="timeFromErrors"
                          label="Time From"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="timeFromModal"
                        v-model="editedSchedule.time_from"
                        full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn text @click="timeFromModal = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="
                            $refs.timeFromDialog.save(editedSchedule.time_from)
                          "
                          >OK</v-btn
                        >
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>

                  <v-flex md12>
                    <v-dialog
                      ref="timeToDialog"
                      v-model="timeToModal"
                      :return-value.sync="editedSchedule.time_to"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :disabled="!editedSchedule.time_from"
                          v-model="editedSchedule.time_to"
                          :error-messages="timeToErrors"
                          label="Time To"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="timeToModal"
                        v-model="editedSchedule.time_to"
                        full-width
                        :min="editedSchedule.time_from"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text @click="timeToModal = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            $refs.timeToDialog.save(editedSchedule.time_to)
                          "
                          >OK</v-btn
                        >
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="close">Cancel</v-btn>
                  <v-btn
                    color="blue"
                    text
                    @click="save"
                    :loading="loadingStatus"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:header.data-table-select="{ on, props }">
          <v-simple-checkbox
            v-bind="props"
            v-on="on"
            :disabled="schedules.length === disabledCount"
          ></v-simple-checkbox>
        </template>

        <template v-slot:item.data-table-select="{ item, isSelected, select }">
          <v-simple-checkbox
            :value="isSelected"
            :readonly="item.branches.length > 0"
            :disabled="item.branches.length > 0"
            @input="select($event)"
          ></v-simple-checkbox>
        </template>

        <template v-slot:item.branches="{ item }">
          <span
            style="cursor:pointer;"
            v-if="item.branches.length > 0"
            @click="popBranch(item)"
          >
            <span v-for="(branch, index) in item.branches" :key="branch.id">
              <v-chip small color="primary darken-2" v-if="index === 0">
                {{ branch.name }}
              </v-chip>
            </span>
            <span v-if="item.branches.length - 1 > 0">
              (+{{ item.branches.length - 1 }} other{{
                item.branches.length - 1 != 1 ? "s" : ""
              }})
            </span>
          </span>
          <v-chip small color="secondary" v-if="item.branches.length <= 0">
            None
          </v-chip>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            title="Edit"
            @click="editSchedule(item, 1)"
          >
            mdi-pencil
          </v-icon>
          <v-icon small title="Duplicate" @click="editSchedule(item, 2)">
            mdi-content-duplicate
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import { mapActions } from 'vuex'
import { mapGetters } from "vuex";

import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import JsonExcel from "vue-json-excel";

export default {
  components: {
    JsonExcel
  },

  mixins: [validationMixin],

  data() {
    return {
      timeFromModal: false,
      timeToModal: false,
      search: "",
      selected: [],
      headers: [
        { text: "Time", align: "left", value: "time" },
        { text: "Actions", align: "center", value: "action", sortable: false }
      ],
      editedIndex: -1,
      editedSchedule: {
        time_from: "",
        time_to: ""
      },
      defaultSchedule: {
        time_from: "",
        time_to: ""
      },
      itemsPerPage: 5,
      current_items: 0
    };
  },

  validations: {
    editedSchedule: {
      time_from: { required },
      time_to: { required }
    }
  },

  computed: {
    ...mapGetters({
      schedules: "bsched/getSchedules",
      scheduleErrors: "bsched/getScheduleErrors"
    }),

    dialog() {
      return this.$store.state.dialog;
    },

    loadingStatus() {
      return this.$store.state.loading;
    },

    formTitle() {
      return this.editedIndex === -1 ? "New Schedule" : "Edit Schedule";
    },

    timeFromErrors() {
      const errors = [];
      if (!this.$v.editedSchedule.time_from.$dirty) return errors;

      var timeFromRequiredError = null;
      if (this.scheduleErrors["time_from|required"]) {
        timeFromRequiredError = this.scheduleErrors["time_from|required"];
      } else {
        timeFromRequiredError = "The time from field is required.";
      }

      !this.$v.editedSchedule.time_from.required &&
        errors.push(timeFromRequiredError);
      return errors;
    },

    timeToErrors() {
      const errors = [];
      if (!this.$v.editedSchedule.time_to.$dirty) return errors;

      var timeToRequiredError = null;
      if (this.scheduleErrors["time_to|required"]) {
        timeToRequiredError = this.scheduleErrors["time_to|required"];
      } else {
        timeToRequiredError = "The time to field is required.";
      }

      !this.$v.editedSchedule.time_to.required &&
        errors.push(timeToRequiredError);
      return errors;
    }
  },

  watch: {
    schedules() {
      this.$v.$reset(); // reset validation
    }
  },

  created() {
    this.$store.dispatch("bsched/fetchSchedules");
  },

  methods: {
    refreshData() {
      this.$store.dispatch("bsched/fetchSchedules");
    },

    openDialog() {
      this.editedIndex = -1; // reset default: important
      this.editedSchedule = Object.assign({}, this.defaultSchedule); // reset to default
      this.$store.dispatch("triggerDialog", true);
    },

    editSchedule(schedule, action) {
      this.editedIndex = action == 2 ? -1 : this.schedules.indexOf(schedule); // set index: important
      this.editedSchedule = Object.assign({}, schedule);
      this.$store.dispatch("triggerDialog", true);
    },

    deleteSchedules() {
      const schedules = this.$data.selected;
      const scheduleIds = schedules.map(schedule => {
        return schedule.id;
      });
      const scheduleTimes = schedules.map(schedule => {
        const time = schedule.time_from + " - " + schedule.time_to;
        const lists = "<br />" + time;
        return lists;
      });

      this.$dialog
        .warning({
          text:
            "<h3><em>You are about to delete an item(s):</em></h3>" +
            scheduleTimes,
          title: "Confirm Delete",
          actions: {
            false: "Cancel",
            true: {
              text: "Confirm",
              color: "warning"
            }
          }
        })
        .then(state => {
          if (state) {
            this.$store.dispatch("bsched/deleteSchedules", scheduleIds);
            this.$data.selected = []; // reset selected
          }
        });
    },

    close() {
      this.editedIndex = -1;
      this.$v.$reset();
      this.$store.dispatch("triggerDialog", false);
    },

    save() {
      this.$v.$touch();
      if (this.editedIndex > -1) {
        // update schedule
        this.$store.dispatch("bsched/updateSchedule", this.editedSchedule);
      } else {
        // store schedule
        this.$store.dispatch("bsched/storeSchedule", this.editedSchedule);
      }
    },

    selectAllToggle(props) {
      if (this.selected.length != this.current_items - this.disabledCount) {
        this.selected = [];
        const self = this;
        props.items.forEach(item => {
          if (!item.branches.length > 0) {
            self.selected.push(item);
          }
        });
        self.disabledCount = this.current_items - this.selected.length;
      } else this.selected = [];
    },

    currentItems(items) {
      this.current_items = items.length;
    }
  }
};
</script>
