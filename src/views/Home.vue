<template>
  <div class="container">
    <h4>Input</h4>
    <div class="container">
      <template v-for="(input, index) in inputs">
        <v-card class="my-2" :key="index" @click="onRoute(input)">
          <v-card-text>INPUT {{ input.toUpperCase() }}</v-card-text>
        </v-card>
      </template>
    </div>
    <h4>Button</h4>

    <Button ref="btnAPICall" @click="onAPICall" :loading="true">
      API Call Button
    </Button>

    <Button ref="btnAlert" @click="onAlertShow"> Show Alert Button </Button>

    <Button ref="btnDisabled" :disable="!disable"> Disabled Button </Button>

    <Button ref="btnLoading" @click="onLoadingShow" :loading="true">
      Show Loading Button
    </Button>

    <Button
      ref="btnOverlayLoading"
      @click="onOverlayLoadingShow"
      :overlayLoading="true"
    >
      Show Overlay Loading Button
    </Button>

    <Alert ref="alert" :title="title" :content="content" />
  </div>
</template>

<script>
import { getUsers } from "@/api/users.js";

import Alert from "@/components/Alert.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    Alert,
    Button,
  },
  data: () => {
    return {
      getUsers,

      disable: false,

      title: "",
      content: "",

      inputs: [
        "amount",
        "disabled",
        "number",
        "email",
        "text",
        "dropdown",
        "mobile",
      ],
    };
  },
  methods: {
    async getAllUsers() {
      const { users } = await this.getUsers();
      if (users != undefined) {
        this.$refs.btnAPICall.onComplete();

        const self = this;
        setTimeout(() => {
          self.title = "Alert";
          self.content = "API Call Success";

          self.$refs.alert.show = true;
        }, 1100);
      }
    },
    onAPICall() {
      this.getAllUsers();
    },
    onLoadingShow() {
      const self = this;
      setTimeout(() => {
        self.$refs.btnLoading.onComplete();
      }, 1000);
    },
    onOverlayLoadingShow() {
      const self = this;
      setTimeout(() => {
        self.$refs.btnOverlayLoading.onComplete();
      }, 1000);
    },
    onAlertShow() {
      this.title = "Alert";
      this.content =
        "Lorem ipsum is the most well known filler text and comes from various passages of a book from Cicero, written in 45 BC.";
      this.$refs.alert.show = true;
    },
    onRoute(route) {
      this.$router.push(`/${route}`);
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
