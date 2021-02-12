export default ({ $axios , store }) => {

    window.isAdmin = function () {
        return true;
    }

    window.isBranch = function () {
        return store.getters['security/isAuthenticated'] && store.getters['security/hasRole']('ROLE_BRANCH');
    }

    window.isEmployee = function () {
        return store.getters['security/isAuthenticated'] && store.getters['security/hasRole']('ROLE_EMPLOYEE');
    }

    window.isAuthorized = function () {
        return store.getters['security/isAuthenticated'];
    }

    window.isHave = function(needle, object){
        for (let i in object){
            if(object[i] === needle){
                return true
            }
        }
        return false
    }

    window.ifProd = function () {
        // from yarn prod -> production ,  yarn dev -> development

        if (window.location.hostname === 'stage.tr.besbose.com' ||
            window.location.hostname === 'localhost') { // to get dev mode in production mode
            return false
        }
        return process.env.NODE_ENV === 'production'
    }

    window.ifStage = function () {
        // from yarn prod -> production ,  yarn dev -> development

        if (window.location.hostname === 'stage.tr.besbose.com') { // to get dev mode in production mode
            return true
        }
        return false
    }

    window.clearNameRole = function (v) {
        return /^[\s0-9a-zA-Zا-ي]+$/.test(v);
    }

    // every path must start with
    window.webGlobalPath = function () {
        if(store.getters['security/getWebGlobalPath'] === '//0'){
          let array = window.location.pathname.split('/');
          let webLanguage = array[1];

          console.log("path not found")
          return '/' + webLanguage + '/0';
        }
        return store.getters['security/getWebGlobalPath']
    }

    window.getStarterFrontendPath = function () {
      return '/ar';
    }

    window.getServerTimeNow = function () { // get month string 06-2019 , lastNumber : 0 for this month
        // let stringTime = document.getElementById('server-time-now').getAttribute('time');
        // return new Date(stringTime * 1000)
        return new Date()
    }

    window.getMonthString = function (lastNumber) { // get month string 06-2019 , lastNumber : 0 for this month
        let date = getServerTimeNow();
        let month = date.getMonth() + 1 - lastNumber; // يجب جمع الواحد ﻷن الفانكشن تبلش من 0
        month = month < 10 ? '0' + month : month;

        return month + '-' + date.getFullYear()
    }

    window.getDateWithDay = function (day) {
        let today = getServerTimeNow();
        let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + day);
        return lastWeek.toISOString().substr(0, 10)
    }

    window.getTimeList = function () { // get month string 06-2019 , lastNumber : 0 for this month
        let to = getServerTimeNow().toISOString().substr(0, 10)

        return [
            {
                id: 1,
                from: getDateWithDay(-6),
                to: to,
                text: 'منذ 7 أيام'
            },
            {
                id: 2,
                from: getDateWithDay(-14),
                to: to,
                text: 'منذ 15 يوماً'
            },
            {
                id: 3,
                from: getDateWithDay(-30),
                to: to,
                text: 'منذ 30 يوماً'
            },
            {
                id: 4,
                from: getDateWithDay(-92),
                to: to,
                text: 'منذ 90 يوماً'
            },
        ];
    }

// إرسال قائمة الكلمات المهمة وسيتم جعل الكلمات فيها عريضة
    window.boldTextWithValue = function (values) {
        let list = document.getElementsByClassName('bold-text-with-value');
        for (let i = 0; i < list.length; i++) {
            let str = list[i].innerHTML
            values.forEach(function (value) {
                str = str.replace(value, '<b>' + value + '</b>')
            })

            list[i].innerHTML = str
        }
    }

    if (ifProd()) {
      if(window.location.hostname !== 'localhost'){
        let original = window.console
        window.console = {
          log: function () {
              // do sneaky stuff
              // إخفاء الكونصل في نظام البردكشن
              // original.log.apply(original, arguments)
          }
          , warn: function () {
              // do sneaky stuff
              if (arguments[0].indexOf('tiptap-vuetify') > -1) {
                  return;
              }
              original.warn.apply(original, arguments)
          }
          , error: function () {
              // do sneaky stuff
              original.error.apply(original, arguments)
          }
        }
      }
    }

    window.setServicesList = function(list){
        if(list !== undefined && list.v){
            routesList[4].roles = ['authorized']
        }
    }

    window.getCompanySetting = function () {
        return store.state.security.settings
    }

    window.clearHtmlFromText = function (text) {
      return text.toString().replace(/<\/?[^>]+(>|$)/g, "").trim();
    }

    window.objectToArray = function(object) {
      let array = [];
      for (let key in object) {
        if (object.hasOwnProperty(key)) {
          array.push(object[key]);
        }
      }

      return array;
    }

    window.toCurrency = function(amount, currency, userExchange, newCurrency, exchangeType) {
      if (amount <= 0) { // التاكد من ان المبلغ قابل لتحويل
        return 0;
      }

      if(currency && newCurrency && currency.id === newCurrency.id) {
        return parseFloat(amount);
      }

      if(!currency || !newCurrency || !amount || amount <= 0 || !userExchange){
        if(!ifProd()) {
          console.log("error global-functions:1" , currency, "x", newCurrency, amount, userExchange)
        }
        return 0;
      }

      let result = 0;
      // في حال كان التحويل الى عملة الاساس
      if (newCurrency.isBase) {
        let currencyExchange = getCurrencyById(userExchange, currency.id)['prices'][exchangeType];

        if (amount > 0 && currencyExchange && currencyExchange.sell > 0) {
          result = amount / currencyExchange.sell; // 1000 dollar
        }
      }
      // في حال كان التحويل من عملة الاساس الى عملة ثانية
      else if (currency.isBase) {
        let currencyExchange = getCurrencyById(userExchange, newCurrency.id)['prices'][exchangeType];
        if (amount > 0 && currencyExchange.buy > 0) {
          result = amount * currencyExchange.buy; // 1000 euro
        }
      }
      // في حال كان تحويل من عملة الى عملة اخرى ليست عملة الاساس
      else {
        let baseCurrency = objectToArray(userExchange).filter(c => c.isBase)[0];

        let amountInBaseCurrency = toCurrency(amount, currency, userExchange, baseCurrency, exchangeType);
        if(amountInBaseCurrency) {
          result = toCurrency(amountInBaseCurrency, baseCurrency, userExchange, newCurrency, exchangeType);
        }
        else {
          return 0;
        }
      }
      return Math.round(result * 100) / 100; // 100 is round 2
    }

    window.getCurrencyById = function (userExchange, currencyId) {
        let list = objectToArray(userExchange).filter(c => c.id === currencyId);
        if(list.length > 0) {
          return list[0];
        }
        return null;
    }

    window.toCurrencyAPI = async function(amount, currency, newCurrency, exchangeType) {
      if (amount <= 0) { // التاكد من ان المبلغ قابل لتحويل
        return 0;
      }

      if(currency && newCurrency && currency.id === newCurrency.id) {
        return parseFloat(amount);
      }

      if(!currency || !newCurrency || !amount || amount <= 0){
        if(!ifProd()) {
          console.log("error global-functions:1" , currency, newCurrency, amount, exchangeType)
        }
        return 0;
      }

      return $axios.$get(
        'currency/' +
        amount + '/' +
        currency.id + '/' +
        newCurrency.id + '/' +
        exchangeType +
        '/toCurrency'
      ).then(data => {
        return data.result.newAmount
      })
    }

    window.exchangeCurrencyPrice = function (firstAmount, secondaryAmount, text = 'سعر الصرف: ')
    {
        if(!firstAmount || !secondaryAmount) {
          return '';
        }
        if(firstAmount > secondaryAmount) {
          return text + (firstAmount / secondaryAmount).toBalance(3)
        }else {
          return text + (secondaryAmount / firstAmount).toBalance(3)
        }
    }

    Number.prototype.toBalance = function (decimalCount = 2, currency = null, decimal = ".", thousands = ",", HideDecimal = true)
    {
      // example to use Parameters   console.log("result: ", b2.toBalance(1, ' USD', undefined,undefined, true))
      let amount = this.valueOf();

      if (amount % 1 === 0 && HideDecimal) { // ليس لديه فواصل
        decimalCount = 0;
      }

      try {

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        amount = negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch {}

      if(currency) {
        return amount + ' ' + currency
      }
      return amount;
    }

    String.prototype.format = function() {
      let a = this;
      for (let k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
      }
      return a
    }
}
