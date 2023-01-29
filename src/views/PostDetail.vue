<template>
  <PostForm v-if="isEdit" />
  <template v-else>
    <template v-if="status === 'loading'">
      <div class="spinner-box spinner-box--page">
        <Spinner />
      </div>
    </template>
    <template v-else-if="status === 'error'">
      <ErrorMessage />
    </template>
    <template v-else>
      <TitleHeader :title="blogs.itemToEdit.title">
        <template #button>
          <BaseButton
            text="Upravit"
            custom-class="btn--primary-outlined"
            @click="isEdit = true"
          />
        </template>
      </TitleHeader>

      <div class="detail">
        <div>
          <h2 class="h h--secondary">{{ blogs.itemToEdit.detail }}</h2>
          <article class="detail__text">{{ blogs.itemToEdit.text }}</article>
        </div>

        <img
          :src="blogs.itemToEdit.image"
          class="detail__image"
          :alt="blogs.itemToEdit.title"
        />
      </div>
    </template>
  </template>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { useBlogsStore } from "@/stores/blogs";

const Spinner = defineAsyncComponent(() =>
  import("@/components/ui/Spinner.vue")
);
const ErrorMessage = defineAsyncComponent(() =>
  import("@/components/ui/ErrorMessage.vue")
);
const PostForm = defineAsyncComponent(() =>
  import("@/components/PostForm.vue")
);
const TitleHeader = defineAsyncComponent(() =>
  import("@/components/ui/TitleHeader.vue")
);
const BaseButton = defineAsyncComponent(() =>
  import("@/components/ui/BaseButton.vue")
);

export default {
  components: { BaseButton, TitleHeader, PostForm, Spinner, ErrorMessage },

  setup() {
    const blogs = useBlogsStore();

    return {
      blogs,
    };
  },

  data() {
    return {
      isEdit: false,
      status: "",
    };
  },

  created() {
    this.status = "loading";
    this.blogs
      .fetchItem(this.$route.params.idPost)
      .then(() => (this.status = "success"))
      .catch(() => (this.status = "error"));
  },
};
</script>

<style scoped lang="scss">
.detail {
  display: grid;
  grid-template-columns: calc(60% - 1.5rem) calc(40% - 1.5rem);
  column-gap: 3rem;
}

.detail__text {
  margin-top: 4rem;
  font-size: 2rem;
  line-height: 3rem;
}

.detail__image {
  width: 100%;
  height: 100%;
  max-height: 60rem;
  object-fit: cover;
}
</style>
