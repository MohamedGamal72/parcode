<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-menu
      :nudge-width="100"
      offset-y
      bottun
      left
      menu-props="false"
    >
      <template v-slot:activator="{ on }">
        <v-toolbar-title v-on="on">
          <v-badge
            color="black"
            overlap
            :value="getMassagesLength"
            :content="getMassagesLength"
            class="mt-2 ml-5 font-ltr-i"
          >
            <v-icon color="white">
              mail
            </v-icon>
          </v-badge>
        </v-toolbar-title>
      </template>

      <v-list
        v-if="notifications"
        dense
        style="max-width: 250px; max-height: 200px; overflow-y: auto;"
        menu-props
        expand
        class="px-1 py-0"
      >
        <v-list-item
          v-for="(item, index) in notifications"
          v-if="item.message"
          :key="index"
          :style="item.seen === false ? unSeeNotificationStyle : '' "
          class="pa-0"
          no-data-text="'لايوجد رسائل جديدة حالياً'"
          @click="showDialog(item)"
        >
          <v-list-item-title class="caption">
            <v-icon
              small
              class="pl-1"
              :style="item.seen === false ? unSeeNotificationStyle : '' "
            >
              mail
            </v-icon>
            {{ item.message.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card
        v-if="selectedMassage"
        class="text-center"
      >
        <v-card-title class="subheading">
          {{ selectedMassage.message.title }}
        </v-card-title>

        <v-card-text v-html="selectedMassage.message.html" />

        <v-card-actions>
          <v-spacer />
          <div v-if="selectedMassage.seen === false">
            <v-btn
              color="secondary"
              text
              @click="close"
            >
              القراءة لاحقاً
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="setSeeStatus()"
            >
              علم الرسالة كمقروءة
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              color="secondary"
              text
              @click="close"
            >
              إغلاق
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

  export default {
    components: {},
    data () {
      return {
        unSeeMessagesCount: 0,
        dialog: false,
        selectedMassage: null,
        unSeeNotificationStyle: {
          backgroundColor: this.$vuetify.theme.currentTheme.primary,
          color: this.$vuetify.theme.currentTheme.accent,
        },
      }
    },
    computed: {
      notifications () {
        const notificationsList = this.$store.getters['user/UserNotifications']

        if (notificationsList && notificationsList.length === 0) {
          return [
            {
              message: {
                title: 'لايوجد رسائل جديدة',
                html: null,
              },
            },
          ]
        }

        return notificationsList
      },
      getMassagesLength () {
        let count = 0

        if (!this.notifications) { return 0 }

        this.notifications.forEach(function (notification) {
          if (notification.seen === false) {
            count++
          }
        })

        this.unSeeMessagesCount = count

        if(count > 99) {
          count = '99+'
        }

        return count
      },
    },
    watch: {
      unSeeMessagesCount (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (this.unSeeMessagesCount > 0) {
            this.$awn.warning('لديك رسائل غير مقروءة')
          }
        }
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        const self = this

        // get new Notifications
        this.$store.dispatch('user/updateUserNotifications')

        // update massges every one hours
        setTimeout(function () {
          self.initialize()
        }, 60 * 60 * 1000)
      },
      showDialog (item) {
        if (item.message.html) {
          this.dialog = true
          this.selectedMassage = item
        }
      },
      setSeeStatus () {
        if (this.selectedMassage && this.selectedMassage.id) {
          if (this.selectedMassage.seen === false) {
            this.$store.commit('user/setSeeStatus', this.selectedMassage)
          }
          this.close()
        }
      },
      close () {
        this.dialog = false
        this.selectedMassage = null
      }
    },
  }
</script>
