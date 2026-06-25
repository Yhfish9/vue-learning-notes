import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    value: 0
  }),
  getters: {
    doubleValue: state => state.value * 2
  },
  actions: {
    increment() {
      this.value += 1
    },
    decrement() {
      this.value -= 1
    }
  }
})
