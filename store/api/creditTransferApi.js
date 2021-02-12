let controller = 'creditTransfer/';   // src/Controller/Api/UserController.php

export default ($axios) => {
  return {
    index: (payload) => { return $axios.$post(controller, payload) },
    new: (fromBox, toBox, payload) => { return $axios.$post( `${controller}${fromBox}/${toBox}/new`, payload) },
    getCommissionTransfer: (fromBox, toBox, amount) => { return $axios.$get( `${controller}${fromBox}/${toBox}/${amount}/commissions`) },
    // edit: (id, payload) => { return $axios.$post( controller + id + '/edit', payload) },
    receiving: (id, payload) => { return $axios.$post( controller + id + '/receiving', payload) },
    freezing: (id, attribute, payload) => { return $axios.$post( controller + id + '/' + attribute + '/freezing', payload) },
  }
}
