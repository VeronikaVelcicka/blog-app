<template>
  <TitleHeader :title="getTitle" />
  <div class="form">
    <div class="form__item">
      <BaseInput
        id="detail"
        v-model="formData.name"
        title="Název"
        type="text"
        name="name"
        :required="true"
        :error="fieldErrors.name"
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
import { useTagsStore } from "@/stores/tags";

const BaseButton = defineAsyncComponent(() =>
  import("@/components/ui/BaseButton.vue")
);
const BaseInput = defineAsyncComponent(() =>
  import("@/components/ui/BaseInput.vue")
);
const TitleHeader = defineAsyncComponent(() =>
  import("@/components/ui/TitleHeader.vue")
);

export default {
  components: {
    BaseButton,
    BaseInput,
    TitleHeader,
  },

  setup() {
    const tags = useTagsStore();

    return {
      tags,
    };
  },

  data() {
    return {
      isLoading: false,
      formData: {
        name: "",
      },
      fieldErrors: {},
      isError: false,
    };
  },

  computed: {
    getTitle() {
      if (this.$route.params.idTag) {
        return this.formData.name;
      } else return "Nový tag";
    },
  },

  created() {
    if (this.$route.params.idTag) {
      this.setInitialData();
    }
  },

  methods: {
    setInitialData() {
      this.tags.fetchItem(this.$route.params.idTag).then(() => {
        this.formData = {
          name: this.tags.itemToEdit.name,
        };
      });
    },

    confirm() {
      if (this.$route.params.idTag) {
        this.editTag();
      } else {
        this.createTag();
      }
    },

    editTag() {
      this.isLoading = true;
      this.tags
        .updateItem(parseInt(this.$route.params.idTag), this.formData)
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    createTag() {
      this.isLoading = true;

      this.clearErrors();
      this.checkRequired("name");

      if (!this.isError) {
        this.tags
          .createItem(this.formData)
          .then(() => {
            this.isLoading = false;
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
        id: "",
        name: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 2rem;
  margin: 0 -1.5rem;

  @include more-than(lg) {
    margin: 0 -1.5rem;
  }
}

.form__item {
  flex: 0 0 100%;
  max-width: 100%;
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
  height: 100%;
  max-height: 30rem;
  object-fit: cover;
}
</style>
