let controller = 'box/';   // src/Controller/Api/UserController.php

export default ($axios) => {
  return {
    index: (payload) => { return $axios.$post(controller, payload) },
    getForm: () => { return $axios.$get(controller + 'getForm') },
    new: (payload) => { return $axios.$post( `${controller}/new`, payload) },
    edit: (id, payload) => { return $axios.$post( controller + id + '/edit', payload) },
    show: (id) => { return $axios.$get( controller + id + '/show') },
    delete: (id) => { return $axios.$delete( controller + id) },
  }
}
