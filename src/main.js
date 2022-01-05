import * as Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import BootstrapVue3 from "bootstrap-vue-3";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const app = Vue.createApp(App);
app.use(BootstrapVue3);
app.use(VueAxios, axios);
app.mount("#app");
