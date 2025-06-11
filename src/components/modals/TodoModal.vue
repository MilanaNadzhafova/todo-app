<template>
  <div class="todo-modal">
    <div class="todo-modal__backdrop" @click.self="$emit('close')">
      <div class="todo-modal__dialog">
        <h3 class="todo-modal__heading">
          {{ local.id ? "Редактировать" : "Новая задача" }}
        </h3>
        <input
          v-model="local.title"
          class="todo-modal__input"
          placeholder="Название задачи"
          @keyup.enter="onSave"
        />
        <span v-if="isError" class="todo-modal__error"
          >Название не должно быть пустым</span
        >
        <div class="todo-modal__actions">
          <button
            type="button"
            class="todo-modal__btn todo-modal__btn--cancel"
            @click="$emit('close')"
          >
            Отмена
          </button>
          <button
            type="button"
            class="todo-modal__btn todo-modal__btn--save"
            @click="onSave"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoModal",
  props: {
    todo: {
      type: Object,
      default: () => ({ title: "", completed: false }),
    },
  },
  data() {
    return {
      local: { ...this.todo },
      isError: false,
    };
  },
  watch: {
    todo: {
      immediate: true,
      handler(t) {
        this.local = { ...t };
      },
    },
  },
  methods: {
    onSave() {
      if (!this.local.title.trim()) {
        this.isError = true;
        return;
      }
      this.isError = false;
      this.$emit("save", this.local);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/vars.scss";

.todo-modal {
  &__backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__dialog {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    width: 400px;
    box-sizing: border-box;
  }

  &__heading {
    margin: 0;
    font-size: 22px;
  }

  &__input {
    width: 100%;
    padding: 16px;
    margin-top: 16px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    font-size: 18px;

    @media (max-width: $bp-md) {
      font-size: 14px;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    margin-top: 20px;
    text-align: right;
  }

  &__btn {
    padding: 16px 20px;
    border: none;
    border-radius: 2px;
    flex: 1;
    cursor: pointer;
    font-size: 18px;

    &--cancel {
      background: #f0f0f0;
      color: #333;
    }

    &--save {
      background: #007bff;
      color: #fff;
      margin-left: 16px;
    }

    @media (max-width: $bp-md) {
      font-size: 14px;
    }
  }

  &__error {
    font-size: 14px;
    color: red;
  }
}
</style>
