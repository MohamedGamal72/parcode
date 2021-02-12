<template>
  <div :style="$store.state.security.standalone ? 'height: 94px' : '' ">
    <!--        <v-footer class="d-none">-->
    <!--            <v-card-->
    <!--                    class="flex"-->
    <!--                    text-->
    <!--                    tile-->
    <!--                    :style="{ backgroundColor: $vuetify.theme.navbarBg + ' !important'}"-->
    <!--            >-->
    <!--              <v-card-actions class="justify-center white&#45;&#45;text">-->
    <!--                <p class="block">{{ 'جميع الحقوق محفوظة لشركة ' }}</p>-->
    <!--              </v-card-actions>-->
    <!--            </v-card>-->
    <!--        </v-footer>-->
    <v-card v-if="$store.state.security.standalone === true">
      <v-bottom-nav
        active.sync="4"
        :value="true"
        fixed
        dark
        shift
        class="pa-0"
      >
        <v-btn
          dark
          @click="reload()"
        >
          <span>تحديث</span>
          <v-icon>refresh</v-icon>
        </v-btn>

        <v-btn
          dark
          :to="getPath('company-language-backend-transfer-Search')"
        >
          <span class="caption">بحث</span>
          <v-icon>search</v-icon>
        </v-btn>

        <v-btn
          dark
          :to="getPath('company-language-backend-transfer-SendNew')"
        >
          <span class="caption">إرسال حوالة</span>
          <v-icon>add</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'Cfooter',
    data () {
      return {
        icons: [
          'fa fa-facebook',
          'fa fa-twitter',
          'fa fa-google-plus',
          'fa fa-linkedin',
          'fa fa-instagram',
        ],
      }
    },
    created () {
      // console.log(this.$store.state.security.standalone)
    },
    methods: {
      reload () {
        location.reload()
      },
      getPath (name) {
        return getRouteByName(name).path
      },
    },
  }
</script>
