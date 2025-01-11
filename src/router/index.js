import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home.vue";
import Amount from "@/views/inputs/Amount.vue";
import Disabled from "@/views/inputs/Disabled.vue";
import Dropdown from "@/views/inputs/Dropdown.vue";
import Email from "@/views/inputs/Email.vue";
import Mobile from "@/views/inputs/Mobile.vue";
import Number from "@/views/inputs/Number.vue";
import Text from "@/views/inputs/Text.vue";
import Switches from "@/views/inputs/Switches.vue";
import CardList from "@/views/inputs/CardList.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/amount",
    component: Amount,
  },

  {
    path: "/disabled",
    component: Disabled,
  },

  {
    path: "/dropdown",
    component: Dropdown,
  },

  {
    path: "/email",
    component: Email,
  },

  {
    path: "/mobile",
    component: Mobile,
  },

  {
    path: "/number",
    component: Number,
  },

  {
    path: "/text",
    component: Text,
  },

  {
    path: "/switch",
    component: Switches,
  },

  {
    path: "/list",
    component: CardList,
  },
];

export default new Router({
  mode: "history",
  routes,
});
