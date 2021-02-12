let controller = 'position';   // src/Controller/Api/UserController.php

export default ($axios) => {
  return {
    index: () => { return $axios.$get( `${controller}/index`) },
    show: (id) => { return $axios.$get( `${controller}/${id}/show`) },
    new: (payload) => { return $axios.$post( `${controller}/new`, payload) },
    edit: (id, payload) => { return $axios.$post( `${controller}/${id}/edit`, payload) },
  }
}
