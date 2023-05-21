import { createApp } from "vue";
import App from "../src/App.vue";
import registerComponents from "@/register-components";
import "@mdi/font/css/materialdesignicons.min.css";
import { useApiStore } from "./app/stores/apiStore";
import { createPinia } from "pinia";

import "@/app/assets/styles/index.scss";

const app = createApp(App);
const pinia = createPinia();
app.use(registerComponents);
app.use(pinia);

// Создаем API
useApiStore().CreateAPI();

app.mount("#app");
