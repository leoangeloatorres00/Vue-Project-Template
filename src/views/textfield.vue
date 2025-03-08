<template>
  <Layout>
    <template v-slot:content>
      <Editor>
        <template v-slot:element>
          <TextField
            ref="textfield"
            :type="type"
            :label="label"
            :placeholder="placeholder"
            :outlined="isOutlined"
            :disabled="isDisabled"
            :required="isRequired"
          >
            <template v-slot:label v-if="isCustomLabel">
              <v-icon>mdi-check-circle</v-icon>
              Input
            </template>
            <template v-slot:prepend v-if="isPrepend">
              <v-icon>mdi-currency-php</v-icon>
            </template>
            <template v-slot:append v-if="isAppend">
              <v-icon>mdi-magnify</v-icon>
            </template>
          </TextField>
        </template>

        <template v-slot:radio>
          <Radio ref="inputType" :lists="types" :vertical="isVertical" />
        </template>

        <template v-slot:checkbox>
          <Checkbox ref="required">Required</Checkbox>
          <Checkbox ref="outlined">Outlined</Checkbox>
          <Checkbox ref="disabled">Disabled</Checkbox>
          <Checkbox ref="append">Add Append Icon</Checkbox>
          <Checkbox ref="prepend">Add Prepend Icon</Checkbox>
          <Checkbox ref="customLabel">Add Custom Label</Checkbox>
        </template>

        <template v-slot:source>
          &emsp;&lt;TextField{{ attributes }}&gt;
          <template v-if="isSlotExist">
            <br />
          </template>
          <template v-if="isCustomLabel">
            &emsp;&emsp;&lt;template v-slot:label&gt; <br />
            &emsp;&emsp;&emsp;&lt;v-icon&gt;mdi-check-circle&lt;/v-icon&gt;
            <br />
            &emsp;&emsp;&emsp;Input <br />
            &emsp;&emsp;&lt;/template&gt; <br />
          </template>
          <template v-if="isPrepend">
            &emsp;&emsp;&lt;template v-slot:prepend&gt; <br />
            &emsp;&emsp;&emsp;&lt;v-icon&gt;mdi-currency-php&lt;/v-icon&gt;
            <br />
            &emsp;&emsp;&lt;/template&gt; <br />
          </template>
          <template v-if="isAppend">
            &emsp;&emsp;&lt;template v-slot:append&gt; <br />
            &emsp;&emsp;&emsp;&lt;v-icon&gt;mdi-magnify&lt;/v-icon&gt;
            <br />
            &emsp;&emsp;&lt;/template&gt; <br />
          </template>
          <template v-if="isSlotExist">&nbsp;&nbsp;&nbsp;</template>
          &lt;/TextField&gt;
        </template>
      </Editor>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/layouts/index.vue";
import Editor from "@/layouts/editor.vue";

import Radio from "@/components/elements/radio.vue";
import Checkbox from "@/components/elements/checkbox.vue";
import TextField from "@/components/elements/text_field.vue";

import { observeInput } from "@/utils";
import { onCheck } from "@/utils/editor";

export default {
  components: {
    Layout,
    Editor,
    Radio,
    Checkbox,
    TextField,
  },
  data: () => {
    return {
      isAppend: false,
      isPrepend: false,
      isOutlined: false,
      isDisabled: false,
      isRequired: true,
      isVertical: true,
      isCustomLabel: false,

      type: "",
      label: "",
      placeholder: "",
      attributes: "",

      types: ["Text", "Number", "Amount", "Mobile", "Email"],

      payload: {
        attributes: "",
        attribute: "",
        isCheck: false,
      },
    };
  },
  mounted() {
    let attribute = 'label="Input"';

    this.label = this.isCustomLabel ? "" : "Input";

    this.onCheck(attribute, true);

    attribute = 'placeholder="Enter input"';

    this.placeholder = "Enter input";

    this.onCheck(attribute, true);

    this.required.value = true;

    this.onInputType();

    observeInput(this.append, this.onAppend);
    observeInput(this.prepend, this.onPrepend);
    observeInput(this.required, this.onRequired);
    observeInput(this.outlined, this.onOutlined);
    observeInput(this.disabled, this.onDisabled);
    observeInput(this.inputType, this.onInputType);
    observeInput(this.customLabel, this.onCustomLabel);

    this.isVertical = true;
    if (window.innerWidth > 700) {
      this.isVertical = false;
    }

    window.addEventListener("resize", (event) => {
      this.isVertical = true;
      if (event.currentTarget.innerWidth > 700) {
        this.isVertical = false;
      }
    });
  },
  computed: {
    append() {
      return this.$refs.append;
    },
    prepend() {
      return this.$refs.prepend;
    },
    outlined() {
      return this.$refs.outlined;
    },
    disabled() {
      return this.$refs.disabled;
    },
    required() {
      return this.$refs.required;
    },
    textfield() {
      return this.$refs.textfield;
    },
    inputType() {
      return this.$refs.inputType;
    },
    customLabel() {
      return this.$refs.customLabel;
    },
    isSlotExist() {
      return this.isAppend || this.isPrepend || this.isCustomLabel;
    },
  },
  methods: {
    onInputType() {
      this.emptyTextField();

      const index = this.inputType.value;

      this.types.forEach((item) => {
        const attribute = `type="${item.toLowerCase()}"`;
        this.onCheck(attribute, false);
      });

      this.type = this.types[index].toLowerCase();

      const attribute = `type="${this.types[index].toLowerCase()}"`;
      this.onCheck(attribute, true);
    },
    onRequired() {
      const attribute = 'required="false"';
      const isCheck = this.required.value;

      this.isRequired = isCheck;

      this.onCheck(attribute, !isCheck);
    },
    onOutlined() {
      const attribute = "outlined";
      const isCheck = this.outlined.value;

      this.isOutlined = isCheck;

      this.onCheck(attribute, isCheck);
    },
    onDisabled() {
      const attribute = "disabled";
      const isCheck = this.disabled.value;

      this.isDisabled = isCheck;

      this.onCheck(attribute, isCheck);
    },
    onCustomLabel() {
      const attribute = 'label="Input"';
      const isCheck = this.customLabel.value;

      this.isCustomLabel = isCheck;
      this.label = isCheck ? "" : "Input";

      this.onCheck(attribute, !isCheck);
    },
    onAppend() {
      const isCheck = this.append.value;
      this.isAppend = isCheck;

      this.emptyTextField();
    },
    onPrepend() {
      const isCheck = this.prepend.value;
      this.isPrepend = isCheck;

      this.emptyTextField();
    },
    onCheck(attribute, isCheck) {
      this.payload.attribute = attribute;
      this.payload.isCheck = isCheck;

      this.emptyTextField();

      onCheck(this.payload);

      this.attributes = this.payload.attributes;
    },
    emptyTextField() {
      if (this.textfield != undefined) {
        this.textfield.value = "";
        this.textfield.message = "";
      }
    },
  },
};
</script>
