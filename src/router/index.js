import { createRouter, createWebHistory } from "vue-router"
import { redirectIndex, redirectRoles } from "./redirects"
import DashboardView from "../views/Shared/DashboardView.vue"
import EmptyView from "../views/Shared/EmptyView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: DashboardView,
      children: [
        
        //Administrador
        {
          path: "/tickets",
          component: EmptyView,
          children: [
            {
              path: "/tickets/index",
              component: () => import("@/views/Tickets/Index.vue"),
            },
          ]
        },
        {
          path: "/computadoras",
          component: EmptyView,
          children: [
            {
              path: "/computadoras/index",
              component: () => import("@/views/Computadoras/Index.vue"),
            },
          ]
        },
        {
          path: "/empleados",
          component: EmptyView,
          children: [
            {
              path: "/empleados/index",
              component: () => import("@/views/Empleados/Index.vue"),
            },
          ]
        },
        
        //Error Pages
        {
          path: "/notfound",
          component: () => import("@/views/Shared/Error/NotFound.vue"),
        },
        {
          path: "/internalerror",
          component: () => import("@/views/Shared/Error/InternalError.vue"),
        },

      ]
    },
    {
      path: '/:catchAll(.*)', redirect:'notfound'
    }
  ]
});

router.beforeEach((to, from, next) => redirectRoles(to, from, next))
router.beforeEach((to, from, next) => redirectIndex(to, from, next))

export default router