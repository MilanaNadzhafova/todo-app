import Vue from "vue";
import VueRouter from "vue-router";
import TodoPage from "../views/TodoPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "todo",
    component: TodoPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
