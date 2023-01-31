<template>
  <TitleHeader title="Blog">
    <template #button>
      <div class="btns">
        <BaseButton
          :text="'Nový post'"
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
        <BaseButton
          :text="'Spravovat tagy'"
          custom-class="btn--primary-outlined"
          :use-icon="true"
          @click="goToTags"
        >
          <template #ico>
            <!-- eslint-disable -->
            <svg xmlns="http://www.w3.org/2000/svg" width="15.947" height="16.916" viewBox="0 0 15.947 16.916"><path id="gear-solid_1_" data-name="gear-solid (1)" d="M30.565,5.505a.749.749,0,0,1-.211.813l-1.431,1.3a6.3,6.3,0,0,1,0,1.679l1.431,1.3a.749.749,0,0,1,.211.813,8.191,8.191,0,0,1-.522,1.133l-.155.268a8.409,8.409,0,0,1-.73,1.031.748.748,0,0,1-.81.225l-1.841-.585a6.359,6.359,0,0,1-1.454.839l-.413,1.887a.747.747,0,0,1-.6.588,8.585,8.585,0,0,1-2.809,0,.747.747,0,0,1-.6-.588l-.413-1.887a6.359,6.359,0,0,1-1.454-.839l-1.837.588a.754.754,0,0,1-.81-.225,8.409,8.409,0,0,1-.73-1.031l-.155-.268a8.191,8.191,0,0,1-.522-1.133.749.749,0,0,1,.211-.813l1.431-1.3a6.483,6.483,0,0,1-.056-.843,6.394,6.394,0,0,1,.056-.839l-1.431-1.3a.749.749,0,0,1-.211-.813,8.191,8.191,0,0,1,.522-1.133l.155-.268a8.409,8.409,0,0,1,.73-1.031.748.748,0,0,1,.81-.225l1.841.585a6.359,6.359,0,0,1,1.454-.839L20.632.707a.747.747,0,0,1,.6-.588A8.192,8.192,0,0,1,22.637,0a8.539,8.539,0,0,1,1.4.116.747.747,0,0,1,.6.588l.413,1.887a6.359,6.359,0,0,1,1.454.839l1.841-.585a.754.754,0,0,1,.81.225,8.409,8.409,0,0,1,.73,1.031l.155.268A8.191,8.191,0,0,1,30.568,5.5Zm-7.928,5.6A2.644,2.644,0,1,0,19.994,8.46,2.643,2.643,0,0,0,22.637,11.1Z" transform="translate(-14.662)" fill="currentColor"/></svg>
            <!-- eslint-enable -->
          </template>
        </BaseButton>
      </div>
    </template>
  </TitleHeader>

  <h2 v-if="blogs.tag.id" class="results">
    Výsledky vyhledávaní pro tag <span class="tag">#{{ blogs.tag.name }}</span>
    <span @click="clear" class="clear" />
  </h2>

  <template v-if="status === 'loading'">
    <div class="spinner-box spinner-box--page">
      <Spinner />
    </div>
  </template>
  <template v-else-if="status === 'error'">
    <ErrorMessage />
  </template>
  <template v-else-if="!blogs.items.length">
    <ErrorMessage text="Nebyly nalezeny žádné posty." />
  </template>
  <template v-else>
    <div class="posts">
      <BlogPost
        v-for="article in paginatedBlogs"
        :key="article.id"
        :item="article"
      />
    </div>
    <Pagination
      :total-pages="totalPages"
      :total="blogs.items.length"
      :current-page="currentPage"
      @pagechanged="onPageChange"
    />
  </template>
</template>

<script>
import { useBlogsStore } from "@/stores/blogs";
import { defineAsyncComponent } from "vue";

const TitleHeader = defineAsyncComponent(() =>
  import("@/components/ui/TitleHeader.vue")
);
const BaseButton = defineAsyncComponent(() =>
  import("@/components/ui/BaseButton.vue")
);
const BlogPost = defineAsyncComponent(() =>
  import("@/components/posts/BlogPost.vue")
);
const Spinner = defineAsyncComponent(() =>
  import("@/components/ui/Spinner.vue")
);
const ErrorMessage = defineAsyncComponent(() =>
  import("@/components/ui/ErrorMessage.vue")
);
const Pagination = defineAsyncComponent(() =>
  import("@/components/ui/Pagination.vue")
);

export default {
  components: {
    TitleHeader,
    BaseButton,
    BlogPost,
    Spinner,
    ErrorMessage,
    Pagination,
  },
  setup() {
    const blogs = useBlogsStore();

    return { blogs };
  },

  data() {
    return {
      status: "",
      currentPage: 1,
      perPage: 5,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.blogs.items.length / this.perPage);
    },

    paginatedBlogs() {
      if (this.currentPage === 1) {
        const from = this.currentPage - 1;
        const to = this.perPage;
        return this.blogs.items.slice(from, to);
      } else if (this.currentPage > 1) {
        const from = (this.currentPage - 1) * this.perPage;
        const to = this.perPage * this.currentPage;
        return this.blogs.items.slice(from, to);
      } else return this.blogs.items;
    },
  },

  created() {
    this.status = "loading";
    this.blogs
      .fetchAllItems()
      .then(() => {
        if (this.blogs.tag.id) {
          this.blogs.searchByTag();
        }
        this.status = "success";
      })
      .catch(() => (this.status = "error"));
  },

  methods: {
    goToCreate() {
      this.$router.push({ name: "blog-create" });
    },

    goToTags() {
      this.$router.push({ name: "tags" });
    },

    clear() {
      this.blogs.tag = {};
      this.status = "loading";
      this.blogs
        .fetchAllItems()
        .then(() => (this.status = "success"))
        .catch(() => (this.status = "error"));
    },

    onPageChange(page) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
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

.posts {
  display: flex;
  flex-wrap: wrap;
  margin: -1.5rem;
}

.results {
  margin-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
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
