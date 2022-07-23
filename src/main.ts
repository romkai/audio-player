import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import "@/assets/style/style.scss";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
