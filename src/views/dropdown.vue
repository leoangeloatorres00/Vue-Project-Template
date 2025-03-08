<template>
  <Layout>
    <template v-slot:content>
      <Editor>
        <template v-slot:element>
          <Dropdown
            ref="fastFood"
            label="Fast Food"
            placeholder="Select fast food"
            :lists="fastFoodLists"
          />
        </template>

        <template v-slot:checkbox> No options </template>

        <template v-slot:source>
          &emsp;&lt;Dropdown{{ attributes }}&gt;&lt;/Dropdown&gt;
        </template>
      </Editor>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/layouts/index.vue";
import Editor from "@/layouts/editor.vue";

import Dropdown from "@/components/elements/dropdown.vue";

import { onCheck } from "@/utils/editor";
import { sortList } from "@/utils/data";

import { fastFood } from "@/data/fast_food";

export default {
  components: {
    Layout,
    Editor,
    Dropdown,
  },
  data: () => {
    return {
      isDisabled: false,

      label: "",
      placeholder: "",
      attributes: "",

      fastFoodLists: [],

      payload: {
        attributes: "",
        attribute: "",
        isCheck: false,
      },
    };
  },
  mounted() {
    this.label = "State/Province";
    this.placeholder = "Select state/province";

    let attribute = `label="${this.label}"`;

    this.onCheck(attribute, true);

    attribute = `placeholder="${this.placeholder}"`;

    this.onCheck(attribute, true);

    attribute = `:lists="provinceLists"`;

    this.onCheck(attribute, true);

    this.fastFoodLists = this.getFastFood();
  },
  methods: {
    getFastFood() {
      let lists = [];

      fastFood.forEach((item) => {
        lists.push(item);
      });

      return sortList(lists, "key");
    },
    onCheck(attribute, isCheck) {
      this.payload.attribute = attribute;
      this.payload.isCheck = isCheck;

      onCheck(this.payload);

      this.attributes = this.payload.attributes;
    },
  },
};
</script>
