<template>
  <div class="input" :class="hidePlaceholder">
    <label v-if="$attrs.title" :for="$attrs.id" class="input__label">
      {{ $attrs.title }}
      <span v-if="required" class="input__required">*</span>
    </label>
    <input
      class="input__field"
      v-bind="$attrs"
      :value="modelValue ? modelValue : null"
      @input="
        $emit('update:modelValue', $event.target.value);
        handleInput($event);
      "
    />
    <span v-if="!modelValue" class="input__placeholder">
      {{ $attrs.title }}
    </span>
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
      default: "",
    },
    error: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue", "input"],

  data() {
    return {
      inputLength: 0,
    };
  },

  computed: {
    hidePlaceholder() {
      return this.modelValue ? "active" : "";
    },
  },

  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
      this.inputLength = e.target.value.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 2.2rem;
}

.input__label {
  margin-bottom: 1.3rem;
  font-weight: $fw-semi-bold;
  font-size: 1.6rem;
  line-height: 1.9rem;
  color: $c-text;
  transition: opacity 0.2s ease;
}

.input__field {
  padding: 1.8rem 2rem;
  font-size: 1.5rem;
  line-height: 1.6rem;
  color: $c-text;
  border: 1px solid transparent;
  border-radius: 5px;
  transition: border-color 0.2s ease;

  &:hover,
  &:focus {
    border-color: $c-primary;
    outline: none;
  }

  &::placeholder {
    opacity: 1;
    color: $c-text;
  }

  /* stylelint-disable */
  &:input-placeholder {
    color: $c-text;
  }

  &::input-placeholder {
    color: $c-text;
  }
  /* stylelint-enable */
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}

.input__placeholder {
  position: absolute;
  top: 4.7rem;
  left: 2rem;
  opacity: 0.5;
  font-size: 1.5rem;
  color: $c-text;
  pointer-events: none;
  transition: all 0.2s linear;
}

.input__required {
  color: red;
}

.error {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: red;
}
</style>
