let controller = 'transfer/';   // src/Controller/Api/UserController.php
import Vue from 'vue';

export default ($axios) => {
  return {
    index: (payload) => { return $axios.$post(controller, payload) },
    new: (fromBox, toBox, payload) => { return $axios.$post( `${controller}${fromBox}/${toBox}/new`, payload) },
    getCommissionTransfer: (fromBox, toBox, amount) => { return $axios.$get( `${controller}${fromBox}/${toBox}/${amount}/commission`) },
    edit: (id, payload) => { return $axios.$post( controller + id + '/edit', payload) },
    show: (id) => { return $axios.$get( 'home/operation/' + Vue.prototype.$operation.type.TRANSFER + '/' + id) },
    receiving: (id, payload) => { return $axios.$post( controller + id + '/receiving', payload) },
    uploadReceiverImage: (id, payload) => { return $axios.$post( controller + id + '/uploadReceiverImage', payload, { headers: {'Content-Type': 'multipart/form-data' }}) },
    freezing: (id, attribute, payload) => { return $axios.$post( controller + id + '/' + attribute + '/freezing', payload) },
    cancelling: (id, payload) => { return $axios.$post( controller + id + '/cancelling', payload) },
    delete: (id) => { return $axios.$delete( controller + id) },
  }
}
