<template lang="html">
<div id="app">
  <ul class="pagination">
    <li>
      <router-link class="btn btn-info" :to="{ name: 'repoList',params: { page: prevPage }}">
        Previous
      </router-link>
    </li>

    <li v-for="n in 4" >
      <router-link v-if="(currentPage-1) + n < lastPage" class="btn btn-info" :to="{ name: 'repoList',params: { page:  (currentPage-1) + n }}">
       {{ (currentPage-1) + n  }}
      </router-link>
    </li>

    <li v-if="currentPage < lastPage">
      <router-link class="btn btn-info" :to="{ name: 'repoList', params: { page: nextPage }}">
        Next 
      </router-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    lastPage : {
      type: Number,
      default : 1
    },
    currentPage: {
      type : Number,
      default: 1
    }
  },
  computed: {
    nextPage: function() {
      return this.currentPage+1
    },
    prevPage: function() {
      return this.currentPage > 1 ? this.currentPage-1 : 1
    }
  }
}
</script>
