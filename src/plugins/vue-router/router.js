import DashboardView from "@/views/Shared/DashboardView.vue"
import BaseController from "@/views/Shared/BaseController.vue"

const routes = {
  mode: "history",
  linkActiveClass: "active",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: DashboardView,
      children: [
        {
          path: "/notfound",
          component: () => import("@/views/Shared/Error/NotFound.vue"),
        },
        {
          path: "/internalerror",
          component: () => import("@/views/Shared/Error/InternalError.vue"),
        },

        //Administrador
        {
          path: "/tickets",
          component: BaseController,
          children: [
            {
              path: "/tickets/index",
              component: () => import("@/views/Tickets/Index.vue"),
            },
          ]
        },
        {
          path: "/computadoras",
          component: BaseController,
          children: [
            {
              path: "/computadoras/index",
              component: () => import("@/views/Computadoras/Index.vue"),
            },
          ]
        },
        {
          path: "/empleados",
          component: BaseController,
          children: [
            {
              path: "/empleados/index",
              component: () => import("@/views/Empleados/Index.vue"),
            },
          ]
        }

      ]
    },
    {
      path: '/:catchAll(.*)', redirect:'notfound'
    }
  ]
}

export default routes