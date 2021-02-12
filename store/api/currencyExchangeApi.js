let controller = 'currency/exchange/';   // src/Controller/Api/UserController.php

export default ($axios) => {
  return {
    exchangeCenter: () => { return $axios.$post( controller + 'exchangeCenter') },
    myCurrencyExchange: () => { return $axios.$get( controller + 'my_currency_exchange') },
    updateCurrencyExchange: (payload) => { return $axios.$post( controller + 'update_currency_exchange', payload) },
    branchCurrencyExchange: () => { return $axios.$get( controller + 'my_branch_currency_exchange') },
  }
}
