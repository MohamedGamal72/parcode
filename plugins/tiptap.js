import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
// don't forget to import styles
import 'tiptap-vuetify/dist/main.css'
import Vue from 'vue'
import Vuetify from 'vuetify'

// first it
Vue.use(Vuetify)
// AFTER Vue.use(Vuetify) !!!
Vue.use(TiptapVuetifyPlugin, {
    // optional, default to 'md' (default vuetify icons before v2.0.0)
    iconsGroup: 'md',
})