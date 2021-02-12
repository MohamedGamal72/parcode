let controller = 'user/';   // src/Controller/Api/UserController.php

export default ($axios) => {
  return {
    index: () => { return $axios.$get( controller) },
    indexFilterByRole: (role, itemsPerPage) => { return $axios.$get( controller + '?role=' + role + '&itemsPerPage=' + itemsPerPage) },
    myEmployees: () => { return $axios.$get( controller + 'my_employees') },
    getListOf: (company, branches, employees) => { return $axios.$get( 'users/' + 'getListOf/' + company + '/' + branches + '/' + employees) },
    getUserByCity: (cityId) => { return $axios.$get( controller + cityId + '/city') },
    new: (payload) => { return $axios.$post( controller + 'new', payload) },
    edit: (id, payload) => { return $axios.$post( controller + id + '/edit', payload) },
    show: (id) => { return $axios.$get( controller + id + '/show') },
    delete: (id) => { return $axios.d$elete( controller + id) },
    updateMyEmployeePassword: (id) => { return $axios.$post( controller + id + '/update_my_employee_password') },
    updatePassword: (payload) => { return $axios.$post( controller + 'update_password', payload) },
    profile: (type) => { return $axios.$get( controller + type + '/profile') },
    editProfile: (type, payload) => { return $axios.$post( controller + type + '/profile', payload) },
  }
}
