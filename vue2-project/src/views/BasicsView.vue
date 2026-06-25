<template>
  <section class="stack">
    <InfoCard title="Template Syntax">
      <p>{{ message }}</p>
      <p v-text="message"></p>
      <p v-html="htmlMessage"></p>
    </InfoCard>

    <InfoCard title="Directives">
      <div class="form-row">
        <input v-model.trim="message" placeholder="Edit message" />
        <BaseButton @click="visible = !visible">Toggle</BaseButton>
      </div>

      <p v-if="visible">v-if is rendering this line.</p>
      <p v-show="visible">v-show is displaying this line.</p>

      <ul class="tag-list">
        <li v-for="item in filteredItems" :key="item.id" :class="{ active: item.active }">
          {{ item.name }}
        </li>
      </ul>
    </InfoCard>

    <InfoCard title="Computed And Watch">
      <div class="form-row">
        <input v-model.number="price" type="number" min="0" />
        <input v-model.number="quantity" type="number" min="1" />
      </div>
      <p>Total: {{ total | currency }}</p>
      <p class="meta">{{ watchLog }}</p>
    </InfoCard>

    <InfoCard title="Lifecycle, Ref, Directive">
      <div class="form-row">
        <input ref="focusInput" v-focus v-model="name" placeholder="Autofocus input" />
        <BaseButton @click="focusName">Focus</BaseButton>
      </div>
      <p>Hello, {{ displayName }}</p>
      <p class="meta">Mounted at: {{ mountedAt }}</p>
    </InfoCard>
  </section>
</template>

<script>
import BaseButton from '../components/common/BaseButton.vue'
import InfoCard from '../components/common/InfoCard.vue'

export default {
  name: 'BasicsView',
  components: {
    BaseButton,
    InfoCard
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  },
  filters: {
    currency(value) {
      return `$${Number(value || 0).toFixed(2)}`
    }
  },
  data() {
    return {
      message: 'Vue 2 template data',
      htmlMessage: '<strong>v-html renders trusted HTML.</strong>',
      visible: true,
      price: 12,
      quantity: 2,
      name: '',
      mountedAt: '',
      watchLog: 'Change price or quantity to trigger watch.',
      items: [
        { id: 1, name: 'v-bind', active: true },
        { id: 2, name: 'v-on', active: true },
        { id: 3, name: 'v-model', active: false }
      ]
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item.name.includes('v-'))
    },
    total() {
      return this.price * this.quantity
    },
    displayName() {
      return this.name || 'Vue learner'
    }
  },
  watch: {
    total(newValue, oldValue) {
      this.watchLog = `Total changed from ${oldValue} to ${newValue}.`
    }
  },
  mounted() {
    this.mountedAt = new Date().toLocaleTimeString()
  },
  methods: {
    focusName() {
      this.$refs.focusInput.focus()
    }
  }
}
</script>
