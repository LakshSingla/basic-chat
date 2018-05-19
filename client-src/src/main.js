// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import 'materialize-css/dist/css/materialize.min.css';
import jQuery from 'jquery/dist/jquery.js';
import M from 'materialize-css/dist/js/materialize.min.js';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
