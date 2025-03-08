<template>
  <div>
    <div class="image-wrapper" @click="onClick()">
      <div class="image" v-if="prefix">
        <v-img :src="image"></v-img>
      </div>
      <div class="text" v-html="text"></div>
      <div class="image" v-if="!prefix">
        <v-img :src="image"></v-img>
      </div>
    </div>
  </div>
</template>

<script>
import { lazyLoadImage } from "@/utils";

export default {
  props: {
    prefix: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    text: {
      type: String,
      default: () => {
        return "";
      },
    },
    src: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data: () => {
    return {
      image: "",
    };
  },
  mounted() {
    this.image = lazyLoadImage(this.src);
  },
  methods: {
    onClick() {
      const self = this;
      self.$emit("click", true);
    },
  },
};
</script>

<style scoped>
.image-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
