import Vue from 'vue'
import Router from 'vue-router'


import Intro from '../pages/intro.vue'
import Home from '../pages/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
       {
            path: '/', 
            component: Intro, 
       },
       {
            path: '/home', 
            component: Home
       },
  ]
})
