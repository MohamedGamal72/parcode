<template>
  <div class="componant-parCode">
    <!--Start dialog-->
    <a @click="showDialog()">
      <qr-code
        :title="qrText"
        :text="qrText"
        :size="qrSize"
        :bg-color="qrBgColor"
        :color="qrColor"
      >
      </qr-code>
    </a>
    <div :class="classOnDialogDiv">
      <v-dialog v-model="dialog" :width="dialogWidth" :dialogText="dialogText">
        <v-card>
          <v-card-title class="componant-parCode--title" :dialogTitle="dialogTitle">
            {{ dialogTitle }}
          </v-card-title>

          <v-card-text>
            <slot name="text-before-QrCode"></slot>
            <slot name="Qrcode">
              <qr-code
                :title="qrText"
                :text="qrText"
                :size="qrSize"
                :bg-color="qrBgColor"
                :color="qrColor"
              ></qr-code>
            </slot>
            <slot name="text-after-QrCode"></slot>
            {{ dialogText }}
          </v-card-text>

          <v-divider></v-divider>
          <v-btn :class="classOnBtn" @click="hide()"> {{ $t("close") }}</v-btn>
        </v-card>
      </v-dialog>
    </div>
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
  props: {
    dialogTitle: { type: String, required: false },
    dialogText: { type: String, required: false },
    dialogWidth: { type: Number, required: false, default: 256 },
    qrText: { type: String, required: true },
    qrSize: { type: Number, required: false },
    qrColor: { type: String, required: false, default: "#000" },
    qrBgColor: { type: String, required: false, default: "#fff" },
    isPupup: { type: String, required: false },
    classOnBtn: { type: String, required: false, default: "primary" },
    classOnDialogDiv: { type: String, required: false, default: "text-center" },
  },
  methods: {
    showDialog: function () {
      if (this.isPupup == "true") {
        this.dialog = true;
      }
    },
    hide: function () {
      return (this.dialog = false);
    },
  },
};
</script>

<style lang="scss">
.componant-parCode {
  font-family: inherit;
  font-size: inherit;

  &--title {
    background-color: var(--v-primary-base);
    color: var(--v-anchor-base);
  }
}
</style>
