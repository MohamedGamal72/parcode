import Vue from 'vue';

import user from './userApi'
import security from './securityApi';
import transfer from './transferApi';
import creditTransfer from './creditTransferApi';
import leveling from './levelingApi';
import home from './homeApi';
import countingBox from './countingBoxApi';
import box from './boxApi';
import commission from './commission';
import account from './account';
import currency from './CurrencyApi';
import profits from './profitsApi';
import report from './reportApi';
import currencyExchange from './currencyExchangeApi';
import position from './positionApi';
import cities from './citiesApi';
import countries from './countriesApi';
import limitCountryCurrency from './limitCountryCurrencyApi';

export default ({ $axios }) => {
  let requestProperties = (object) => {
    let result = '?';
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        if(key === 'groups') {
          result += 'groups[]=' + object[key]
        }else {
          result += '&properties[]=' + key
        }
      }
    }
    return result;
  }

  let requestGroups = (object) => {
    let result = '?';
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        if(Array.isArray(object[key])) {
            object[key].map(i => {
              result += '&'+ key + '=' + i
            })
        }
        else {
          result += '&'+ key + '=' + object[key]
        }
      }
    }
    return result;
  }

  Vue.prototype.api = {
    security: security($axios),
    user: user($axios),
    transfer: transfer($axios),
    creditTransfer: creditTransfer($axios),
    leveling: leveling($axios),
    countingBox: countingBox($axios),
    currency: currency($axios),
    box: box($axios),
    profits: profits($axios),
    report: report($axios),
    home: home($axios),
    currencyExchange: currencyExchange($axios),
    commission: commission($axios),
    account: account($axios, requestGroups),
    position: position($axios),
    cities: cities($axios, requestProperties),
    countries: countries($axios, requestProperties),
    limitCountryCurrency: limitCountryCurrency($axios),
    requestProperties: requestProperties,
  }

  Vue.prototype.$api = Vue.prototype.api;
};
