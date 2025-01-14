<template>
  <div class="container">
    <TextField
      ref="text"
      placeholder="Enter the first name"
      title="First Name"
      :titleicon="icon"
      :disabled="true"
      :outlined="false"
    />

    <TextField
      ref="text2"
      placeholder="Enter the first name"
      title="First Name"
      :disabled="true"
    />

    <Button ref="btnBack" @click="onBack"> Return Home </Button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import TextField from "@/components/TextField.vue";

import { userInput } from "@/utils/data.js";

export default {
  components: {
    Button,
    TextField,
  },
  data: () => {
    return {
      icon: "mdi-check-circle",
    };
  },
  computed: {
    text() {
      return this.$refs.text.value;
    },
  },
  mounted() {
    this.$refs.text.value = "Juan Dela Cruz";
    this.$refs.text2.value = "Juan Dela Cruz Jr.";

    userInput(this, "text", this.onTest);
    userInput(this, "text2", this.onTest);
  },
  methods: {
    onTest() {
      if (this.text != "") {
        console.log(this.text);
        return;
      }

      if (this.text2 != "") {
        console.log(this.text2);
        return;
      }
    },
    onBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 10px;
  padding: 10px;
}
</style>
