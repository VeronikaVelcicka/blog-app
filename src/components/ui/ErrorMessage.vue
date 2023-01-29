<template>
  <Transition name="bounce">
    <span v-if="isVisible" class="error">
      {{ text }}
    </span>
  </Transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Neočekávana chyba.",
    },
  },

  data() {
    return {
      isVisible: false,
    };
  },

  mounted() {
    this.isVisible = true;
  },
};
</script>

<style lang="scss" scoped>
.error {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: red;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>
