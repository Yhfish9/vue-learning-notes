<template>
  <section class="panel">
    <p class="eyebrow">Vue Router + Vuex</p>
    <h1>Home</h1>
    <p class="intro">
      This page is rendered by vue-router. The counter value comes from a Vuex module.
    </p>

    <div class="counter">
      <BaseButton @click="decrement">-</BaseButton>
      <span>{{ count }}</span>
      <BaseButton @click="increment">+</BaseButton>
    </div>

    <p class="meta">Double value: {{ doubleValue }}</p>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import BaseButton from '../components/common/BaseButton.vue'

export default {
  name: 'HomeView',
  components: {
    BaseButton
  },
  computed: {
    ...mapState('counter', {
      count: state => state.value
    }),
    ...mapGetters('counter', ['doubleValue'])
  },
  methods: {
    ...mapActions('counter', ['increment', 'decrement'])
  }
}
</script>
