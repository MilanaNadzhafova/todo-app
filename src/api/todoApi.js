import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/todos",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  fetch() {
    return api.get("?_limit=10");
  },

  create(payload) {
    return api.post("/", payload);
  },

  update(id, payload) {
    return api.put(`/${id}`, payload);
  },

  remove(id) {
    return api.delete(`/${id}`);
  },
};
