<template>
  <button class="base-button" type="button" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>
