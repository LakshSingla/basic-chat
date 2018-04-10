import Vue from 'vue'
import Router from 'vue-router'


import Intro from '../pages/intro.vue'

Vue.use(Router)

export default new Router({
  routes: [
       {
            path: '/', 
            component: Intro, 
       } 
  ]
})
