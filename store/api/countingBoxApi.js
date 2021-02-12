const controller = "countingBox/"; // src/Controller/Api/UserController.php

export default ($axios) => ({
  index: (box, payload) => $axios.$post(`${controller + box}/index`, payload),
  myCountingBox: (currency) =>
    $axios.$get(`${controller + currency}/myCountingBox`),
  myBalancesList: () => $axios.$get(`${controller}userBalances`),
  balancesTable: () => $axios.$get(`${controller}balancesTable`),
  exchangeCurrency: (payload) =>
    $axios.$post(`${controller}exchangeCurrency`, payload),
  operationHistory: (operation) =>
    $axios.$get(`${controller + operation}/operationHistory`),
  deleteOperation: (operation) =>
    $axios.$delete(`${controller + operation}/deleteOperation`),
  commissionsWithdrawal: (currencyId) =>
      $axios.$post(`${controller}commissionsWithdrawal/${currencyId}`)
});
