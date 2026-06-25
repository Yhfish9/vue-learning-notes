<template>
  <header class="app-header">
    <router-link class="brand" to="/">Vue 2 Project</router-link>
    <nav class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/basics">Basics</router-link>
      <router-link to="/components">Components</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>
