<template>
  <Layout>
    <template v-slot:content>
      <Editor>
        <template v-slot:element>
          <Button
            ref="button"
            :type="type"
            :rounded="isRounded"
            :disabled="isDisabled"
            :loading="isLoading"
            :overlayLoading="isOverlay"
            @click="onClick"
          >
            <template v-if="isCustomLabel">
              <v-icon>mdi-check-circle</v-icon>
              Submit
            </template>
            <template v-else> Submit </template>
          </Button>
        </template>

        <template v-slot:radio>
          <Radio ref="buttonType" :lists="types" :vertical="isVertical" />

          <Radio ref="loadingType" :lists="types2" :vertical="isVertical" />
        </template>

        <template v-slot:checkbox>
          <Checkbox ref="disabled">Disabled</Checkbox>
          <Checkbox ref="rounded">Rounded</Checkbox>
          <Checkbox ref="customLabel">Add Custom Label</Checkbox>
        </template>

        <template v-slot:source>
          &emsp;&lt;Button{{ attributes }}&gt;
          <template v-if="isSlotExist">
            <br />
          </template>
          <template v-if="isCustomLabel">
            &emsp;&emsp;&lt;v-icon&gt;mdi-check-circle&lt;/v-icon&gt;
            <br />
            &emsp;&emsp;Submit<br />
          </template>
          <template v-if="!isCustomLabel">Submit</template>
          <template v-if="isSlotExist">&nbsp;&nbsp;&nbsp;</template>
          &lt;/Button&gt;
        </template>
      </Editor>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/layouts/index.vue";
import Editor from "@/layouts/editor.vue";

import Radio from "@/components/elements/radio.vue";
import Button from "@/components/elements/button.vue";
import Checkbox from "@/components/elements/checkbox.vue";

import { observeInput } from "@/utils";

import { onCheck } from "@/utils/editor";

export default {
  components: {
    Layout,
    Editor,
    Radio,
    Button,
    Checkbox,
  },
  data: () => {
    return {
      isVertical: false,
      isRounded: false,
      isDisabled: false,
      isLoading: false,
      isOverlay: false,
      isCustomLabel: false,

      type: "",
      attributes: "",

      types: ["Primary", "Secondary", "Text"],

      types2: ["None", "Overlay Loading", "Loading"],

      payload: {
        attributes: "",
        attribute: "",
        isCheck: false,
      },
    };
  },
  mounted() {
    this.onButtonType();

    observeInput(this.buttonType, this.onButtonType);
    observeInput(this.loadingType, this.onLoadingType);
    observeInput(this.rounded, this.onRounded);
    observeInput(this.disabled, this.onDisabled);
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
    rounded() {
      return this.$refs.rounded;
    },
    disabled() {
      return this.$refs.disabled;
    },
    customLabel() {
      return this.$refs.customLabel;
    },
    buttonType() {
      return this.$refs.buttonType;
    },
    loadingType() {
      return this.$refs.loadingType;
    },
    isSlotExist() {
      return this.isCustomLabel;
    },
  },
  methods: {
    onButtonType() {
      const index = this.buttonType.value;

      this.types.forEach((item) => {
        const attribute = `type="${item.toLowerCase()}"`;
        this.onCheck(attribute, false);
      });

      this.type = this.types[index].toLowerCase();

      if (index != 0) {
        const attribute = `type="${this.types[index].toLowerCase()}"`;
        this.onCheck(attribute, true);
      }
    },
    onLoadingType() {
      const index = this.loadingType.value;

      this.types2.forEach((item) => {
        let attribute = `${item.toLowerCase()}`;

        if (item == "Overlay Loading") {
          attribute = "overlayLoading";
        }

        this.onCheck(attribute, false);
      });

      this.isLoading = index == 2;
      this.isOverlay = index == 1;

      let attribute = `${this.types2[index].toLowerCase()}`;
      let isCheck = true;

      if (attribute == "overlay loading") {
        attribute = "overlayLoading";
      }

      if (attribute == "none") {
        attribute = "none";
        isCheck = false;
      }

      this.onCheck(attribute, isCheck);
    },
    onRounded() {
      const attribute = "rounded";
      const isCheck = this.rounded.value;

      this.isRounded = isCheck;

      this.onCheck(attribute, isCheck);
    },
    onDisabled() {
      const attribute = "disabled";
      const isCheck = this.disabled.value;

      this.isDisabled = isCheck;

      this.onCheck(attribute, isCheck);
    },
    onCustomLabel() {
      const isCheck = this.customLabel.value;
      this.isCustomLabel = isCheck;
    },
    onCheck(attribute, isCheck) {
      this.payload.attribute = attribute;
      this.payload.isCheck = isCheck;

      onCheck(this.payload);

      this.attributes = this.payload.attributes;
    },
    onClick() {
      const self = this;
      setTimeout(() => {
        self.$refs.button.onComplete();
      }, 3000);
    },
  },
};
</script>
