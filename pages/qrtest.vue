<template>
  <div class="parCode-father">
    <!--Start dialog-->
    <div class="text-center" v-show="dialog == true">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2"> Privacy Policy </v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse e eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </v-card-text>

          <v-divider></v-divider>
          <v-btn class="primary" @click="hide()"> Close</v-btn>
        </v-card>
      </v-dialog>
    </div>
    <!--Start Qr-->
    <!--<template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on"> Click Me </v-btn>
        </template>-->

    <a @click="showDialog()">
      <qr-code text="mohammed Say hello" size="60" color="#000" bgColor="#eee"></qr-code>
    </a>
  </div>
</template>

<script>
import Vue from "vue";
import VueQRCodeComponent from "vue-qrcode-component";

Vue.component("qr-code", VueQRCodeComponent);
export default {
  name: "parCode",
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    showDialog: function () {
      return (this.dialog = true);
    },
    hide: function () {
      return (this.dialog = false);
    },
  },
};
</script>

<style>
img {
  height: auto;
  float: left;
  align-self: center;
}
</style>
