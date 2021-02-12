import Vue from "vue";
import VueAWN from "vue-awesome-notifications"; // نظام الاشعارات
import "font-awesome/css/font-awesome.min.css";
import "vue-awesome-notifications/dist/styles/style.scss";
import VueClipboard from 'vue-clipboard2'

import VeeValidate from "vee-validate"; // فلديت للفورم
import Vue2Filters from "vue2-filters";
import loading from "~/components/loading";

export default ({ $axios, store }) => {
  Vue.prototype.axios = $axios;
  VueClipboard.config.autoSetContainer = true // add this line
  Vue.use(VueClipboard)

  Vue.use({
    install(Vue) {

      // src/Classes/Enum
      Vue.prototype.$operation = {
        state: {
          INITIALIZED: 0,
          CANCELLED: 1, // < 0
          DELETED: 2,
          ENABLE: 10, // فعال او حوالة مرسلة
          FINISHED: 20, // منهي , او حوالة مستلمة
          FREEZING: 30,
          ADMIN_FREEZING: 40,
          getAll() {
            return [
              this.INITIALIZED,
              this.CANCELLED,
              this.DELETED,
              this.ENABLE,
              this.FINISHED,
              this.FREEZING,
              this.ADMIN_FREEZING,
            ];
          },
        },
        type: {
          TRANSFER: 20,
          CREDIT_TRANSFER: 25,
          CURRENCY_EXCHANGE: 1,
          LEVELING: 2,
          VISACARD: 3,
          CURRENCY_EXCHANGE_DIFFERENCE: 4,
          COMMISSIONS_WITHDRAWAL: 10,
        },
      };

      Vue.prototype.$exchangePriceTypes = {
        TRANSFER: 20,
        GENERAL: 1,
        AVERAGE_BOXES: 5,
        t(id) {
          if (parseInt(id) === this.TRANSFER) return "تصريف الحوالة المتقدمة";
          if (parseInt(id) === this.AVERAGE_BOXES) return "سعر الصناديق الوسطي";
          if (parseInt(id) === this.GENERAL) return "سعر تصريف العام (قيود)";
        },
      };

      Vue.prototype.$commissionTypes = {
        INITIALIZE: 0,
        BETWEEN_BRANCHES: 10,
        SPECIAL_RECEIVING_TO_BRANCH: 20,
        BETWEEN_CITES: 30,
        SPECIAL_RECEIVING_CITY: 40,
        BETWEEN_COUNTRIES: 50,
        SPECIAL_RECEIVING_TO_COUNTRY: 60,
        GLOBAL: 70,
      };

      Vue.prototype.$accountTypes = {
        TRANSFERS: 20,
        COMMISSIONS: 2,
        TRANSFERS_NOT_RECEIVED: 3,
        COMMISSIONS_NOT_RECEIVED: 4,
        EXCHANGE_COUNTING: 6,
        CUSTOM: 7,
        GENERAL_CASH_BOX: 8,
        INT_TYPE: 0,
      };
    },
  });

  Vue.filter("arrayValid", (array) => {
    if (array) {
      return array.length > 0;
    }
    return false;
  });

  Vue.filter("dateToString", (date) => {
    if (!date) {
      date = new Date();
    }
    return date.toLocaleDateString("en-US");
  });

  Vue.use(Vue2Filters);
  Vue.use(VeeValidate);

  Vue.use(VueAWN, {
    // see to loading pleases
    // https://f3oall.github.io/awesome-notifications/docs/customization/
    duration: 5000,
    position: 'bottom-left',
    icons: {
      prefix: '<i class="v-icon mdi mdi-',
      suffix: '"></i>',
      tip: 'help-circle',
      info: 'information',
      success: 'checkbox-marked-circle',
      warning: 'alert-circle',
      alert: 'alert-circle',
      async: 'loading',
      confirm: 'alert',
    },
    labels: {
      tip: 'ملاحظة',
      info: 'معلومات',
      success: 'تم بنجاح',
      warning: 'تحذير',
      alert: 'خطأ',
      async: 'جاري المزامنة',
      confirm: 'تأكيد',
    },
    messages: {
      async: 'Please, wait…',
      "async-block": 'Loading'
    }
  });

  Vue.component("loading", loading);
};
