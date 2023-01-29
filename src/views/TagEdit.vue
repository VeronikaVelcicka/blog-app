<template>
  <TagForm />
</template>

<script>
import { defineAsyncComponent } from "vue";

const TagForm = defineAsyncComponent(() =>
  import("@/components/tags/TagForm.vue")
);

export default {
  components: { TagForm },
};
</script>

<style scoped></style>
