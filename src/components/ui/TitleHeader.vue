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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 3rem;
  margin-bottom: 6rem;
  border-bottom: 1px solid $c-primary;
}
</style>
