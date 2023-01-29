<template>
  <TitleHeader title="Blog">
    <template #button>
      <BaseButton
        :text="'Nový post'"
        custom-class="btn--primary"
        @click="goToCreate"
      />
    </template>
  </TitleHeader>

  <div class="posts">
    <BlogPost
      v-for="article in blogs.items"
      :key="article.id"
      :item="article"
    />
  </div>
</template>

<script>
import { useBlogsStore } from "@/stores/blogs";
import { defineAsyncComponent } from "vue";

const TitleHeader = defineAsyncComponent(() =>
  import("@/components/ui/TitleHeader.vue")
);
const BaseButton = defineAsyncComponent(() =>
  import("@/components/ui/BaseButton.vue")
);
const BlogPost = defineAsyncComponent(() =>
  import("@/components/BlogPost.vue")
);

export default {
  components: { TitleHeader, BaseButton, BlogPost },
  setup() {
    const blogs = useBlogsStore();

    return { blogs };
  },

  created() {
    this.blogs.fetchAllItems();
  },

  methods: {
    goToCreate() {
      this.$router.push({ name: "blog-create" });
    },
  },
};
</script>

<style scoped lang="scss">
.posts {
  display: flex;
  flex-wrap: wrap;
  margin: -1.5rem;
}
</style>
