import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;

new Vue({
  render: h =>
    h(App, {
      props: {
        name: process.env.VUE_APP_NAME
      }
    })
}).$mount("#app");
