<template>
  <main class="page">
    <AppHeader />
    <router-view />
  </main>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>
