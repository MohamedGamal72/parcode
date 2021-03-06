let controller = 'countries';   // src/Controller/Api/UserController.php

export default ($axios, requestProperties) => {
  return {
    controller: controller,
    index: (requestObject) => { return $axios.$get( `${controller}.json` + requestProperties(requestObject)) },
    show: (id) => { return $axios.$get( `${controller}/${id}/show`) },
    new: (payload) => { return $axios.$post( `${controller}/new`, payload) },
    edit: (id, payload) => { return $axios.$post( `${controller}/${id}/edit`, payload) },
  }
}
