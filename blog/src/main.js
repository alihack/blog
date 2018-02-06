// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router"
import { Container,Header,Aside,Main,Footer,Message,Button,Input,Badge,Notification,Carousel,
  CarouselItem,tag} from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
import '../static/fonts/alibaba/iconfont.css'
import '../static/css/animate.min.css'
import '../static/scss/style.scss'
import Vuex from 'vuex'
import store from '../src/store'
import qs from 'qs'
import elTitleHeader from '../src/components/admin/title_header'
import elSidebar from '../src/components/admin/sidebar'
import elConfirmCancel from '../src/components/admin/confirm-cancel'
import axios from 'axios'
import VueSimplemde from 'vue-simplemde'
import router from './router'
import 'simplemde-theme-base/dist/simplemde-theme-base.min.css'



Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueSimplemde)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Container)
Vue.use(Button)
Vue.use(Input)
Vue.use(Badge)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(tag)


Vue.component('elSidebar', elSidebar)
Vue.component('elConfirmCancel', elConfirmCancel)
Vue.component('elTitleHeader', elTitleHeader)
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$help = new Vue();

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
