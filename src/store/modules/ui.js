export default {
  namespaced: true,
  state: () => ({
    filter: "all",
    search: "",
  }),
  mutations: {
    SET_FILTER(state, filter) {
      state.filter = filter;
    },
    SET_SEARCH(state, query) {
      state.search = query;
    },
  },
  getters: {
    filtered: (state, getters, rootState) => {
      const list = rootState.todos.list
        .slice()
        .filter((t) => {
          if (state.filter === "active") return !t.completed;
          if (state.filter === "done") return t.completed;
          return true;
        })
        .filter((t) =>
          t.title.toLowerCase().includes(state.search.toLowerCase())
        );
      return list.sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1
      );
    },
  },
  actions: {
    setFilter({ commit }, filter) {
      commit("SET_FILTER", filter);
    },
    setSearch({ commit }, query) {
      commit("SET_SEARCH", query);
    },
  },
};
