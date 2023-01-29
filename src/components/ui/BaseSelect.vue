<template>
  <div class="input">
    <label v-if="$attrs.title" for="" class="input__label">
      {{ $attrs.title }}
    </label>
    <div class="position-relative">
      <button class="input__field" @click="showOptions = !showOptions">
        <span
          class="input__selected"
          :class="{ 'input__selected--open': showOptions }"
        >
          {{ modelValue > 0 ? selectedOption(modelValue) : placeholder }}
        </span>
      </button>
      <transition name="transition">
        <div v-if="showOptions" id="items" class="input__items">
          <div
            v-for="option in options"
            :key="option.id"
            class="input__item"
            :class="{ 'input__item--selected': modelValue === option.id }"
            @click="select(option)"
          >
            {{ option.name }}
          </div>
        </div>
      </transition>
    </div>
    <Transition name="bounce">
      <span v-if="error" class="error">
        {{ error }}
      </span>
    </Transition>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
    select(option) {
      this.$emit("update:modelValue", option.id);
      this.showOptions = false;
    },

    selectedOption(value) {
      const option = this.options.find((item) => item.id === value);
      if (option) {
        return option.name;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
}

.input__label {
  margin-bottom: 1.3rem;
  font-weight: $fw-semi-bold;
  font-size: 1.6rem;
  line-height: 1.9rem;
  transition: opacity 0.2s ease;
}

.input__field {
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.5rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  background-color: $c-blank;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
  appearance: none;

  &:hover,
  &:focus {
    border-color: $c-primary;
    outline: none;
  }

  &::-ms-expand {
    display: none;
  }
}

.input__selected {
  display: block;
  padding: 1.8rem 2rem;
  text-align: left;
  color: $c-text;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 2rem;
    width: 1.5rem;
    height: 0.9rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14.394' height='8.224' viewBox='0 0 14.394 8.224'%3E%3Cpath id='chevron-down-solid' d='M38.4,167.848a1.029,1.029,0,0,0,1.455,0l6.167-6.167a1.029,1.029,0,1,0-1.455-1.455l-5.441,5.441-5.441-5.438a1.029,1.029,0,1,0-1.455,1.455l6.167,6.167Z' transform='translate(-31.925 -159.925)' fill='%23339989'/%3E%3C/svg%3E%0A");
    transform: translateY(-50%);
    transition: transform 0.2s ease;
  }
}

.input__selected--open {
  &::after {
    transform: translateY(-50%) rotate(180deg);
  }
}

.input__items {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 2;
  padding: 1rem;
  overflow: hidden scroll;
  border-radius: 0.5rem;
  background-color: $c-blank;
  filter: drop-shadow(0 3px 20px #00000029);
}

.input__item {
  display: block;
  padding: 1rem 2.2rem;
  text-decoration: none;
  color: $c-text;
  border-top: 1px solid $c-primary;
  cursor: pointer;

  &:first-child {
    border-top: none;
  }

  &:hover {
    background-color: rgba(238, 238, 238, 0.4);
  }
}

.input__item--selected {
  background-color: rgba(238, 238, 238, 0.4);
}

.error {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: red;
}
</style>
