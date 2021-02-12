<template>
  <div class="h-inherit">
    <v-menu offset-y left>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">
          <span>{{ buttonText }}</span>
          <v-icon> {{ buttonIcon }} </v-icon>
        </v-btn>
      </template>
      <v-list class="odd-even">
        <v-list-item v-if="loading">
          <v-list-item-title style="width: 150px">
            <v-progress-linear
              color="primary accent-4"
              indeterminate
              rounded
              height="4"
            ></v-progress-linear>
          </v-list-item-title>
        </v-list-item>

        <template v-else>
          <v-list-item
            @click=""
            v-clipboard:copy="getTransferNotificationText"
            v-clipboard:success="copyTransferNotification"
          >
            <v-list-item-icon class="ml-4">
              <v-icon small color="secondary">mdi-content-copy</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <span>نسخ</span>
              <v-icon></v-icon>
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="item.path()"
          >
            <v-list-item-icon class="ml-4" v-if="item.icon">
              <v-icon small :color="item.color">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>


<script>
export default {
  components: {},
  props: {
    transfer: {
      type: Object,
      require : true
    },
    buttonText: {
      type: String,
      default: 'تصدير'
    },
    buttonIcon: {
      type: String,
      default: 'mdi-export-variant'
    },
    buttonCLass: {
      type: String,
      default: 'primary'
    },
    transferNotification: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  created() {
    this.initialize();
  },
  computed: {
    ifProd() {
      return ifProd();
    },
    userId(){
      return 1;
    },
    isAdmin(){
      return isAdmin();
    },
    isAdminOrBranch() {
      return isAdmin() || isBranch()
    },
    getTransferNotificationText() {
      let result = '';
      this.transferNotification.filter(v => v.value).map(item => {
        result += item.name ? clearHtmlFromText(item.name) + ': ' : ''
        result += clearHtmlFromText(item.value) + '\n'
      })

      return result;
    },
    getTransferNotificationAsUrl() {
      let result = '';
      this.transferNotification.filter(v => v.value).map(item => {
        result += item.name ? clearHtmlFromText(item.name) + ':%20' : ''
        result += clearHtmlFromText(item.value) + '%0D%0A'
      })

      return result;
    },
    items() {
      // resources OperationState.php
      // muse be in computed, to waiting roles from computed
      let items = [
        {
          title: 'مشاركة وتساب',
          active: true,
          icon: 'mdi-whatsapp',
          color: 'green',
          path: () => {
            // phone=whatsappphonenumber
            window.open('https://api.whatsapp.com/send?&text=' + this.getTransferNotificationAsUrl, '_blank')
          },
        },
        {
          title: 'طباقة بحجم A4',
          active: true,
          path: () => {
            window.open(webGlobalPath() + '/api/home/operation/A4/' + this.transfer.id + '/export', '_blank')
          },
          icon: 'mdi-printer',
          color: 'secondary',
        },
        {
          title: 'طباقة بحجم A7',
          active: true,
          path: () => {
            window.open(webGlobalPath() + '/api/home/operation/A7/' + this.transfer.id + '/export', '_blank')
          },
          icon: 'mdi-printer',
          color: 'secondary',
        },
        {
          title: 'تحميل اﻷشعار PDF',
          active: true,
          path: () => {
            window.open(webGlobalPath() + '/api/home/operation/downloadPdf/' + this.transfer.id + '/export')
          },
          icon: 'mdi-download',
          color: 'secondary',
        },
      ];

      return items.filter(i => i.active);
    },
  },
  methods: {
    async initialize() {

    },
    copyTransferNotification () {
      this.$awn.success('تم النسخ إلى الحافظة بنجاح')
    },
  },
}
</script>
