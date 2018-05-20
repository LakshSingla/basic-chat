import Vue from 'vue'
import Router from 'vue-router'


import Intro from '../pages/intro.vue'
import Home from '../pages/home.vue'
import Chat from '../pages/chat.vue'

import CONFIG from '../config'


Vue.use(Router)

export default new Router({
  routes: [
       {
            path: '/', 
            component: Intro, 
       },
       {
            path: '/home', 
            component: Home,
            beforeEnter(to, from, next){
              if(!localStorage.getItem(CONFIG.LOCALSTORAGE_PATH)){
                return next(false);
              }
              next();
            }
       },
       {
         path: '/chat',
         component: Chat,
       }
  ]
})
