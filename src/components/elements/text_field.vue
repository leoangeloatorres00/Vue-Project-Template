<template>
  <div class="textfield-container">
    <!-- use for custom label -->
    <div :class="`label${isOutlined}`" v-if="isCustomLabel">
      <slot name="label"></slot>
    </div>
    <!-- use for regular label -->
    <span :class="`label${isOutlined}`" v-else>{{ label }}</span>
    <v-text-field
      hide-details
      v-model="value"
      :outlined="outlined"
      :placeholder="placeholder"
      :class="onClass"
      :prefix="onPrefix"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="clearable"
      @blur="onBlur"
      @focus="onFocus"
      @keydown="onKeydown"
      @click="onClick"
    >
      <!-- use for custom element in the start of the text field -->
      <template v-slot:prepend-inner>
        <slot name="prepend" />
      </template>
      <!-- use for custom element in the end of the text field -->
      <template v-slot:append>
        <slot name="append" />
      </template>
    </v-text-field>
    <span class="message">{{ message }}</span>
  </div>
</template>

<script>
import { formatAmount, unformatAmount } from "@/utils/data";

export default {
  props: {
    type: {
      type: String,
      default: () => {
        return "";
      },
    },
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
      specialCharacters: [],
    };
  },
  mounted() {},
  computed: {
    onPrefix() {
      if (this.type == "amount") return this.CURRENCY_LABEL;
      if (this.type == "mobile") return this.COUNTRY_CODE_LABEL;

      return "";
    },
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
    isOutlined() {
      return this.outlined ? " outlined" : "";
    },
  },
  watch: {
    value(newValue) {
      this.validateInput(newValue);
    },
  },
  methods: {
    onClick() {
      const self = this;
      self.$emit("click", true);
    },
    onKeydown(event) {
      switch (this.type) {
        case "number":
          this.inputNumber(event);
          break;
        case "mobile":
          this.inputNumber(event);
          break;
        case "amount":
          this.inputAmount(event);
          break;
        case "text":
          this.specialCharacters = ["_", "."];
          this.inputAlphabet(event);
          break;
        case "email":
          this.specialCharacters = ["_"];
          this.inputAlphaNumeric(event);
          break;
        case "id":
          this.inputAlphaNumeric(event);
          break;
      }
    },
    onBlur() {
      if (this.type == "amount" && this.value != "") {
        const amount = this.value;
        this.value = formatAmount(amount);
      }
    },
    onFocus() {
      if (this.type == "amount" && this.value != "") {
        const amount = this.value;
        this.value = unformatAmount(amount);
      }
    },
    inputAlphaNumeric(event) {
      if (this.handleEmailAddressInput(event)) return;

      if (this.handleSpecialCharacterInput(event)) return;

      if (this.handleAboveCharacterInNumber(event)) return;

      if (this.handleSpacebarInput(event)) return;

      if (this.handleBackspaceInput(event)) return;

      if (this.handleNumericInput(event)) return;

      if (this.handleNumericInputNumpad(event)) return;

      if (this.handleLetterInput(event)) return;

      if (this.handleNonLetterInput(event)) return;
    },
    inputAmount(event) {
      if (this.handleAboveCharacterInNumber(event)) return;

      if (this.handleBackspaceInput(event)) return;

      if (this.handleNumericInputNumpad(event)) return;

      if (this.handleNumericInput(event)) return;

      if (this.handleDecimalInput(event)) return;

      if (this.handleNonNumericInput(event)) return;
    },
    inputNumber(event) {
      if (this.handleMobileInput(event)) return;

      if (this.handleAboveCharacterInNumber(event)) return;

      if (this.handleBackspaceInput(event)) return;

      if (this.handleNumericInputNumpad(event)) return;

      if (this.handleNumericInput(event)) return;

      if (this.handleNonNumericInput(event)) return;
    },
    inputAlphabet(event) {
      if (this.handleSpecialCharacterInput(event)) return;

      if (this.handleAboveCharacterInNumber(event)) return;

      if (this.handleSpacebarInput(event)) return;

      if (this.handleBackspaceInput(event)) return;

      if (this.handleLetterInput(event)) return;

      if (this.handleNonLetterInput(event)) return;
    },
    handleMobileInput(event) {
      if (this.value.length == 10 && this.type == "mobile") {
        event.preventDefault();
        return true;
      }
    },
    handleSpacebarInput(event) {
      // space (32)
      return event.keyCode == 32;
    },
    handleBackspaceInput(event) {
      // backspace (8) // delete (46)
      return event.keyCode == 8 || event.keyCode == 46;
    },
    handleNumericInput(event) {
      // 0 (48) // 9 (57)
      return event.keyCode >= 48 && event.keyCode <= 57;
    },
    handleNumericInputNumpad(event) {
      // 0 (96) // 9 (105)
      return event.keyCode >= 96 && event.keyCode <= 105;
    },
    handleLetterInput(event) {
      // A (65) // Z (90)
      return event.keyCode >= 65 && event.keyCode <= 90;
    },
    handleSpecialCharacterInput(event) {
      if (this.handleSpecialCharacterAsFirstInput(event)) return;

      if (this.specialCharacters.length > 0) {
        return this.specialCharacters.includes(event.key);
      }
    },
    handleNonNumericInput(event) {
      if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault();
        return;
      }

      if (event.keyCode < 96 || event.keyCode > 105) {
        event.preventDefault();
        return;
      }
    },
    handleNonLetterInput(event) {
      if (event.keyCode < 65 || event.keyCode > 90) {
        event.preventDefault();
        return;
      }
    },
    handleAboveCharacterInNumber(event) {
      if (event.shiftKey && event.keyCode >= 48 && event.keyCode <= 57) {
        event.preventDefault();
        return;
      }
    },
    handleDecimalInput(event) {
      // period (190) // period in numpad (110)
      if (event.keyCode == 190 || event.keyCode == 110) {
        if (this.value.indexOf(".") !== -1) {
          event.preventDefault();
        }
        return true;
      }
    },
    handleSpecialCharacterAsFirstInput(event) {
      if (this.type == "email") {
        const emailSpecialCharacters = ["@", "."];
        const specialCharacters = this.specialCharacters;

        // merge and remove the duplicate character
        let result = specialCharacters.concat(emailSpecialCharacters);
        result = result.filter((item, index) => result.indexOf(item) === index);

        this.specialCharacters = result;
      }

      if (
        this.value.length == 0 &&
        this.specialCharacters.includes(event.key)
      ) {
        // handle special character as first input
        event.preventDefault();
        return true;
      }
    },
    handleSpecialCharacterAsLastInput(value) {
      if (value == null) return;

      if (value.length == 0) return;

      const lastInput = value.toString().slice(-1);
      return this.specialCharacters.includes(lastInput) && lastInput != ".";
    },
    handleEmailAddressInput(event) {
      if (this.type == "email") {
        if (this.handleSpecialCharacterAsFirstInput(event)) return;

        if (this.handleSpacebarInput(event)) {
          event.preventDefault();
          return;
        }

        if (event.shiftKey && event.keyCode == "50") {
          if (this.value.indexOf("@") !== -1) {
            event.preventDefault();
          }
          return true;
        }

        // period (190) // period in numpad (110)
        return event.keyCode == 190 || event.keyCode == 110;
      }
    },
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

      if (this.handleSpecialCharacterAsLastInput(value) && this.required) {
        this.message = `This input is invalid!`;
        return true;
      }

      if (this.type == "email") {
        //  check email format
        const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        const result = regex.test(value);

        if (!result) {
          this.message = "Email address invalid format!";
          return true;
        }
      }

      return false;
    },
  },
};
</script>

<style>
/* Outlined */
.textfield-container .v-text-field--outlined fieldset,
.textfield-container .v-text-field--outlined:hover fieldset {
  border: 1px solid var(--input-border-primary) !important;
}

.textfield-container
  .v-text-field--outlined.v-text-field-is--disabled
  fieldset {
  background: var(--input-background-disabled) !important;
}

.textfield-container .v-text-field--outlined.v-text-field-has--error fieldset,
.textfield-container
  .v-text-field--outlined.v-text-field-has--error:hover
  fieldset {
  border: 1px solid var(--input-border-error) !important;
}

/* Non Outlined */
.textfield-container .v-text-field .v-input__slot:after {
  border: none;
  border-color: var(--input-border-primary) !important;
}

.textfield-container .v-text-field > .v-input__control > .v-input__slot:before {
  border-color: var(--input-border-primary) !important;
}

.textfield-container
  .v-text-field.v-text-field-has--error
  > .v-input__control
  > .v-input__slot:before {
  border-color: var(--input-border-error) !important;
}

/* Prefix */
.textfield-container .v-text-field__prefix {
  color: var(--input-text-secondary) !important;
  caret-color: var(--input-text-secondary) !important;
}

/* Icon */
.textfield-container .v-icon {
  color: var(--input-text-secondary) !important;
  caret-color: var(--input-text-secondary) !important;
}

.textfield-container input {
  color: var(--input-text-primary) !important;
}
</style>

<style scoped>
.label {
  color: var(--input-text-secondary);
}

.label.outlined {
  color: var(---input-text-primary);
}

.label,
.message {
  font-size: 12px;
}

.message {
  color: var(--input-text-error) !important;
}

.textfield-container {
  margin-bottom: 10px;
}

.v-input:not(.v-text-field--outlined) {
  padding-block: 0px;
}

.v-input:not(.v-text-field--outlined) >>> .v-text-field__slot {
  padding-bottom: 5px;
}
</style>
