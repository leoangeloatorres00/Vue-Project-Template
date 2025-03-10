<template>
  <v-dialog v-model="show" width="350" persistent>
    <v-card class="alert-wrapper">
      <Layout>
        <template v-slot:header>
          <h3 v-if="!isTitleEmpty">{{ title }}</h3>
        </template>
        <template v-slot:content>
          <Images v-if="!isImageEmpty" :src="image"></Images>
          <div :class="isTextContentCenter" v-html="content"></div>
        </template>
        <template v-slot:footer>
          <slot></slot>
        </template>
      </Layout>
    </v-card>
  </v-dialog>
</template>

<script>
import Layout from "@/layouts/index.vue";
import Images from "@/components/elements/image.vue";

export default {
  components: {
    Layout,
    Images,
  },
  props: {
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    image: {
      type: String,
      default: () => {
        return "";
      },
    },
    content: {
      type: String,
      default: () => {
        return "";
      },
    },
    center: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    isImageEmpty() {
      return this.image == "";
    },
    isTitleEmpty() {
      return this.title == "";
    },
    isTextContentCenter() {
      return this.center ? "center" : "";
    },
  },
};
</script>

<style>
.alert-wrapper .wrapper {
  min-height: 180px !important;
  height: 100% !important;
}

.alert-wrapper header {
  padding: 0px 20px;
}

.alert-wrapper header h3 {
  padding: 20px 0px 0px;
}

.alert-wrapper main {
  padding: 20px 20px 0px;
}

.alert-wrapper main p {
  margin: 0px 0px 8px;
}

.alert-wrapper main div.center {
  text-align: center;
}

.alert-wrapper footer {
  padding: 20px 10px;
}

.alert-wrapper .container {
  max-width: 350px !important;
}
</style>
