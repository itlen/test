<template>
  <header class="app-header">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/carusel">Carusel</router-link> |
      <router-link to="/weather">Weather</router-link> |
      <router-link to="/contacts">Contacts</router-link>
    </nav>
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'app-header'
}
</script>

<style scoped>
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  nav {
    padding: 32px 0;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
