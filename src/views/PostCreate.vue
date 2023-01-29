<template>
  <PostForm />
</template>

<script>
import { defineAsyncComponent } from "vue";

const PostForm = defineAsyncComponent(() =>
  import("@/components/PostForm.vue")
);

export default {
  components: { PostForm },
};
</script>

<style scoped></style>
