let controller = 'home/';   // src/Controller/Api/UserController.php

export default ($axios) => {
  return {
    getMyEmployeesWithCity: (cityId) => { return $axios.$get(controller + 'city/' + cityId + '/user') },
    getSettingsCode: (code) => { return $axios.$get(controller + code + '/settings') },
  }
}
