<template>
  <div>
    <TextField
      ref="text"
      placeholder="Enter the first name"
      :disabled="true"
      :outlined="false"
    />
    <TextField
      ref="text2"
      placeholder="Enter the first name"
      :disabled="true"
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
  computed: {
    text() {
      return this.$refs.text.value;
    },
  },
  mounted() {
    this.$refs.text.value = "Juan Dela Cruz";
    this.$refs.text2.value = "Juan Dela Cruz Jr.";

    this.userInput("text");
    this.userInput("text2");
  },
  methods: {
    userInput(name) {
      this.$watch(
        () => this[name],
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
