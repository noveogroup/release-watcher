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
  Badge,
  Pagination,
  Slider,
  Popover,
  Popconfirm,
  Tag,
  Divider,
  Form
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
  Badge,
  Pagination,
  Slider,
  Popover,
  Popconfirm,
  Tag,
  Divider,
  Form
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
