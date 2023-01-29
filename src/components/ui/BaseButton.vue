<template>
  <button class="btn" :class="customClass">
    <span v-if="useIcon" class="btn__ico">
      <slot name="ico" />
    </span>
    <span class="btn__text" :class="{ 'btn__text--ico': useIcon }">
      {{ text }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    customClass: {
      type: String,
      default: null,
    },
    useIcon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  padding: 1.5rem 3rem;
  font-size: 1.5rem;
  line-height: 1.7rem;
  color: $c-text;
  border: 2px solid transparent;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;

  &:hover {
    color: $c-text;
    background-color: transparent;
  }
}

.btn--primary {
  color: $c-blank;
  border-color: $c-primary;
  background-color: $c-primary;

  &:hover {
    color: $c-primary;
  }
}

.btn--primary-outlined {
  color: $c-primary;
  border-color: $c-primary;
  background-color: transparent;

  &:hover {
    color: $c-blank;
    background-color: $c-primary;
  }
}

.article:hover .btn--primary-outlined {
  color: $c-blank;
  background-color: $c-primary;
}

.btn__ico {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn__text {
  display: inline-block;
  margin: 0 auto;
  white-space: nowrap;
  text-transform: uppercase;
}

.btn__text--ico {
  padding-left: 1.5rem;
}
</style>
