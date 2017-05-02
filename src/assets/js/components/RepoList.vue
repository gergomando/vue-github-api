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

          <pagination :links="paginationLinks"></pagination>
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
      itemPerPage: 10,
      link: ''
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
    paginationLinks : function() {
      return this.parseApiLink(this.link)
    }
  },
  watch: {
    $route: function (route) {
      return this.getRepositories()
    }
  },
  methods : {
    parseApiLink : function(link) {
      let parsedObject = {};
      
      parsedObject = link.split(', ').reduce(function (result, part) {
        var match = part.match('<(.*?)>; rel="(.*?)"')

        if (match && match.length === 3) {
          result[match[2]] = parseInt(match[1].split('&page=')[1])
        }
        return result
      }, {})

      parsedObject.prev = parsedObject.prev ? parsedObject.prev : 1
      parsedObject.current = parsedObject.prev + 1
      parsedObject.last = parsedObject.last ? parsedObject.last : parsedObject.current
      
      return parsedObject
    },
    getRepositories: function () {
      let self = this

      fetch(this.apiUrl)
        .then(res =>  {
          self.link = res.headers.get('Link')
          return res.json()
        })
        .then(function(data) {
         self.user.repositories = data
         self.loading = false
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getRepositories()
  }
}
</script>
