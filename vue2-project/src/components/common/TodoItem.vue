<template>
  <li class="todo-item" :class="{ 'todo-item--done': todo.done }">
    <label>
      <input :checked="todo.done" type="checkbox" @change="$emit('toggle', todo.id)" />
      <span>{{ todo.text }}</span>
    </label>
    <button type="button" @click="$emit('remove', todo.id)">Remove</button>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>
