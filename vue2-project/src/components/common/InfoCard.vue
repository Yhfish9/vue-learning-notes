<template>
  <article class="info-card">
    <h2>{{ title }}</h2>
    <slot />
    <footer v-if="$slots.footer" class="info-card__footer">
      <slot name="footer" />
    </footer>
  </article>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
