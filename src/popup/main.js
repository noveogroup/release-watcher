import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import {
  Button,
  Input,
  Switch,
  Select,
  Option,
  Collapse,
  CollapseItem,
  RadioGroup,
  RadioButton,
  Badge,
  Pagination
} from 'element-ui'

const components = {
  Button,
  Input,
  Switch,
  Select,
  Option,
  Collapse,
  CollapseItem,
  RadioGroup,
  RadioButton,
  Badge,
  Pagination
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
