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
          :key="tab"
          :class="{ active: currentTab === tab }"
          type="button"
          @click="currentTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <keep-alive>
        <component :is="currentTabComponent" />
      </keep-alive>
    </InfoCard>
  </section>
</template>

<script>
import BaseButton from '../components/common/BaseButton.vue'
import InfoCard from '../components/common/InfoCard.vue'
import TodoItem from '../components/common/TodoItem.vue'

const ThemeBadge = {
  name: 'ThemeBadge',
  inject: ['themeName'],
  template: '<p class="badge">Injected theme: {{ themeName }}</p>'
}

const NotesTab = {
  name: 'NotesTab',
  data() {
    return {
      note: ''
    }
  },
  template: '<input v-model="note" placeholder="This value is kept alive" />'
}

const StatsTab = {
  name: 'StatsTab',
  template: '<p class="meta">Switch tabs and the notes input keeps its state.</p>'
}

export default {
  name: 'ComponentsView',
  components: {
    BaseButton,
    InfoCard,
    TodoItem,
    ThemeBadge,
    NotesTab,
    StatsTab
  },
  provide() {
    return {
      themeName: 'Classic Vue 2'
    }
  },
  data() {
    return {
      newTodo: '',
      currentTab: 'Notes',
      tabs: ['Notes', 'Stats'],
      todos: [
        { id: 1, text: 'Learn props', done: true },
        { id: 2, text: 'Emit events', done: false },
        { id: 3, text: 'Use slots', done: false }
      ]
    }
  },
  computed: {
    doneCount() {
      return this.todos.filter(todo => todo.done).length
    },
    currentTabComponent() {
      return `${this.currentTab}Tab`
    }
  },
  methods: {
    addTodo() {
      if (!this.newTodo) return

      this.todos.push({
        id: Date.now(),
        text: this.newTodo,
        done: false
      })
      this.newTodo = ''
    },
    toggleTodo(id) {
      const todo = this.todos.find(item => item.id === id)
      if (todo) todo.done = !todo.done
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    }
  }
}
</script>
