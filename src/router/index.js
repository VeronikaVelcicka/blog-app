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
      path: "/blog/:idPost",
      name: "blog-detail",
      component: () => import("@/views/PostDetail.vue"),
    },
    {
      path: "/blog/create",
      name: "blog-create",
      component: () => import("@/views/PostCreate.vue"),
    },
    {
      path: "/tag",
      name: "tags",
      component: () => import("@/views/Tags.vue"),
    },
    {
      path: "/tag/:idTag",
      name: "tag-detail",
      component: () => import("@/views/TagEdit.vue"),
    },
    {
      path: "/tag/create",
      name: "tag-create",
      component: () => import("@/views/TagCreate.vue"),
    },
    {
      path: "/404",
      name: "not-found",
      meta: {
        layout: "app-layout",
        title: "Not found",
      },
      component: () => import("@/views/PageNotFound.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/404",
    },
  ],
});

export default router;
