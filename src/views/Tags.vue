<template>
  <TitleHeader title="Tagy">
    <template #button>
      <BaseButton
        :text="'Nový tag'"
        custom-class="btn--primary"
        @click="goToCreate"
      />
    </template>
  </TitleHeader>

  <template v-if="status === 'loading'">
    <div class="spinner-box spinner-box--page">
      <Spinner />
    </div>
  </template>
  <template v-else-if="status === 'error'">
    <ErrorMessage />
  </template>
  <template v-else-if="!tags.items.length">
    <ErrorMessage text="Nebyly nalezeny žádné tagy." />
  </template>
  <template v-else>
    <h2 class="h h--secondary mb-5">Upravit tag:</h2>
    <PostTags :tags="tags.items" @click="editTag($event.id)" />
  </template>
</template>

<script>
import { useTagsStore } from "@/stores/tags";
import { defineAsyncComponent } from "vue";

const TitleHeader = defineAsyncComponent(() =>
  import("@/components/ui/TitleHeader.vue")
);
const BaseButton = defineAsyncComponent(() =>
  import("@/components/ui/BaseButton.vue")
);
const Spinner = defineAsyncComponent(() =>
  import("@/components/ui/Spinner.vue")
);
const ErrorMessage = defineAsyncComponent(() =>
  import("@/components/ui/ErrorMessage.vue")
);
const PostTags = defineAsyncComponent(() =>
  import("@/components/ui/PostTags.vue")
);

export default {
  components: { PostTags, TitleHeader, BaseButton, Spinner, ErrorMessage },
  setup() {
    const tags = useTagsStore();

    return { tags };
  },

  data() {
    return {
      status: "",
    };
  },

  created() {
    this.status = "loading";
    this.tags
      .fetchAllItems()
      .then(() => (this.status = "success"))
      .catch(() => (this.status = "error"));
  },

  methods: {
    filter(tag) {
      Object.assign(this.blogs.tag, tag);
      this.$router.push({ name: "blog" });
    },

    goToCreate() {
      this.$router.push({ name: "tag-create" });
    },

    editTag(id) {
      this.$router.push({
        name: "tag-detail",
        params: {
          idTag: id,
        },
      });
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

.results {
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

.tag {
  color: $c-primary;
  font-weight: $fw-semi-bold;
}

.clear {
  position: relative;
  height: 1.5rem;
  width: 1.5rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 0.2rem;
    background-color: $c-text;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:hover {
    &::before,
    &::after {
      background-color: $c-primary;
    }
  }
}
</style>
