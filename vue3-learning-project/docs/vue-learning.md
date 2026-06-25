# Vue 2 项目知识点总结与 Vue 3 对照

这份文档基于旁边的 `vue2-project`，并配套当前 `vue3-learning-project` 中的 Vue 3 + Pinia 重写版本。

## 1. 项目入口

Vue 2 使用 `new Vue()`：

```js
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

Vue 3 使用 `createApp()`：

```js
createApp(App).use(router).use(createPinia()).mount('#app')
```

核心变化是：Vue 3 不再通过构造函数创建根实例，而是创建一个 app 实例，再逐个安装插件。

## 2. 单文件组件

Vue 2 示例主要使用 Options API：

```js
export default {
  data() {},
  computed: {},
  methods: {},
  mounted() {}
}
```

Vue 3 项目使用 `<script setup>`：

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
</script>
```

`<script setup>` 会自动把顶层变量、函数和导入的组件暴露给模板。

## 3. 响应式数据

Vue 2 使用 `data()` 返回对象：

```js
data() {
  return {
    message: 'hello'
  }
}
```

Vue 3 使用 `ref()` 或 `reactive()`：

```js
const message = ref('hello')
```

在模板里会自动解包，可以直接写 `{{ message }}`；在 JS 里访问或修改要使用 `message.value`。

## 4. 模板语法和指令

两个项目都覆盖了这些基础：

- `{{ message }}`：文本插值
- `v-text`：设置文本内容
- `v-html`：渲染 HTML 字符串
- `v-if`：条件渲染，控制节点是否存在
- `v-show`：条件显示，控制 CSS display
- `v-for`：列表渲染
- `:class`：动态 class
- `@click`：事件监听
- `v-model`：表单双向绑定
- `.trim`、`.number`：`v-model` 修饰符

## 5. computed

Vue 2：

```js
computed: {
  total() {
    return this.price * this.quantity
  }
}
```

Vue 3：

```js
const total = computed(() => price.value * quantity.value)
```

computed 适合声明“由已有数据推导出来的数据”，并且带缓存。

## 6. watch

Vue 2：

```js
watch: {
  total(newValue, oldValue) {}
}
```

Vue 3：

```js
watch(total, (newValue, oldValue) => {})
```

watch 适合监听数据变化后做副作用，比如请求接口、写日志、同步状态。

## 7. 生命周期

Vue 2：

```js
mounted() {}
```

Vue 3：

```js
onMounted(() => {})
```

常见对照：

- `beforeCreate` / `created`：Vue 3 中多数初始化逻辑直接写在 `setup`
- `mounted`：`onMounted`
- `updated`：`onUpdated`
- `beforeDestroy`：`onBeforeUnmount`
- `destroyed`：`onUnmounted`

## 8. ref 操作 DOM

Vue 2：

```js
this.$refs.focusInput.focus()
```

Vue 3：

```js
const focusInput = ref(null)
focusInput.value.focus()
```

模板中写法类似：

```vue
<input ref="focusInput" />
```

## 9. 自定义指令

Vue 2 指令钩子：

```js
directives: {
  focus: {
    inserted(el) {
      el.focus()
    }
  }
}
```

Vue 3 指令钩子：

```js
const vFocus = {
  mounted(el) {
    el.focus()
  }
}
```

在 `<script setup>` 中，以 `v` 开头的变量可以直接作为局部指令使用，比如 `vFocus` 对应模板里的 `v-focus`。

## 10. filters 的变化

Vue 2 支持过滤器：

```vue
{{ total | currency }}
```

Vue 3 移除了 filters，推荐使用普通函数或 computed：

```vue
{{ currency(total) }}
```

## 11. props

Vue 2：

```js
props: {
  title: {
    type: String,
    required: true
  }
}
```

Vue 3 `<script setup>`：

```js
defineProps({
  title: {
    type: String,
    required: true
  }
})
```

props 用来让父组件向子组件传数据。

## 12. emit

Vue 2：

```vue
<button @click="$emit('remove', id)">Remove</button>
```

Vue 3：

```js
const emit = defineEmits(['remove'])
emit('remove', id)
```

emit 用来让子组件向父组件发送事件。

## 13. slot

默认插槽：

```vue
<slot />
```

具名插槽：

```vue
<slot name="footer" />
```

使用时：

```vue
<InfoCard title="Demo">
  <p>默认插槽内容</p>

  <template #footer>
    footer 插槽内容
  </template>
</InfoCard>
```

没有名字的内容进入默认插槽，有名字的内容进入对应具名插槽。

## 14. provide / inject

Vue 2：

```js
provide() {
  return {
    themeName: 'Classic Vue 2'
  }
}
```

Vue 3：

```js
provide('themeName', 'Modern Vue 3')
const themeName = inject('themeName')
```

适合跨层级传递稳定数据，比如主题、配置、上下文对象。

## 15. 动态组件和 keep-alive

动态组件：

```vue
<component :is="currentTabComponent" />
```

缓存组件状态：

```vue
<keep-alive>
  <component :is="currentTabComponent" />
</keep-alive>
```

`keep-alive` 常用于 tab 页、表单步骤、缓存列表状态。

## 16. Vue Router

Vue 2 使用 Vue Router 3：

```js
Vue.use(VueRouter)
new VueRouter({ mode: 'history', routes })
```

Vue 3 使用 Vue Router 4：

```js
createRouter({
  history: createWebHistory(),
  routes
})
```

页面出口仍然是：

```vue
<router-view />
```

导航仍然可以使用：

```vue
<router-link to="/basics">Basics</router-link>
```

## 17. Vuex 与 Pinia

Vue 2 项目使用 Vuex 3：

```js
export default {
  namespaced: true,
  state: () => ({ value: 0 }),
  getters: {},
  mutations: {},
  actions: {}
}
```

Vue 3 项目改用 Pinia，这是现在 Vue 官方更推荐的状态管理方案：

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ value: 0 }),
  getters: {
    doubleValue: state => state.value * 2
  },
  actions: {
    increment() {
      this.value += 1
    }
  }
})
```

Vue 3 组件里这样使用：

```js
const counter = useCounterStore()
counter.increment()
```

Pinia 没有 `mutations`，同步和异步逻辑都可以写在 `actions` 里。组件中访问状态也更直接，比如 `counter.value`、`counter.doubleValue`。

## 18. Vue 2 到 Vue 3 的核心迁移记忆

- `new Vue()` 改为 `createApp()`
- `Vue.use()` 改为 `app.use()`
- `new VueRouter()` 改为 `createRouter()`
- Vue 3 状态管理推荐 Pinia，常用 `defineStore`
- filters 被移除，改用函数或 computed
- `this.$refs.xxx` 改为模板 ref + `ref(null)`
- Options API 可继续用，但推荐学习 Composition API
- `$emit` 仍然存在，但 `<script setup>` 中推荐 `defineEmits`
- props 仍然存在，但 `<script setup>` 中推荐 `defineProps`

## 19. 推荐学习顺序

1. 先看 `src/views/BasicsView.vue`
2. 再看 `src/components/common/BaseButton.vue`
3. 再看 `src/components/common/InfoCard.vue`
4. 再看 `src/views/ComponentsView.vue`
5. 最后看 `src/router/index.js` 和 `src/store/counter.js`
