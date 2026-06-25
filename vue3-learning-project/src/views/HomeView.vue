<template>
  <section class="panel">
    <p class="eyebrow">Vue Router 4 + Pinia</p>
    <h1>Home</h1>
    <p class="intro">
      This page uses Vue 3 Composition API with Vue Router and Pinia.
    </p>

    <div class="counter">
      <BaseButton @click="counter.decrement">-</BaseButton>
      <span>{{ counter.value }}</span>
      <BaseButton @click="counter.increment">+</BaseButton>
    </div>

    <p class="meta">Double value: {{ counter.doubleValue }}</p>
  </section>
</template>

<script setup>
import BaseButton from '../components/common/BaseButton.vue'
import { useCounterStore } from '../store/counter'

const counter = useCounterStore()
</script>
