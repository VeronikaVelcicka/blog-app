<template>
  <template v-if="status === 'loading'">
    <div class="spinner-box spinner-box--page">
      <Spinner />
    </div>
  </template>
  <template v-else-if="status === 'error'">
    <ErrorMessage />
  </template>
  <template v-else>
    {{ blogs.itemToEdit.title }}
  </template>
</template>

<script>
import { useBlogsStore } from "@/stores/blogs";
import { defineAsyncComponent } from "vue";

const Spinner = defineAsyncComponent(() =>
  import("@/components/ui/Spinner.vue")
);
const ErrorMessage = defineAsyncComponent(() =>
  import("@/components/ui/ErrorMessage.vue")
);

export default {
  components: { ErrorMessage, Spinner },
  setup() {
    const blogs = useBlogsStore();

    return { blogs };
  },

  data() {
    return {
      status: "",
    };
  },

  created() {
    this.status = "loading";
    this.blogs
      .fetchItem(this.$route.params.idBlog)
      .then(() => (this.status = "success"))
      .catch(() => (this.status = "error"));
  },
};
</script>

<style scoped></style>
