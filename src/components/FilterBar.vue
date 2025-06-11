<template>
  <div class="filter-bar">
    <input
      v-model="query"
      class="filter-bar__input"
      type="text"
      placeholder="Поиск..."
      @input="$emit('search', query)"
    />
    <div class="filter-bar__actions">
      <div class="filter-bar__group">
        <select
          class="filter-bar__select"
          :value="currentFilter"
          @change="onFilterChange"
        >
          <option v-for="(label, key) in labels" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
      </div>

      <button
        class="filter-bar__btn filter-bar__btn--clear"
        @click="$emit('clear-done')"
      >
        Удалить выполненные
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterBar",
  props: {
    currentFilter: {
      type: String,
      default: "all",
    },
  },
  data() {
    return {
      query: "",
      labels: {
        all: "Все",
        active: "Активные",
        done: "Выполненные",
      },
    };
  },
  methods: {
    onFilterChange(e) {
      this.$emit("filter", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";

.filter-bar {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: $bp-md) {
    flex-direction: column;
    align-items: stretch;
  }

  &__actions {
    display: flex;
    align-items: stretch;
    gap: 10px;
  }

  &__input {
    flex: 1;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 2px;
    width: 100%;
    font-size: 18px;

    @media (max-width: $bp-md) {
      font-size: 14px;
    }
  }

  &__group {
    flex-shrink: 0;
  }

  &__select {
    display: block;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 2px;
    font-size: 18px;
    background: #fff;
    cursor: pointer;

    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23999'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    background-size: 12px auto;

    @media (max-width: $bp-md) {
      font-size: 14px;
    }
  }

  &__btn {
    padding: 14px 18px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    font-size: 18px;

    &--clear {
      background: #f7a8a8;
      color: #000000;

      @media (max-width: $bp-md) {
        font-size: 14px;
        flex: 1;
      }
    }
  }
}
</style>
