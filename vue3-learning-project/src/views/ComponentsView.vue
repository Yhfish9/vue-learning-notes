<template>
  <section class="stack">
    <InfoCard title="Props, Emit, Slots">
      <form class="form-row" @submit.prevent="addTodo">
        <input v-model.trim="newTodo" placeholder="Add todo" />
        <BaseButton @click="addTodo">Add</BaseButton>
      </form>

      <ul class="todo-list">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo"
          @remove="removeTodo"
        />
      </ul>

      <template #footer>
        {{ doneCount }} of {{ todos.length }} finished
      </template>
    </InfoCard>

    <InfoCard title="Provide And Inject">
      <ThemeBadge />
    </InfoCard>

    <InfoCard title="Keep Alive">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.label"
          :class="{ active: currentTab === tab.label }"
          type="button"
          @click="currentTab = tab.label"
        >
          {{ tab.label }}
        </button>
      </div>
      <keep-alive>
        <component :is="currentTabComponent" />
      </keep-alive>
    </InfoCard>
  </section>
</template>

<script setup>
import { computed, defineComponent, h, inject, provide, ref } from 'vue'
import BaseButton from '../components/common/BaseButton.vue'
import InfoCard from '../components/common/InfoCard.vue'
import TodoItem from '../components/common/TodoItem.vue'

const ThemeBadge = defineComponent({
  name: 'ThemeBadge',
  setup() {
    const themeName = inject('themeName')
    return () => h('p', { class: 'badge' }, `Injected theme: ${themeName}`)
  }
})

const NotesTab = defineComponent({
  name: 'NotesTab',
  setup() {
    const note = ref('')
    return { note }
  },
  template: '<input v-model="note" placeholder="This value is kept alive" />'
})

const StatsTab = defineComponent({
  name: 'StatsTab',
  template: '<p class="meta">Switch tabs and the notes input keeps its state.</p>'
})

provide('themeName', 'Modern Vue 3')

const newTodo = ref('')
const currentTab = ref('Notes')
const tabs = [
  { label: 'Notes', component: NotesTab },
  { label: 'Stats', component: StatsTab }
]
const todos = ref([
  { id: 1, text: 'Learn props', done: true },
  { id: 2, text: 'Emit events', done: false },
  { id: 3, text: 'Use slots', done: false }
])

const doneCount = computed(() => todos.value.filter(todo => todo.done).length)
const currentTabComponent = computed(() => {
  return tabs.find(tab => tab.label === currentTab.value).component
})

function addTodo() {
  if (!newTodo.value) return

  todos.value.push({
    id: Date.now(),
    text: newTodo.value,
    done: false
  })
  newTodo.value = ''
}

function toggleTodo(id) {
  const todo = todos.value.find(item => item.id === id)
  if (todo) todo.done = !todo.done
}

function removeTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}
</script>
