<template>
  <div class="article">
    <img :src="item.thumbnail" class="article__thumb" :alt="item.title" />
    <div class="article__text-box">
      <h2 class="article__title">
        {{ item.title }}
      </h2>
      <PostTags :tags="blogTags" @click="filter($event)" />
      <p class="article__subtitle">{{ item.detail }}</p>
      <div class="text-center">
        <BaseButton
          :text="'Přečíst'"
          custom-class="btn--primary-outlined"
          @click="goToDetail(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { useBlogsStore } from "@/stores/blogs";
import { useTagsStore } from "@/stores/tags";

const BaseButton = defineAsyncComponent(() =>
  import("@/components/ui/BaseButton.vue")
);
const PostTags = defineAsyncComponent(() =>
  import("@/components/ui/PostTags.vue")
);

export default {
  components: {
    BaseButton,
    PostTags,
  },

  props: {
    item: {
      type: Object,
      default: null,
    },
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
      blogTags: [],
    };
  },

  methods: {
    goToDetail(id) {
      this.$router.push({ name: "blog-detail", params: { idPost: id } });
    },

    filter(tag) {
      Object.assign(this.blogs.tag, tag);
      this.blogs.searchByTag();
    },
  },

  created() {
    this.tags.fetchAllItems().then(() => {
      this.blogTags = this.tags.items.filter((item) =>
        this.item.tags.includes(item.id)
      );
    });
  },
};
</script>

<style scoped lang="scss">
.article {
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 3.2rem);
  flex: 0 0 calc(100% - 3.2rem);
  margin: 1.5rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  background-color: $c-blank;
  overflow: hidden;
  transition: border 0.2s ease, transform 0.2s ease;

  @include more-than(md) {
    max-width: calc(100% / 2 - 3.2rem);
    flex: 0 0 calc(100% / 2 - 3.2rem);
  }

  @include more-than(xl) {
    max-width: calc(100% / 3 - 3.2rem);
    flex: 0 0 calc(100% / 3 - 3.2rem);
  }

  &:hover {
    cursor: pointer;
    border-color: $c-primary;
    transform: scale(105%);
  }
}

.article__thumb {
  width: 100%;
  height: 30rem;
  object-fit: cover;
}

.article__text-box {
  padding: 0 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 100%;
}

.article__title {
  margin-bottom: 3rem;
  text-align: center;
  color: $c-tertiary;
  transition: color 0.2s ease;
}

.article:hover .article__title {
  color: $c-primary;
}
</style>
