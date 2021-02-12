export default function ({ store, route, redirect, app}) {

  // // في حال كان مسجلا من قبل سيتم تحويله للصفحة الرئيسية فوراً
  // if(store.getters['security/isAuthenticated'] === true){
  //   let redirectPath = route.query.redirect;
  //
  //   if (typeof redirectPath !== 'undefined' && redirectPath !== webGlobalPath() +  '/login')
  //   {
  //     redirect(redirectPath)
  //   }
  //   else {
  //     redirect(webGlobalPath() + '/home' )
  //   }
  // }

  // check if the user can see the page
  // if(checkRoles(rules) === false && route.name !== 'company-language-Login')
  // {
  //   app.router.push({
  //     path : webGlobalPath() + '/login',
  //     query: { redirect: route.path, routeName: route.name }
  //   })
  // }


  // window.onNuxtReady(() => {
  //   console.log(app.router.to);
  // })

  // app.router.beforeEach(( to , from ) => {
  //
  // })
}
