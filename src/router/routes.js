
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', name: 'login', component: () => import('pages/Login.vue')
      },
      {
        path: 'main', name: 'main', component: () => import('pages/MainList.vue')
      },
      {
        path: 'weeks-form', name: 'weeks-form', component: () => import('pages/WeekForm.vue'), props: true
      },
      {
        path: 'users-form', name: 'missionaries-form', component: () => import('pages/UserForm.vue'), props: true
      },
      {
        path: 'users-form', name: 'users-form', component: () => import('pages/UserForm.vue'), props: true
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
