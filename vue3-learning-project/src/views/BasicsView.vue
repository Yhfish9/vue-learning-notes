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
      <p>Total: {{ currency(total) }}</p>
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

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import BaseButton from '../components/common/BaseButton.vue'
import InfoCard from '../components/common/InfoCard.vue'

const vFocus = {
  mounted(el) {
    el.focus()
  }
}

const message = ref('Vue 3 template data')
const htmlMessage = ref('<strong>v-html renders trusted HTML.</strong>')
const visible = ref(true)
const price = ref(12)
const quantity = ref(2)
const name = ref('')
const mountedAt = ref('')
const watchLog = ref('Change price or quantity to trigger watch.')
const focusInput = ref(null)
const items = ref([
  { id: 1, name: 'v-bind', active: true },
  { id: 2, name: 'v-on', active: true },
  { id: 3, name: 'v-model', active: false }
])

const filteredItems = computed(() => items.value.filter(item => item.name.includes('v-')))
const total = computed(() => price.value * quantity.value)
const displayName = computed(() => name.value || 'Vue learner')

watch(total, (newValue, oldValue) => {
  watchLog.value = `Total changed from ${oldValue} to ${newValue}.`
})

onMounted(() => {
  mountedAt.value = new Date().toLocaleTimeString()
})

function focusName() {
  focusInput.value.focus()
}

function currency(value) {
  return `$${Number(value || 0).toFixed(2)}`
}
</script>
