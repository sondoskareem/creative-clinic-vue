import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Login from './components/Login'

import Patients from './components/Patient/Patients'
import AddPatient from './components/Patient/AddPatient'

import News from './components/News/News'
import AddNews from './components/News/AddNews'




import VueCookies from 'vue-cookies'


Vue.use(VueCookies)
Vue.use(vueResource)
Vue.use(VueRouter)

import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path:'/', component: Login},
    {path: '/patients', component: Patients},
    {path: '/addPatient', component: AddPatient},
    {path: '/news', component: News},
    {path: '/addNews', component: AddNews}
  ]
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
