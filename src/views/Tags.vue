<template>
  <BackLink route-name="blog" />
  <TitleHeader title="Tagy">
    <template #button>
      <BaseButton
        :text="'Nový tag'"
        custom-class="btn--primary"
        :use-icon="true"
        @click="goToCreate"
      >
        <template #ico>
          <!-- eslint-disable -->
          <svg xmlns="http://www.w3.org/2000/svg" width="14.234" height="14.234" viewBox="0 0 14.234 14.234"><path id="plus-regular" d="M30.234,55.127a.819.819,0,0,1-.821.821H23.938v5.475a.821.821,0,1,1-1.642,0V55.948H16.821a.821.821,0,1,1,0-1.642H22.3V48.831a.821.821,0,0,1,1.642,0v5.475h5.475A.821.821,0,0,1,30.234,55.127Z" transform="translate(-16 -48.01)" fill="currentColor"/></svg>
          <!-- eslint-enable -->
        </template>
      </BaseButton>
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
const BackLink = defineAsyncComponent(() =>
  import("@/components/ui/BackLink.vue")
);

export default {
  components: {
    PostTags,
    TitleHeader,
    BaseButton,
    Spinner,
    ErrorMessage,
    BackLink,
  },
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
