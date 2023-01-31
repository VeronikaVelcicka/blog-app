<template>
  <TitleHeader :title="getTitle" />
  <PostTags
    v-if="activeTags.length"
    :tags="activeTags"
    @click="filter($event)"
  />
  <div class="form">
    <div class="form__item">
      <BaseInput
        id="title"
        v-model="formData.title"
        title="Nadpis"
        type="text"
        name="title"
        :required="true"
        :error="fieldErrors.title"
      />
    </div>
    <div class="form__item">
      <BaseInput
        id="detail"
        v-model="formData.detail"
        title="Detail"
        type="text"
        name="detail"
        :required="true"
        :error="fieldErrors.detail"
      />
    </div>
    <div class="form__item">
      <BaseSelect
        title="Tag"
        :options="tagsArr"
        :modelValue="formData.tags"
        customClass="input__field--arrow u-bc-light"
        placeholder="Vyberte možnost"
        :required="true"
        :error="fieldErrors.tags"
        @update:model-value="formData.tags = $event"
      />
    </div>
    <div class="form__item">
      <BaseTextarea
        id="text"
        v-model="formData.text"
        title="Text"
        name="text"
        custom-class="textarea--long"
        :required="true"
        :error="fieldErrors.text"
      />
    </div>
    <div class="form__item">
      <BaseInput
        id="image"
        v-model="formData.image"
        title="Obrázek"
        type="text"
        name="image"
        :error="fieldErrors.image"
      />
      <img
        v-if="formData.image"
        :src="formData.image"
        class="form__image"
        :alt="fieldErrors.title"
        loading="lazy"
      />
    </div>
    <div class="form__item">
      <BaseInput
        id="thumbnail"
        v-model="formData.thumbnail"
        title="Náhledový obrázek"
        type="text"
        name="thumbnail"
        :error="fieldErrors.thumbnail"
      />
      <img
        v-if="formData.thumbnail"
        :src="formData.thumbnail"
        class="form__image"
        :alt="fieldErrors.thumbnail"
        loading="lazy"
      />
    </div>
  </div>
  <BaseButton
    text="Uložit změny"
    :type="'button'"
    :customClass="'btn--primary'"
    :is-loading="isLoading"
    @click="confirm"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { useBlogsStore } from "@/stores/blogs";
import { useTagsStore } from "@/stores/tags";

const BaseButton = defineAsyncComponent(() =>
  import("@/components/ui/BaseButton.vue")
);
const BaseInput = defineAsyncComponent(() =>
  import("@/components/ui/BaseInput.vue")
);
const BaseSelect = defineAsyncComponent(() =>
  import("@/components/ui/BaseSelect.vue")
);
const BaseTextarea = defineAsyncComponent(() =>
  import("@/components/ui/BaseTextarea.vue")
);
const TitleHeader = defineAsyncComponent(() =>
  import("@/components/ui/TitleHeader.vue")
);
const PostTags = defineAsyncComponent(() =>
  import("@/components/ui/PostTags.vue")
);

export default {
  components: {
    PostTags,
    BaseTextarea,
    BaseButton,
    BaseInput,
    BaseSelect,
    TitleHeader,
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
      isLoading: false,
      formData: {
        id: null,
        title: "",
        detail: "",
        text: "",
        image: "",
        thumbnail: "",
        tags: "",
      },
      defaultData: {},
      fieldErrors: {},
      isError: false,
      tagsArr: [],
      activeTags: [],
    };
  },

  watch: {
    "blogs.tagsReload": {
      deep: true,
      handler() {
        this.filterTags();
      },
    },
  },

  computed: {
    getTitle() {
      if (this.$route.params.idPost) {
        return this.formData.title;
      } else return "Nový post";
    },
  },

  created() {
    if (this.$route.params.idPost) {
      this.setInitialData();
    }

    this.tags.fetchAllItems({ refetch: false }).then(() => {
      if (this.$route.params.idPost) {
        this.filterTags();
      } else this.tagsArr = this.tags.items;
    });
  },

  methods: {
    setInitialData() {
      this.blogs.fetchItem(this.$route.params.idPost).then(() => {
        this.formData = {
          title: this.blogs.itemToEdit.title,
          detail: this.blogs.itemToEdit.detail,
          text: this.blogs.itemToEdit.text,
          image: this.blogs.itemToEdit.image,
          thumbnail: this.blogs.itemToEdit.thumbnail,
        };
        this.defaultData = {
          title: this.blogs.itemToEdit.title,
          detail: this.blogs.itemToEdit.detail,
          text: this.blogs.itemToEdit.text,
          image: this.blogs.itemToEdit.image,
          thumbnail: this.blogs.itemToEdit.thumbnail,
        };
      });
    },

    confirm() {
      if (this.$route.params.idPost) {
        this.editPost();
      } else {
        this.createPost();
      }
    },

    editPost() {
      this.isLoading = true;

      this.clearErrors();
      this.checkRequired("title");
      this.checkRequired("detail");
      this.checkRequired("text");

      if (
        JSON.stringify(this.defaultData) !== JSON.stringify(this.formData) &&
        !this.isError
      ) {
        this.blogs
          .updateItem(parseInt(this.$route.params.idPost), this.formData)
          .then(() => {
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }

      if (this.formData.tags) {
        this.blogs
          .addTag(this.$route.params.idPost, this.formData.tags)
          .then(() => (this.blogs.tagsReload = !this.blogs.tagsReload));
      }
    },

    createPost() {
      this.isLoading = true;

      this.clearErrors();
      this.checkRequired("title");
      this.checkRequired("detail");
      this.checkRequired("text");
      this.checkRequired("tags");

      if (!this.isError) {
        this.blogs
          .createItem(this.formData)
          .then(() => {
            this.isLoading = false;
            this.$router.push({ name: "blog" });
          })
          .catch(() => {
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    },

    checkRequired(item) {
      if (!this.formData[item]) {
        this.fieldErrors[item] = "Pole je povinné!";
        this.isError = true;
      }
    },

    clearErrors() {
      this.isError = false;
      this.fieldErrors = {
        title: "",
        detail: "",
        text: "",
        tags: "",
      };
    },

    filter(tag) {
      Object.assign(this.blogs.tag, tag);
      this.$router.push({ name: "blog" });
    },

    filterTags() {
      this.tagsArr = this.tags.items.filter(
        ({ id }) => !this.blogs.itemToEdit.tags.includes(id)
      );
      this.activeTags = this.tags.items.filter(({ id }) =>
        this.blogs.itemToEdit.tags.includes(id)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 2rem;
  margin: 6rem -1.5rem 0;
}

.form__item {
  flex: 0 0 calc(100% - 3rem);
  max-width: calc(100% - 3rem);
  padding: 0 1.5rem;
  margin-bottom: 2rem;

  @include more-than(md) {
    flex: 0 0 calc(50% - 3rem);
    max-width: calc(50% - 3rem);
    margin-bottom: 2.4rem;
  }

  @include more-than(xl) {
    flex: 0 0 calc(100% / 3 - 3rem);
    max-width: calc(100% / 3 - 3rem);
    padding: 0 1.5rem;
    margin-bottom: 3rem;
  }
}

.form__image {
  margin-top: 2rem;
  width: 100%;
  max-height: 30rem;
  object-fit: cover;
}
</style>
