// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import '@/assets/css/materialize.min.css'
import '@/assets/jquery-3.3.1.js'
import '@/assets/materialize.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
