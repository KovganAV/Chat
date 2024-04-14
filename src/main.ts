import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import timeago from "vue-timeago3";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPaperPlane,
  faRightFromBracket,
  faEye,
  faEyeSlash,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPaperPlane,
  faRightFromBracket,
  faEye,
  faEyeSlash,
  faPen,
  faTrash
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(createPinia())
  .use(timeago)
  .use(router)
  .mount("#app");
