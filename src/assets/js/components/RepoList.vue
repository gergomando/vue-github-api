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
          <div class="row">
            <div class="col-sm-6" v-for="(item,key) in user.repositories">
              <div class="list-body-item">
                <div class="link">
                  <router-link :to="{ name: 'repoSingle', params: { repoName: item.name }}" >
                     {{ trimString( item.name ) }} 
                  </router-link>
                </div>
                <div class="description">
                  <p> {{ trimString( item.description ) }} </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="paginationLinks.last > 1">
            <pagination :links="paginationLinks"></pagination>
          </div>
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
      default: function() { 
        return { name : 'addyosmani' , repositories : [] } 
      }
    }, 
    api : new Object()
  },
  data :function () {
    return {
      loading : true,
      headerLink: {
        type: String
      },
    }
  },
  computed: {
    hasPage : function() {
      return this.$route.params && !isNaN(this.$route.params.page) ? true : false
    },
    currentPage : function() {
      return this.hasPage ? parseInt(this.$route.params.page) : 1
    },
    resourceUrl: function () {
      this.api.user = this.user
      this.api.pagination = { limit : 6, current : this.currentPage }
     
      return this.api.makeUrl('userRepositories')
    },
    paginationLinks : function() {
      if(typeof this.headerLink !== 'string')
        return false

      let links = this.api.parseHeader(this.headerLink)
      links.current = this.currentPage
      links.last = (links.last || links.current)
      return links
    },
  },
  watch: {
    $route: function (route) {
      return this.getResource()
    }
  },
  methods : {
    getResource: function () {
      let self = this

      fetch(self.resourceUrl)
        .then(res =>  {
          self.headerLink = res.headers.get('Link')
          return res.json()
        })
        .then(function(data) {
         self.user.repositories = data
         self.loading = false
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    trimString : function(string,limit) {
      if(typeof string !== 'string')
        return 

      limit = (limit || 100)
      
      if(string.length < limit)
        return string
      else
        return string.substr(0,limit).concat("...")

    }
  },
  mounted() {
    this.getResource()
  }
}
</script>
