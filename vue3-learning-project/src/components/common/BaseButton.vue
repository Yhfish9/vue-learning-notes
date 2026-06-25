<template>
  <button class="base-button" type="button" @click="emit('click', $event)">
    <slot />
  </button>
</template>

<script setup>
const emit = defineEmits(['click'])
</script>
