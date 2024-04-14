import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login/Login.vue";
import Registration from "../pages/Registration/Registration.vue";
import Chat from "../pages/Chat/Chat.vue";
import { getSessionFromStorage } from "@/helpers/tokens";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/registration",
    name: "registration",
    component: Registration,
  },
  {
    path: "/",
    name: "chat",
    meta: { auth: true },
    component: Chat,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token: string | null = getSessionFromStorage();
  const requireAuth: boolean = to.matched.some((record) => record.meta.auth);

  if (!token && requireAuth) {
    next("/login");
  } else if (token && !requireAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
