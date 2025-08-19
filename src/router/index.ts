import { createRouter, createWebHistory } from "vue-router";
import { useUser } from "@clerk/vue";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import NewBookmark from "@/views/NewBookmark.vue";
import EditBookmark from "@/views/EditBookmark.vue";
import SignIn from "@/views/SignIn.vue"
import SignUp from "@/views/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/bookmarks",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/bookmark",
    name: "Bookmark",
    component: NewBookmark,
    meta: { requiresAuth: true },
  },
  {
    path: "/bookmark/edit/:id",
    name: "EditBookmark",
    component: EditBookmark,
    meta: { requiresAuth: true },
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { isLoaded, isSignedIn } = useUser();
  await new Promise<void>((resolve) => {
    const check = () => {
      if (isLoaded.value) {
        resolve();
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });

  if (to.meta.requiresAuth && !isSignedIn.value) {
    // Redirect to sign in
    window.location.href = "/sign-in";
    return;
  }

  next();
});

export default router;
