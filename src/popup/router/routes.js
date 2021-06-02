const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(
        /* webpackChunkName: "HomeView" */ '../views/HomeView.vue'
      )
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () =>
      import(
        /* webpackChunkName: "SettingsView" */ '../views/SettingsView.vue'
      )
  },
  {
    path: '/repo/:id',
    name: 'RepoView',
    component: () =>
      import(
        /* webpackChunkName: "RepoPage" */ '../views/ReleasesView.vue'
      )
  }
]

export default routes
