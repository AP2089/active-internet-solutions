import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import router from '@/router';
import i18n from '@/plugins/i18n';
import App from '@/App.vue';
import tooltip from '@/directives/tooltip.js';
import '@/assets/styles/main';
import 'vue-toastification/dist/index.css';

const pinia = createPinia();
const app = createApp(App);

app
  .use(i18n)
  .use(pinia)
  .use(router)
  .use(Toast)
  .directive('tooltip', tooltip)
  .mount('#app');