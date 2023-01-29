<template>
  <h1 class="h h--primary">Blog</h1>

  <div class="articles">
    <BlogArticle
      v-for="article in blogs.items"
      :key="article.id"
      :item="article"
    />
  </div>
</template>

<script>
import { useBlogsStore } from "@/stores/blogs";
import { defineAsyncComponent } from "vue";

const BlogArticle = defineAsyncComponent(() =>
  import("@/components/Article.vue")
);

export default {
  components: { BlogArticle },
  setup() {
    const blogs = useBlogsStore();

    return { blogs };
  },

  created() {
    this.blogs.fetchAllItems();
  },
};
</script>

<style scoped lang="scss">
.articles {
  display: flex;
  flex-wrap: wrap;
  margin: -1.5rem;
}
</style>
