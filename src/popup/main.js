import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import {
  Button,
  ButtonGroup,
  Link,
  Input,
  Switch,
  Select,
  Option,
  Collapse,
  CollapseItem,
  RadioGroup,
  RadioButton,
  Badge,
  Pagination,
  Slider
} from 'element-ui'

const components = {
  Button,
  ButtonGroup,
  Link,
  Input,
  Switch,
  Select,
  Option,
  Collapse,
  CollapseItem,
  RadioGroup,
  RadioButton,
  Badge,
  Pagination,
  Slider
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
