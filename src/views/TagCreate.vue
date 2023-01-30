<template>
  <BackLink route-name="tags" />
  <TagForm />
</template>

<script>
import { defineAsyncComponent } from "vue";

const TagForm = defineAsyncComponent(() =>
  import("@/components/tags/TagForm.vue")
);
const BackLink = defineAsyncComponent(() =>
  import("@/components/ui/BackLink.vue")
);

export default {
  components: { TagForm, BackLink },
};
</script>

<style scoped></style>
