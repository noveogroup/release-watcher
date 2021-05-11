import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import { Button, Input } from 'element-ui'

console.log(router)

Vue.use(Button)
Vue.use(Input)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
