<template>
  <div class="container">
    <Switches ref="gender" :items="items" />

    <Button ref="btnBack" @click="onBack"> Return Home </Button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Switches from "@/components/Switches.vue";

export default {
  components: {
    Button,
    Switches,
  },
  data: () => {
    return {
      items: ["Male", "Female"],
    };
  },
  computed: {
    gender: function () {
      return this.$refs.gender.value;
    },
  },
  methods: {
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
