let controller = 'report/';   // src/Controller/Api/UserController.php

export default ($axios) => {
  return {
    index: (box, parameters) => { return $axios.$get(controller + box + '/index' + parameters) },
  }
}
