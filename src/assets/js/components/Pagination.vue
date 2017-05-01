<template lang="html">
<div id="app">
  <ul class="pagination">
    <li>
      <router-link class="btn btn-info" :to="{ name: 'repoList',params: { page: prevPage }}">
        Previous
      </router-link>
    </li>
<!--
    <li v-for="n in 4">
      <router-link class="btn btn-info" :to="{ name: 'repoList',params: { page:  currentPage + n }}">
       {{ currentPage + n }}
      </router-link>
    </li>
-->
    <li v-if="itemNrOnPage == itemPerPage">
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
    currentPage: {
      type : Number,
      default: 1
    },
    itemPerPage: {
      type : Number,
      default: 10
    },
    itemNrOnPage: {
      type : Number,
      default: 10
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
