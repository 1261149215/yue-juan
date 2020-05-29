<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    for (const key in sessionStorage){
      if(sessionStorage.hasOwnProperty(key)){
        let d = sessionStorage.getItem(key);
        try{
          d = JSON.parse(d)
          this.$store.commit(key, d);
        } catch(error) {}
      }
    }
  },
}
</script>

<style>
.el-dialog__title {
  color: #67c23a !important;
}
</style>
