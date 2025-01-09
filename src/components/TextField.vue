<template>
  <div classs="container">
    <div class="title-container" v-if="onTitle">
      <v-icon small class="icon">{{ titleicon }}</v-icon>
      <span class="input-title">{{ title }}</span>
    </div>
    <v-text-field
      outlined
      :class="addClass"
      :readonly="readonly"
      :disabled="disabled"
      v-model="value"
      hide-details="true"
      :placeholder="placeholder"
      @keydown="onKeyDown"
      @keyup="onKeyUp"
      @keyup.native.enter="$refs[uniqueIdentifier].blur()"
      @blur="onBlur"
      @focus="onFocus"
      :prefix="onPrefix"
      :prepend-icon="onPrepend"
    />
    <p class="message" v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: () => {
        return "";
      },
    },
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    titleicon: {
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
    readonly: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    type: {
      type: String,
      default: () => {
        return "";
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
    addClass: function () {
      if (!this.outlined) return "regular";

      return this.message != "" ? "v-text-field--error" : "";
    },
    onPrefix: function () {
      if (this.type == "amount") return "PHP";
      if (this.type == "mobile") return "+63";

      return "";
    },
    onPrepend: function () {
      return "";
    },
    onTitle: function () {
      return this.title != "";
    },
  },
  methods: {
    onKeyUp(event) {
      switch (this.type) {
        case "email":
          this.isInputEmail(event);
          break;
      }
    },
    onKeyDown(event) {
      switch (this.type) {
        case "number":
          this.isInputNumber(event);
          break;
        case "amount":
          this.isInputAmount(event);
          break;
        case "mobile":
          this.isInputMobile(event);
          break;
      }
    },
    onBlur() {
      if (this.type == "amount" && this.value != "") {
        const number = this.value;
        this.formatAmount(number);
      }
    },
    onFocus() {
      if (this.type == "amount" && this.value != "") {
        let formattedAmount = this.value.split(".");

        // remove the .00 in amount in whole number
        if (formattedAmount[1] == "00") {
          this.value = formattedAmount[0];
        }

        // remove comma in amount
        if (this.value % 1 != 0) {
          this.value = this.value.replaceAll(",", "");
        }
      }
    },
    formatAmount(number) {
      const options = {
        style: "decimal",
      };

      // add comma in amount
      let formattedNumber = parseFloat(number).toLocaleString(
        undefined,
        options
      );

      // add .00 when amount is whole amount
      if (formattedNumber.indexOf(".") == -1) {
        formattedNumber += ".00";
      }

      this.value = formattedNumber;
    },
    isInputNumber(event) {
      if (this.isBackSpacePressed(event)) return;

      if (this.isTabPressed(event)) return;

      if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault();
      }
    },
    isInputAmount(event) {
      this.isDecimalExist(event);

      if (this.isDecimalPressed(event)) return;

      this.isInputNumber(event);
    },
    isInputMobile(event) {
      if (this.readonly) return;

      if (!this.isBackSpacePressed(event)) {
        this.isInputNumber(event);

        if (this.value.length > 9) {
          event.preventDefault();
          return;
        }
      }

      if (this.isBackSpacePressed(event) && this.value.length <= 10) {
        this.message = "Invalid mobile format";
        return;
      }

      if (this.value.length >= 0 && this.value.length < 9) {
        this.message = "Invalid mobile format";
        return;
      }

      this.message = "";
    },
    isInputEmail() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(this.value)) {
        this.message = "Invalid email address format";
        return;
      }

      this.message = "";
    },
    isDecimalPressed(event) {
      return event.keyCode == 190;
    },
    isBackSpacePressed(event) {
      return event.keyCode == 8;
    },
    isTabPressed(event) {
      return event.keyCode == 9;
    },
    isDecimalExist(event) {
      const isNumberDecimal = this.value % 1 != 0;
      if (isNumberDecimal) this.isInputNumber(event);
    },
  },
};
</script>

<style>
.v-text-field--outlined:not(.regular) fieldset,
.v-text-field--outlined:not(.regular):hover fieldset {
  border: solid thin var(--border-color) !important;
}

.v-text-field--outlined.regular fieldset,
.v-text-field--outlined.regular:hover fieldset {
  border: 5px solid transparent;
  border-bottom: solid thin var(--border-color) !important;
}

.v-text-field--outlined.regular .v-input__slot {
  padding: 0 20px !important;
}

.v-text-field--error fieldset,
.v-text-field--error:hover fieldset {
  border: solid thin var(--border-error-color) !important;
}

.v-text-field__prefix {
  color: var(--prefix-color-icon) !important;
}

.v-input__icon--prepend i.primary--text {
  color: var(--prepend-color-icon) !important;
}
</style>

<style scoped>
.container {
  margin: 10px;
  padding: 10px;
}

.message {
  margin: 5px 0px 0px;
  padding: 5px 0px 0px;

  color: var(--error-color);
}

.title-container {
  margin-top: 16px;
  margin-bottom: 4px;
}

.input-title {
  margin-left: 4px;
  font-size: 12px;
}
</style>
