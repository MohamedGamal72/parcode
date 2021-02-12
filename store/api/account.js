let controller = 'accounts';   // src/Controller/Api/AccountController.php

export default ($axios, requestGroups) => {
  return {
    // index: (options) => { return $axios.$get(controller + '?page=1&groups[]=read_account&groups[]=read&watcherUser.roles=ROLE_EMPLOYEE') },
    index: (options) => { return $axios.$get(controller + requestGroups(options)) },
    getForm: () => { return $axios.$get(controller + 'getForm') },
    accountsToTransfer: () => { return $axios.$get(controller + 'accountsToTransfer') },
    new: (payload) => { return $axios.$post( `${controller}new`, payload) },
    edit: (id, payload) => { return $axios.$post( controller + id + '/edit', payload) },
    show: (id) => { return $axios.$get( controller + id + '/show') },
  }
}
