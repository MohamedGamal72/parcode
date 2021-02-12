import Vue from "vue";

export default function ({ $axios, redirect, app, store }) {

    // $axios.onCreate({
    //     baseURL: process.env.baseUrl
    // })

    $axios.onRequest(config => {

        // Cross origin Problem -> for Dev Tools
        config.baseURL = process.env.NODE_ENV === 'production' ? '/' : process.env.MAILER_URL;

        // console.log('Making request to ' + config.url)
        if(config.url.indexOf('http') === -1 ){

            // في حال لم يكن الرابط يبدا بلسلاش سيتم وضع السلاش له
            if(config.url.startsWith('/') === false){ config.url = '/' + config.url }

            // إضافة رابط الشركة وapi للرابط
            config.url = webGlobalPath() + '/api' + config.url
        }

        store._vm.$nextTick(() => {
          store._vm.$nuxt.$loading.start()
          return config
        })

        // config.headers['Access-Control-Allow-Origin'] = '*'
        // config.headers.credentials = false
        // config.headers['Access-Control-Allow-Methods'] = 'PUT, POST, PATCH, DELETE, GET'


        // config.headers.Accept = 'application/json, text/plain, *'
        // config.headers = null;
    })

    $axios.onResponse((config, response) => {

        if(config.data) {
          app.store.dispatch('user/addNotification', config.data) // معالجة رسائل الخطأ من api

          if(config.data.redirect && config.data.redirect.path) {
            app.router.push({ path: config.data.redirect.path })
          }
        }

        store._vm.$nextTick(() => {
          store._vm.$nuxt.$loading.finish()
          return response
        })
    })

    $axios.onError(error => {

        // if (this.error.statusCode === 500
        //   && /^Loading chunk [0-9]+ failed/.test(this.error.message)
        //   && window.location.hash !== '#retry') {
        //   // the chunk might no longer be available due to a recent redeployment of the page
        //   // mark the page to don't trigger reload infinitely
        //   window.location.hash = '#retry'
        //   window.location.reload(true)
        // }

        if(error.response)
        {
          if(error.response.status === 500 /* sessions end */) {
            if(typeof error.response.data.startWith === "function" && error.response.data.startWith("<!-- Notice: SessionHandler")) {
              if(location.pathname.indexOf('/home') === -1) {
                app.router.push({ path: getStarterFrontendPath() + '/home'})
              }
            }
          }

          if(error.response.data) {
            app.store.dispatch('user/addNotification', error.response.data)
          }

          if(error.response.data.alert
            && error.response.data.alert.content
            && error.response.data.alert.content === '2 غير مصرح بلوصول الى الصفحة'
          ) {
            function deleteAllCookies() {
              let cookies = document.cookie.split(";");

              for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                let eqPos = cookie.indexOf("=");
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
              }
            }
            deleteAllCookies();
            localStorage.clear();
            window.localStorage.clear();
            sessionStorage.clear();

            app.store.dispatch('security/logout')
            return;
          }

          const code = parseInt(error.response && error.response.status)
          if (code === 403 || code === 302) {
            // redirect( webGlobalPath() + '/login')
            app.router.push({ path: getStarterFrontendPath() + '/home'})
          }
        }

        store._vm.$nextTick(() => {
          store._vm.$nuxt.$loading.finish()
          return Promise.reject(error)
        })
    })

    Vue.prototype.axios = $axios

}
