import Vue from "vue";
import Router from "vue-router";

import { lazyLoad } from "@/utils";

Vue.use(Router);

const routes = [
  {
    path: "/textfield",
    name: "/textfield",
    component: lazyLoad("textfield"),
    meta: {
      isRegistered: false,
    },
  },
  {
    path: "/button",
    name: "/button",
    component: lazyLoad("button"),
    meta: {
      isRegistered: false,
    },
  },
  {
    path: "/dropdown",
    name: "/dropdown",
    component: lazyLoad("dropdown"),
    meta: {
      isRegistered: false,
    },
  },
  {
    path: "/switch",
    name: "/switch",
    component: lazyLoad("switch"),
    meta: {
      isRegistered: false,
    },
  },
];

const router = new Router({
  mode: "history",
  routes,
  methods: {
    go(name, query) {
      return go(name, query);
    },
  },
});

router.beforeEach(async (to, from, next) => {
  next();
});

export default router;

// External Methods
const go = (name, query = {}) => {
  let payload = {};

  payload.name = name;
  payload.query = query;
  router.push(payload);
};
