<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'app',
  components: {
    AppHeader
  }
}

</script>

<style>

  body {
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    background-color: crimson;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    margin-top: 0;
  }

</style>
