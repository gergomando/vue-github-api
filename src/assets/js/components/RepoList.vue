<template lang="html">
<div class="repository-list">
  <div class="row">
    <div class="col-sm-12 has-loader">
      <h2 class="page-header">
        Repositories by {{ user.name }}
      </h2>
      
      <loader v-if="loading"></loader>
      
      <transition name="fade">
        <div class="list-body" v-if="!loading">
          <ul>
            <li v-for="(item,key) in user.repositories">
              <router-link :to="{ name: 'repoSingle', params: { repoName: item.name }}" >
                {{ item.name }} 
              </router-link>
            </li>
          </ul>
          <pagination 
            :currentPage="currentPage" 
            :itemPerPage="itemPerPage" 
            :itemNrOnPage="user.repositories.length">
          </pagination>
        </div>
      </transition>

    </div>
  </div>
</div>
</template>

<script>
import Pagination from './Pagination.vue'
import Loader from './Loader.vue'

export default {
  components: {
    pagination : Pagination,
    loader : Loader
  },
  props: {
    user: {
      type: Object,
      default: { name : 'addyosmani' , repositories : [] }
    }, 
    api : {
      type : String
    }
  },
  data :function () {
    return {
      loading : true,
      itemPerPage: 10
    }
  },
  computed: {
    hasPage : function() {
      return this.$route.params && !isNaN(this.$route.params.page) ? true : false
    },
    currentPage : function() {
      return this.hasPage ? parseInt(this.$route.params.page) : 1
    },
    apiUrl: function () {
      return this.api + '/users/' + this.user.name + 
        '/repos?per_page='+ this.itemPerPage + '&page=' + this.currentPage
    },
  },
  watch: {
    $route: function (route) {
      return this.getRepositories()
    }
  },
  methods : {
    getRepositories: function () {
      let self = this
      fetch(this.apiUrl)
        .then((resp) => resp.json() )
        .then(function(data) {
          self.user.repositories = data
          self.loading = false
        })
        .catch(function(error) {
          this.errors.push(error)
      })
    }
  },
  mounted() {
    this.getRepositories()
  }
}
</script>
