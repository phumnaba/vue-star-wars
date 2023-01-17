import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "@/views/search/Search.vue"),
  },
  {
    path: "/entity/:id",
    name: "entity",
    component: () =>
      import(
        /* webpackChunkName: "entity-list" */ "@/views/entity/EntityList.vue"
      ),
    meta: { transition: "slide-right" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
