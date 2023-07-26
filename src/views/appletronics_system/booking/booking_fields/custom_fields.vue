<template>
  <div>
   
    <v-container grid-list-md text-xs-center>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="fields_data"
        :items-per-page="itemsPerPage"
        :search="search"
        :loading="loadingStatus"
 
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Booking Custom Fields</v-toolbar-title>
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
                <v-btn dense v-on="on" @click="CreateItems">
                CREATE MODEL
                </v-btn>
              </template>
              <span>Add</span>
            </v-tooltip>

            <v-spacer></v-spacer>
               <v-select
                    v-on="on"
                    :items="[{name: 'TYPE', value: 1},{name: 'CATEGORIES', value: 3},{name: 'BRAND', value: 2},{name: 'ITEMS', value: 4},{name: 'PROPERTY TYPE', value: 5},{name: 'LEVEL', value: 6},{name: 'LOCATION', value: 7}]"
                    label="Select Fields"
                    item-text="name"
                    item-value="value"
                    @change="selectFields()"
                    v-model="fields"
                    solo
                    dense
                    style="margin-top: 20px; margin-right: 10px"
                ></v-select>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

             
          </v-toolbar>
        </template>

  

        <template v-slot:item.action="{ item }">
           
          <v-icon
            small
            class="mr-2"
            title="Edit"
            @click="edit(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            class="mr-2"
            title="Delete"
            @click="trash(item)"
          >
            delete
          </v-icon>

        </template>
               
      </v-data-table>

      
              <v-dialog
                v-model="CreateDialog"
                max-width="300px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{formTitle}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="Fields"
                            required
                            v-model="itemName"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-select
                             v-model="fields"
                             :items="[{name: 'TYPE', value: 1},{name: 'CATEGORIES', value: 3},{name: 'BRAND', value: 2},{name: 'ITEMS', value: 4},{name: 'PROPERTY TYPE', value: 5},{name: 'LEVEL', value: 6},{name: 'LOCATION', value: 7}]"
                             label="Field Type"
                             item-text="name"
                             item-value="value"
                             required
                          ></v-select>  </v-col>
                          <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-select
                             v-if="fields == 1"
                             v-model="cats"
                             :items="cat"
                             label="Options"
                             item-text="name"
                             item-value="value"
                             required
                          ></v-select>
                       </v-col>
                           
                        
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="CreateDialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>

                   
              </v-dialog>

              <v-dialog
                v-model="CreateModel"
                max-width="300px"
              >
                 
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{formTitle}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="Model"
                            required
                            v-model="vmodel"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12" 
                        >
                          <v-autocomplete
                             v-model="vtype"
                             :items="itemType"
                             label="Select Type"
                             item-text="name"
                             item-value="value"
                             required
                             dense
                          ></v-autocomplete>
                        </v-col>
                         <v-col
                          cols="12" 
                        >
                          <v-autocomplete
                             v-model="vcat"
                             :items="itemCat"
                             label="Select Category"
                             item-text="name"
                             item-value="value"
                             required
                             dense
                          ></v-autocomplete>
                        </v-col>
                         <v-col
                          cols="12" 
                        >
                          <v-autocomplete
                             v-model="vbrand"
                             :items="itemBrand"
                             label="Select Brand"
                             item-text="name"
                             item-value="value"
                             required
                             dense
                          ></v-autocomplete>
                        </v-col>
                           
                        
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="CreateModel = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="CreateModel = false || saveITEMS()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>

                   
              </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editID: '',
      timeFromModal: false,
      timeToModal: false,
      search: "",
      selected: [],
      headers: [
        { text: "Name", align: "left", value: "value" },
        { text: "Actions", align: "center", value: "action", sortable: false }
      ],
      editedIndex: -1,
      itemsPerPage: 5,
      current_items: 0,

      fields_data: [],
      fields: '',
      default: 1,
      CreateDialog: false,
      identify: 0,
      itemName: '',
      cat: [],
      cats: '',
      CreateModel: false,

      modelfields: '',
      itemType: [],
      itemBrand: [],
      itemCat: []
    };
  },

 
  computed: {
 
    dialog() {
      return this.$store.state.dialog;
    },

    loadingStatus() {
      return this.$store.state.loading;
    },

    formTitle() {
      return this.identify == 0 ?  "New Fields": "Edit Fields";
    },

 
  },
 
  created() {
    this.$store.dispatch("app_booking_sys/FetchFields", this.default).then((response)=> {
        this.fields_data = response.data;
    });
    this.$store.dispatch("app_booking_sys/ListDropDownFields").then((res)=>{
         
           this.cat = res.data.cat
           
       })
  },

  methods: {
    CreateItems(){
       this.$store.dispatch("app_booking_sys/ListDropDownFields").then((res)=>{
           this.itemBrand = res.data.brand
           this.itemCat = res.data.cat
           this.itemType =  res.data.type
       })
       this.CreateModel = true
    }, 
    refreshData() {
       this.$store.dispatch("app_booking_sys/FetchFields", this.default).then((response)=> {
          this.fields_data = response.data;
       });
    },
    openDialog() {
      this.identify = 0;
      this.CreateDialog = true;
      this.editedIndex = -1; // reset default: important
       
     
    },
    edit(data) {
      if(data.nomodel === null){
 
      this.$store.dispatch("app_booking_sys/ListDropDownFields").then((res)=>{
           this.itemBrand = res.data.brand
           this.itemCat = res.data.cat
           this.itemType =  res.data.type
       })
          this.identify = 1; // set index: important
          this.vbrand = data.Brand
          this.vcat = data.categories
          this.vtype = data.type
          this.vmodel = data.model
          this.editID = data.id
          this.CreateModel = true;
      }else{
          this.identify = 1; // set index: important
          this.itemName = data.value
          this.fields = data.value
          this.CreateDialog = true;
          this.editID = data.id
      }
       
    },
    close() {
       alert()
    },
    save() {
      var data;
        if(this.identify == 1){
            data = {
                type: this.fields,
                fields: this.itemName,
                id: this.editID,
                option: this.cats,
                identify: 1
                      }
        }else{
              data = {
                type: this.fields,
                fields: this.itemName,
                option: this.cats,
                identify: 0
            }
        }
         
     this.$store.dispatch("app_booking_sys/CreateFields", data);
       this.selectFields();
    },
    selectFields(){
         
      this.default = this.fields
      if(this.fields == 4){
        this.headers = [
        { text: "Model", align: "left", value: "model" },
        { text: "Brand", align: "left", value: "Brand" },
        { text: "Categories", align: "left", value: "categories" },
        { text: "Type", align: "left", value: "type" },
        { text: "Actions", align: "center", value: "action", sortable: false }
      ]
      }else{
         this.headers = [
        { text: "Name", align: "left", value: "value" },
        { text: "Actions", align: "center", value: "action", sortable: false }
      ]
      }
      this.refreshData();
    },
    trash(item){
          var data
         if(item.nomodel === null){
           data = {
            id: item.id
           }
          //this.fields = item.identity
          this.$store.dispatch("app_booking_sys/DeleteItems", data);
          //this.selectFields();
          this.default = this.fields
          this.refreshData();
         }else{
           data = {
            id: item.id,
            type: item.identity
          }
          //this.fields = item.identity
          this.$store.dispatch("app_booking_sys/DeleteFields", data);
          //this.selectFields();
          this.default = this.fields
          this.refreshData();
         }
         
    },
    saveITEMS(){
       var data;
        if(this.identify == 1){
              data = {
              model:  this.vmodel,
              type: this.vtype,
              cat: this.vcat,
              brand: this.vbrand,
              id: this.editID ,
              identify: 1

       }
        }else{
         data = {
              model:  this.vmodel,
              type: this.vtype,
              cat: this.vcat,
              brand: this.vbrand,
              identify: 0
           }
        }
       this.$store.dispatch("app_booking_sys/CreateITEMS", data);
       this.default = this.fields
        
    }
  }
};
</script>
