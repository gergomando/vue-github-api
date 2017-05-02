<template lang="html">
<div id="app">
 <h2 class="page-header">{{ $route.params.repoName }}</h2>
  <div class="row">
    <div class="col-sm-12">
      id : {{ repo.id }} , <br/>
      full_name :{{ repo.full_name }}
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: {}
    }, 
    api: new Object()
  },
  data : function(){
    return {
      repo : new Object()
    }
  },
  computed: {
    resourceUrl: function () {
      this.api.user = this.user
      this.api.pagination = false
      this.api.urlParams = {'repoName' : this.$route.params.repoName }
      return this.api.makeUrl('userRepo')
    },
  },
  methods : {
    getResource: function () {
      let self = this

      fetch(self.resourceUrl)
        .then(res =>  {
          return res.json()
        })
        .then(function(data) {
         self.repo = data
         self.loading = false
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getResource()
  }
}
</script>
