<template>
  <BackLink route-name="blog" />
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
          <div class="btns">
            <BaseButton
              text="Upravit"
              custom-class="btn--primary-outlined"
              :use-icon="true"
              @click="isEdit = true"
            >
              <template #ico>
                <!-- eslint-disable -->
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="m9.328 2.527 3.05 3.051-7.722 7.727-3.05-3.055Zm5.367-.734L13.332.43a1.353 1.353 0 0 0-1.906 0L10.12 1.734l3.05 3.051 1.524-1.52a1.042 1.042 0 0 0 0-1.472ZM.008 14.539a.349.349 0 0 0 .422.414l3.398-.824-3.05-3.05Zm0 0" style="stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1"/></svg>              <!-- eslint-enable -->
              </template>
            </BaseButton>
          </div>
        </template>
      </TitleHeader>

      <PostTags :tags="blogTags" @click="filter($event)" />

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
import { useTagsStore } from "@/stores/tags";

const Spinner = defineAsyncComponent(() =>
  import("@/components/ui/Spinner.vue")
);
const ErrorMessage = defineAsyncComponent(() =>
  import("@/components/ui/ErrorMessage.vue")
);
const PostForm = defineAsyncComponent(() =>
  import("@/components/posts/PostForm.vue")
);
const TitleHeader = defineAsyncComponent(() =>
  import("@/components/ui/TitleHeader.vue")
);
const BaseButton = defineAsyncComponent(() =>
  import("@/components/ui/BaseButton.vue")
);
const PostTags = defineAsyncComponent(() =>
  import("@/components/ui/PostTags.vue")
);
const BackLink = defineAsyncComponent(() =>
  import("@/components/ui/BackLink.vue")
);

export default {
  components: {
    BaseButton,
    TitleHeader,
    PostForm,
    Spinner,
    ErrorMessage,
    PostTags,
    BackLink,
  },

  setup() {
    const blogs = useBlogsStore();
    const tags = useTagsStore();

    return {
      blogs,
      tags,
    };
  },

  data() {
    return {
      isEdit: false,
      status: "",
      blogTags: [],
    };
  },

  created() {
    this.status = "loading";
    Promise.all([
      this.blogs.fetchItem(this.$route.params.idPost),
      this.tags.fetchAllItems({ refetch: false }),
    ])
      .then(() => {
        this.blogTags = this.tags.items.filter((item) =>
          this.blogs.itemToEdit.tags.includes(item.id)
        );
        this.status = "success";
      })
      .catch(() => (this.status = "error"));
  },

  methods: {
    filter(tag) {
      Object.assign(this.blogs.tag, tag);
      this.$router.push({ name: "blog" });
    },
  },
};
</script>

<style scoped lang="scss">
.btns {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;

  @include more-than(sm) {
    margin-top: 0;
  }
}

.detail {
  display: grid;
  column-gap: 3rem;
  margin-top: 6rem;

  @include more-than(lg) {
    grid-template-columns: calc(60% - 1.5rem) calc(40% - 1.5rem);
  }
}

.detail__text {
  margin: 4rem 0;
  font-size: 2rem;
  line-height: 3rem;

  @include more-than(lg) {
    margin-bottom: 0;
  }
}

.detail__image {
  width: 100%;
  height: 100%;
  max-height: 60rem;
  object-fit: cover;
}
</style>
