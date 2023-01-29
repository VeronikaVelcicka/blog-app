import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: { name: "blog" },
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("@/views/Blog.vue"),
    },
    {
      path: "/blog/:idBlog",
      name: "blog-detail",
      component: () => import("@/views/BlogDetail.vue"),
    },
  ],
});

export default router;
