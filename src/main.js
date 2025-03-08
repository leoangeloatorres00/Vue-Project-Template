import Vue from "vue";
import App from "@/App.vue";

import router from "@/router";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

Vue.prototype.CURRENCY_LABEL = "PHP";

Vue.prototype.COUNTRY_CODE_LABEL = "+63";

Vue.prototype.routes = router.options.methods;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
