<template>
  <div class="article" @click="goToDetail(item.id)">
    <img :src="item.thumbnail" class="article__thumb" :alt="item.title" />
    <div class="article__text-box">
      <h2 class="article__title">
        {{ item.title }}
      </h2>
      <div class="text-center">
        <BaseButton :text="'Přečíst'" custom-class="btn--primary-outlined" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

const BaseButton = defineAsyncComponent(() =>
  import("@/components/ui/BaseButton.vue")
);

export default {
  components: {
    BaseButton,
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },

  methods: {
    goToDetail(id) {
      this.$router.push({ name: "blog-detail", params: { idBlog: id } });
    },
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
