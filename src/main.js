import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: colors.teal,
    secondary: colors.teal.lighten4,
    accent: colors.orange.accent4,
    error: colors.red.accent3
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
