<template>
  <Layout>
    <template v-slot:content>
      <Editor>
        <template v-slot:element>
          <Switches :items="genderLists"></Switches>
        </template>

        <template v-slot:checkbox> No options </template>

        <template v-slot:source>
          &emsp;&lt;Switches{{ attributes }}&gt;&lt;/Switches&gt;
        </template>
      </Editor>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/layouts/index.vue";
import Editor from "@/layouts/editor.vue";

import Switches from "@/components/elements/switches.vue";

import { gender } from "@/data/gender";

import { onCheck } from "@/utils/editor";

export default {
  components: {
    Layout,
    Editor,
    Switches,
  },
  data: () => {
    return {
      genderLists: [],

      payload: {
        attributes: "",
        attribute: "",
        isCheck: false,
      },
    };
  },
  mounted() {
    const attribute = ":items='genderLists'";

    this.onCheck(attribute, true);

    this.genderLists = gender;
  },
  methods: {
    onCheck(attribute, isCheck) {
      this.payload.attribute = attribute;
      this.payload.isCheck = isCheck;

      onCheck(this.payload);

      this.attributes = this.payload.attributes;
    },
  },
};
</script>
