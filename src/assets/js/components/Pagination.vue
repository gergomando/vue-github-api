<template lang="html">
<div id="app">
  <ul class="pagination" >
    <li>
      <router-link class="btn btn-info" :to="{ name: 'repoList',params: { page: links.prev }}">
        Previous
      </router-link>
    </li>

    <li v-for="link in offsetLinks" >
      <router-link class="btn btn-info" :to="{ name: 'repoList',params: { page:link}}">
       {{ link }}
      </router-link>
    </li>

    <li v-show="links.current < links.last">
      <router-link class="btn btn-info" :to="{ name: 'repoList', params: { page: links.next }}">
        Next
      </router-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    links : {
      type: Object,
      default : function(){
        return {
          last  : 1,
          first : 1,
          prev  : 1,
          next  : 1,
          current:1
        }
      },
    },
  },
  data : function() {
    return {
      offset : 4
    }
  },
  computed: {
    offsetLinks: function() {
      let links = new Array

      for(let n = 0; n < this.offset; n++) {
        let link = new Number()
        
        if(this.links.current + this.offset > this.links.last)
          link = ((this.links.last - this.offset) + n) + 1
        else
         link = this.links.current + n
        links.push(link)        
      }
      return links
    }
  }
}
</script>
