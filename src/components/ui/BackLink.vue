<template>
  <router-link :to="{ name: routeName, params: params }" class="backlink">
    <!-- eslint-disable -->
    <svg class="backlink__ico" xmlns="http://www.w3.org/2000/svg" width="12.734" height="10.914" viewBox="0 0 12.734 10.914">
      <path id="arrow-right-regular_1_" data-name="arrow-right-regular (1)" d="M5.214,64.2l-5,4.775a.683.683,0,0,0,0,.988l5,4.775a.682.682,0,0,0,.942-.988l-3.772-3.6h9.668a.682.682,0,1,0,0-1.364H2.385l3.772-3.6a.683.683,0,0,0-.943-.989Z" transform="translate(0 -64.013)" fill="currentColor" />
    </svg>
    <!-- eslint-enable -->
    <slot> Zpět </slot>
  </router-link>
</template>

<script>
export default {
  props: {
    routeName: {
      type: String,
      default: "",
    },
    params: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.backlink {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  color: $c-text;
  column-gap: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: $c-primary;
  }
}

.backlink__ico {
  transition: transform 0.2s ease;
}

.backlink:hover .backlink__ico {
  transform: translateX(-1rem);
}
</style>
