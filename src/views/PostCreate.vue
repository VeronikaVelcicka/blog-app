<template>
  <BackLink route-name="blog" />
  <PostForm />
</template>

<script>
import { defineAsyncComponent } from "vue";

const PostForm = defineAsyncComponent(() =>
  import("@/components/posts/PostForm.vue")
);
const BackLink = defineAsyncComponent(() =>
  import("@/components/ui/BackLink.vue")
);

export default {
  components: { BackLink, PostForm },
};
</script>

<style scoped></style>
