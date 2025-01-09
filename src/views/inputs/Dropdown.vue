<template>
  <div>
    <div class="container">
      <Dropdown
        ref="state"
        :items="items"
        keys="state"
        placeholder="Select state"
      />
    </div>

    <Button ref="btnBack" @click="onBack"> Return Home </Button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Dropdown from "@/components/Dropdown.vue";

export default {
  components: {
    Button,
    Dropdown,
  },
  data: () => {
    return {
      items: [
        { state: "Florida", abbr: "FL" },
        { state: "Georgia", abbr: "GA" },
        { state: "Nebraska", abbr: "NE" },
        { state: "California", abbr: "CA" },
        { state: "New York", abbr: "NY" },
      ],
    };
  },
  computed: {
    state() {
      return this.$refs.state.value;
    },
  },
  mounted() {
    this.userInput("state");
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
