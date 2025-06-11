<template>
  <div class="todo-item" :class="{ 'todo-item--done': todo.completed }">
    <span class="todo-item__handle">
      <span class="todo-item__handle-bar"></span>
      <span class="todo-item__handle-bar"></span>
      <span class="todo-item__handle-bar"></span>
    </span>

    <input
      class="todo-item__checkbox"
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle')"
    />
    <span class="todo-item__title" @dblclick="$emit('edit')">
      {{ todo.title }}
    </span>
    <button
      class="todo-item__btn todo-item__btn--delete"
      @click="$emit('delete')"
    >
      ✕
    </button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";

.todo-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;

  &--done {
    .todo-item__title {
      text-decoration: line-through;
      color: #999;
    }
  }

  &__handle {
    cursor: move;
    margin-right: 16px;
  }

  &__checkbox {
    margin-right: 16px;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }

  &__title {
    flex: 1;
    font-size: 18px;
    cursor: pointer;

    @media (max-width: $bp-md) {
      font-size: 14px;
    }
  }

  &__btn {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 12px 16px;

    &--delete {
      color: #c00;
    }
  }

  &__handle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 14px;
    height: 10px;
    margin-right: 16px;
    cursor: move;

    &-bar {
      display: block;
      width: 100%;
      height: 2px;
      background-color: #666;
    }
  }
}
</style>
