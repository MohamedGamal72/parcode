let controller = 'security/';

export default ($axios) => {
  return {
    login: (payload) => { return $axios.$post( controller + 'login', payload)},
    logout: () => { return $axios.$get( controller + 'logout') },
    newtoken: (type) => { return $axios.$get(controller + 'newtoken/' + type) },
    getUserSettings: () => { return $axios.$get( controller + 'get_user_settings') },
    removeAuthorizedIP: (payload) => { return $axios.$post( controller + 'removeAuthorizedIP', payload) },
    forgetPassword: (payload) => { return $axios.$post( controller + 'forgetPassword', payload) },
  }
}
