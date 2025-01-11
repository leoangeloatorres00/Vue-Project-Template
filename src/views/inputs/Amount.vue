<template>
  <div class="container">
    <TextField
      ref="text"
      placeholder="0.00"
      type="amount"
      title="Amount"
      :titleicon="icon"
      :outlined="false"
    />

    <TextField
      ref="text2"
      placeholder="Enter the amount"
      type="amount"
      title="Amount"
    />

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
  data: () => {
    return {
      icon: "mdi-check-circle",
    };
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

<style scoped>
.container {
  margin: 10px;
  padding: 10px;
}
</style>
