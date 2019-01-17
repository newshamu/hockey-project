import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: colors.blueGrey,
    secondary: colors.blueGrey.lighten4,
    accent: colors.cyan.darken2,
    error: colors.red.accent3
  }
})

Vue.use(Vuetify, {
  iconfont: 'fa4' || 'mdi'
 })

new Vue({
  render: h => h(App),
}).$mount('#app')
