<template>
  <div class="input">
    <label v-if="$attrs.title" :for="$attrs.id" class="input__label">
      {{ $attrs.title }}
    </label>
    <textarea
      :id="id"
      :name="name"
      class="textarea"
      :class="customClass"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
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
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "name",
    },
    modelValue: {
      type: String,
      default: "",
    },
    customClass: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
  },
  emits: ["update:modelValue"],
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

.textarea {
  height: 7.6rem;
  padding: 1.2rem;
  font-family: $f-default;
  line-height: 1.7rem;
  color: $c-text;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: $c-blank;
  outline: none;
  resize: none;
  transition: border-color 0.2s ease;

  @include more-than(xl) {
    font-size: 1.3rem;
  }

  &:hover {
    border-color: $c-primary;
  }

  &:focus {
    border-color: $c-primary;
  }
}

textarea::placeholder {
  color: $c-text;
}

.textarea--long {
  height: 35rem;
}

.error {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: red;
}
</style>
