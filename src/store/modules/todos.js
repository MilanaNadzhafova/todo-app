import todosApi from "@/api/todoApi";
export default {
  namespaced: true,
  state: () => ({
    list: [],
  }),
  getters: {
    all: (s) => s.list,
  },
  mutations: {
    SET(state, todos) {
      state.list = todos;
    },
    ADD(state, todo) {
      state.list.unshift(todo);
    },
    UPDATE(state, todo) {
      const i = state.list.findIndex((t) => t.id === todo.id);
      if (i !== -1) state.list.splice(i, 1, todo);
    },
    REMOVE(state, id) {
      state.list = state.list.filter((t) => t.id !== id);
    },
    CLEAR_DONE(state) {
      state.list = state.list.filter((t) => !t.completed);
    },
  },
  actions: {
    async load({ commit }) {
      const { data } = await todosApi.fetch();
      commit("SET", data);
    },
    async add({ commit }, title) {
      // const { data } = await todosApi.create({ title, completed: false });
      // тут запрос, но так как нет ручки то коммент
      commit("ADD", { title, completed: false });
    },
    async toggle({ commit }, todo) {
      //   const { data } = await todosApi.update(todo.id, {
      //     ...todo,
      //     completed: !todo.completed,
      //   });
      // тут запрос, но так как нет ручки то коммент

      commit("UPDATE", { ...todo, completed: !todo.completed });
    },
    async edit({ commit }, todo) {
      // const { data } = await todosApi.update(todo.id, todo);
      // тут запрос, но так как нет ручки то коммент

      commit("UPDATE", todo);
    },
    async remove({ commit }, id) {
      // await todosApi.remove(id);
      // тут запрос, но так как нет ручки то коммент

      commit("REMOVE", id);
    },
    clearDone({ commit }) {
      commit("CLEAR_DONE");
    },
    eorder({ commit }, newList) {
      commit("SET", newList);
    },
  },
};
