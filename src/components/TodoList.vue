<template>
  <div class="todo-list">
    <draggable
      class="todo-list__inner"
      v-model="list"
      @end="onEnd"
      handle=".todo-item__handle"
    >
      <todo-item
        v-for="todo in list"
        :key="todo.id"
        :todo="todo"
        @toggle="$emit('toggle', todo)"
        @edit="$emit('edit', todo)"
        @delete="$emit('delete', todo.id)"
      />
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TodoItem from "./TodoItem.vue";

export default {
  name: "TodoList",
  components: { draggable, TodoItem },
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    list: {
      get() {
        return this.todos;
      },
      set(value) {
        this.$emit("reorder", value);
      },
    },
  },
  methods: {
    onEnd() {
      this.$store.dispatch("todos/reorder", this.list);
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-list {
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
