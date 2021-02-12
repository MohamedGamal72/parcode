let controller = 'currency/';   // src/Controller/Api/UserController.php

export default ($axios) => {
  return {
    index: () => { return $axios.$get(controller + 'index') },
    new: (payload) => { return $axios.$post( `${controller}new`, payload) },
    edit: (id, payload) => { return $axios.$post( controller + id + '/edit', payload) },
    show: (id) => { return $axios.$get( controller + id + '/show') },
    myCurrencies: () => { return $axios.$get( controller + 'myCurrencies') },
    toCurrency: (fromAmount,fromCurrency,toCurrency,exchangeType) => { return $axios.$get( controller + `${fromAmount}/${fromCurrency}/${toCurrency}/${exchangeType}/toCurrency`) },
    delete: (id) => { return $axios.$delete( controller + id) },
  }
}
