<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created(){
    this.$store.commit("GET_PRODUCTS",1);
    this.$store.commit('GET_CATEGORIES')
  },
  
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
#app {
  font-family: 'Raleway', sans-serif;
}
</style>
