<template>
  <div>
    <qr-code text="56" size=60  bg-color="#fff"></qr-code>
  </div>
</template>

<script>
import Vue from 'vue';
import VueQRCodeComponent from 'vue-qrcode-component';

Vue.component('qr-code', VueQRCodeComponent);
export default {
  name: 'parCode',
};

</script>

<style>
img {
  height: auto;
  float: left;
  align-self: center;
}
</style>
