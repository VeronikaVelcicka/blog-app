<template>
  <div class="tags">
    <div
      v-for="tag in tags"
      :key="tag.id"
      class="tag"
      @click="$emit('click', tag)"
    >
      #{{ tag.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  cursor: pointer;
}

.tag {
  background-color: $c-primary;
  border: 1px solid $c-primary;
  border-radius: 10rem;
  color: $c-blank;
  padding: 0.3rem 1rem;
  transition: color 0.2s ease, background-color 0.2s ease;

  @include more-than(sm) {
    padding: 0.5rem 2rem;
  }

  &:hover {
    color: $c-primary;
    background-color: $c-blank;
  }
}
</style>
