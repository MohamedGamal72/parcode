let controller = 'limit_country_currencies';

export default ($axios) => {
  return {
    controller: controller,
    index: () => { return $axios.$get( `${controller}.json`) },
    // show: (id) => { return $axios.$get( `${controller}/${id}/show`) },
    // new: (payload) => { return $axios.$post( `${controller}/new`, payload) },
    // edit: (id, payload) => { return $axios.$post( `${controller}/${id}/edit`, payload) },
  }
}
