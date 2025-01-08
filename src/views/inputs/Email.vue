<template>
  <div>
    <TextField
      ref="text"
      placeholder="Enter the email address"
      type="email"
      :outlined="false"
    />
    <TextField ref="text2" placeholder="Enter the email address" type="email" />

    <Button ref="btnBack" @click="onBack"> Return Home </Button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import TextField from "@/components/TextField.vue";

export default {
  components: {
    Button,
    TextField,
  },
  computed: {
    text() {
      return this.$refs.text.value;
    },
    text2() {
      return this.$refs.text2.value;
    },
  },
  mounted() {
    this.userInput("text");
    this.userInput("text2");
  },
  methods: {
    userInput(name) {
      this.$watch(
        () => {
          return this[name];
        },
        (value) => {
          console.log(value);
        }
      );
    },
    onBack() {
      this.$router.go(-1);
    },
  },
};
</script>
