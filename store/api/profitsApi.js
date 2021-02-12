let controller = 'profits/';   // src/Controller/Api/UserController.php

export default ($axios) => {
  return {
    index: () => { return $axios.$get(controller + '/index') },
  }
}
