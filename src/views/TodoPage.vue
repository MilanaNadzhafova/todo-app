<template>
  <div class="todo">
    <h1>Todo List</h1>

    <filter-bar
      :current-filter="filter"
      @filter="setFilter"
      @search="setSearch"
      @clear-done="clearDone"
    />

    <todo-list
      :todos="filtered"
      @toggle="toggleTodo"
      @edit="openModal"
      @delete="deleteTodo"
      @reorder="onReorder"
    />

    <button class="todo__btn-add" @click="openModal()">
      + Добавить задачу
    </button>

    <todo-modal
      v-if="modalVisible"
      :todo="editing"
      @save="saveTodo"
      @close="modalVisible = false"
    />
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar.vue";
import TodoList from "@/components/TodoList.vue";
import TodoModal from "@/components/modals/TodoModal.vue";

export default {
  name: "TodoPage",
  components: { FilterBar, TodoList, TodoModal },
  data() {
    return {
      modalVisible: false,
      editing: null,
    };
  },
  computed: {
    filter() {
      return this.$store.state.ui.filter;
    },
    filtered() {
      return this.$store.getters["ui/filtered"];
    },
  },
  methods: {
    loadTodos() {
      this.$store.dispatch("todos/load");
    },
    setFilter(filter) {
      this.$store.dispatch("ui/setFilter", filter);
    },
    setSearch(query) {
      this.$store.dispatch("ui/setSearch", query);
    },
    clearDone() {
      this.$store.dispatch("todos/clearDone");
    },
    toggleTodo(todo) {
      this.$store.dispatch("todos/toggle", todo);
    },
    deleteTodo(id) {
      this.$store.dispatch("todos/remove", id);
    },
    openModal(todo = null) {
      this.editing = todo ? { ...todo } : { title: "", completed: false };
      this.modalVisible = true;
    },
    async saveTodo(todo) {
      if (todo.id) {
        await this.$store.dispatch("todos/edit", todo);
      } else {
        await this.$store.dispatch("todos/add", todo.title);
      }
      this.modalVisible = false;
    },
    onReorder(newList) {
      this.$store.commit("todos/SET", newList);
    },
  },
  created() {
    this.loadTodos();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/vars.scss";

.todo {
  max-width: 1024px;
  margin: 0 auto;
  padding: 16px;
  background: #fff;
  border-radius: 4px;

  @media (max-width: $bp-md) {
    max-width: 100%;
  }

  &__btn-add {
    margin-top: 16px;
    background: #007bff;
    color: #fff;
    border: none;
    padding: 12px 20px;
    font-size: 18px;
    cursor: pointer;

    @media (max-width: $bp-md) {
      font-size: 14px;
    }
  }
}
</style>
