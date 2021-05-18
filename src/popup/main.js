import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import {
  Button,
  Input,
  Switch,
  Select,
  Option
} from 'element-ui'

const components = {
  Button: Button,
  Input: Input,
  Switch: Switch,
  Select: Select,
  Option: Option
}

Object.keys(components).forEach(key => {
  Vue.use(components[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
