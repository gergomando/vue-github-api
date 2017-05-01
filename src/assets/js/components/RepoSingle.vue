<template lang="html">
<div id="app">
 <h2 class="page-header">{{ $route.params.repoName }}</h2>
  <div class="row">
    <div class="col-sm-12">
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
  },
 
}
</script>
