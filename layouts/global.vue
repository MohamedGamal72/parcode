<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <v-app-bar
      app
      clipped-right
      :color="ifProd ? 'topbar' : 'primary'"
      dense
    >
    <v-toolbar-title class="mr-2">
      <span class="title white--text bold" v-text="settings.name"></span>
    </v-toolbar-title>
    <v-spacer />

    </v-app-bar>

    <v-content>
      <transition>
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    components: {
    },
    data () {
      return {}
    },
    computed: {
      isAuthenticated () {
        return this.$store.getters['security/isAuthenticated']
      },
      ifProd () {
        return ifProd()
      },
      settings() {
        return {
          name: 'أسم شركتك'
        }
      },
    },
    watch: {
      '$route' (to, from) {
        // كل ساعة رح يفحص لو في أخطاء
        // get all message from
        if ((getServerTimeNow() - this.lastTimeGetFlash) > 60 * 60 * 1000) {

        }
      },
    },
    created () {
      if (window.navigator.standalone === true) {
        // console.log('display-mode is standalone');
      } else {
        // try to install
        this.initAddToHomeScreen()
      }

      if (this.$store.getters['security/getWebCompany'] === '') {
        this.$store.commit('security/setWebLanguage', this.$route.params.language)
      }

      this.$store.dispatch('security/updateSettings')
      if (this.isAuthenticated) {
        this.$store.dispatch('security/getUserSettings')
      }
    },
    methods: {
      initAddToHomeScreen () {
        let deferredPrompt

        window.addEventListener('beforeinstallprompt', (e) => {
          // يتم أيقاف الطلب في المتصفحات القديمة ,لتجاوز تنفيذ الكود الفوري
          // to stop the old browsers and don't active the code
          e.preventDefault()

          // get the even in our variable
          deferredPrompt = e

          // هون لازم أظهر زر التثبيت
          this.appInstallActive = true
        })

        this.appInstallerFunction = () => {
          if (!deferredPrompt) { return }

          // Show the modal add to home screen dialog
          deferredPrompt.prompt()
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choice) => {
            if (choice.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt')
            } else {
              console.log('User dismissed the A2HS prompt')
            }
            // Clear the saved prompt since it can't be used again
            deferredPrompt = null
          })
        }
      },
    },
  }
</script>
