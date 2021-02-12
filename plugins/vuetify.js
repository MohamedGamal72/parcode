
/* مهم جدا تفعيل السطر التالي , لانه سيقراً المتغيرات */
import Vuetify from 'vuetify/lib/framework'

import colors from "vuetify/es5/util/colors";
import ar from 'vuetify/src/locale/ar.ts'
import en from 'vuetify/src/locale/en.ts'

let themes = {
  light: {
    primary: '#27ae60',
      secondary: '#424242',
      accent: '#fff', // الخانة الفعالة
      anchor: '#fff',
      backGround: '#f7f7f8',
      error: '#f44336',
      danger: '#f44336',
      warning: '#ff9800',
      info: '#00acbf',
      success: '#3ba659',
      black1: '#444',
      black2: '#181818',
      minusBalance: '#fe423e',
      plusBalance: '#00b003',
      topbar: '#27ae60',
      blackText: '#444',
      operationState0: '#e74c3c',
      operationState1: '#e74c3c',
      operationState2: '#e74c3c',
      operationState10: '#95a5a6',
      operationState20: '#2ecc71',
      operationState30: '#3498db',
      operationState40: '#3498db',
  },
  dark: {
    primary: '#424242',
      secondary: '#424242',
      accent: '#ffffff',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
  },
};

if(process.env.COMPANY_ID === "2") {
    themes.light.primary = '#258096';
    themes.light.secondary = '#424242';
    themes.light.accent = '#fff';
    themes.light.topbar = '#258096';
}

export default {
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
    },
  },
  icons: {
    iconfont: 'mdi',
    values: {},
  },
  lang: {
    current: 'ar',
    locales: { ar, en },
    // t: undefined as any,
  },
  rtl: true,
  theme: {
    dark: false,
    default: 'light',
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: true,
      minifyTheme: undefined,
      themeCache: undefined,
    },
    themes: themes,
  }
}
