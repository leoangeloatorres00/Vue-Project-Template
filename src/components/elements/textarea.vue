<template>
  <div class="textarea-container">
    <!-- use for custom label -->
    <div class="label" v-if="isCustomLabel">
      <slot name="label"></slot>
    </div>
    <!-- use for regular label -->
    <span class="label" v-else>{{ label }}</span>
    <v-textarea
      hide-details
      v-model="value"
      :class="onClass"
      :outlined="outlined"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="clearable"
      auto-grow
      rows="1"
    ></v-textarea>
    <span class="message">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: () => {
        return "";
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return "";
      },
    },
    outlined: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    readonly: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    required: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    clearable: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data: () => {
    return {
      value: "",
      message: "",
    };
  },
  computed: {
    onClass() {
      if (this.message != "" && this.disabled)
        return "v-text-field-has--error v-text-field-is--disabled";
      if (this.message != "") return "v-text-field-has--error";
      if (this.disabled) return "v-text-field-is--disabled";

      return "";
    },
    isCustomLabel() {
      return this.label == "";
    },
  },
  watch: {
    value(newValue) {
      this.validateInput(newValue);
    },
  },
  methods: {
    validateInput(value) {
      this.message = "";

      const isValueEmpty = value == "" || value == null;

      if (isValueEmpty && this.label != "" && this.required) {
        const label = this.label.toLowerCase();
        this.message = `Please enter ${label}!`;
        return true;
      }

      if (isValueEmpty && this.label == "" && this.required) {
        this.message = `This field is required!`;
        return true;
      }

      return false;
    },
  },
};
</script>

<style>
.textarea-container textarea {
  margin-bottom: 10px;
  color: var(--input-text-primary) !important;
}

/* Outlined */
.textarea-container .v-text-field--outlined fieldset,
.textarea-container .v-text-field--outlined:hover fieldset {
  border: 1px solid var(--input-border-primary) !important;
}

.textarea-container .v-text-field--outlined.v-text-field-is--disabled fieldset {
  background: var(--input-background-disabled) !important;
}

.textarea-container .v-text-field--outlined.v-text-field-has--error fieldset,
.textarea-container
  .v-text-field--outlined.v-text-field-has--error:hover
  fieldset {
  border: 1px solid var(--input-border-error) !important;
}

/* Non Outlined */
.textarea-container .v-textarea .v-input__slot:after {
  border: none;
  border-color: var(--input-border-primary) !important;
}

.textarea-container .v-textarea > .v-input__control > .v-input__slot:before {
  border-color: var(--input-border-primary) !important;
}

.textarea-container
  .v-textarea.v-textarea-has--error
  > .v-input__control
  > .v-input__slot:before {
  border-color: var(--input-border-error) !important;
}
</style>

<style scoped>
.label {
  color: var(--input-text-secondary);
}

.label,
.message {
  font-size: 12px;
}

.message {
  color: var(--input-text-error);
}

.textarea-container {
  margin-bottom: 5px;
}

.v-input:not(.v-text-field--outlined) {
  padding-block: 0px;
}
</style>
