<template>
  <div class="title">
    <h1 class="h h--primary">
      {{ title }}
    </h1>
    <slot name="button" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid $c-primary;

  @include more-than(sm) {
    margin-bottom: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 2rem;
  }

  @include more-than(lg) {
    margin-bottom: 6rem;
  }
}
</style>
