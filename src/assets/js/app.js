import 'jquery'
import 'bootstrap-sass'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import RepoList from './components/RepoList.vue'
import RepoSingle from './components/RepoSingle.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
    { path: '/', name: 'home', component: RepoList,},
    { path: '/repos/page/:page', name: 'repoList', component: RepoList },
    { path: '/repo/:repoName', name: 'repoSingle', component: RepoSingle }
]

const router = new VueRouter({
    routes // short for routes: routes,
})

const app = new Vue({
  router,
  data: {
  	app : {name : 'Test Project'},
    user: { name : 'addyosmani' , repositories : [] },
  }
});


app.$mount('#app');
