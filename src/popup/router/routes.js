import Default from '@/popup/layouts/Default.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: Default,
    name: 'Default',
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView
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
        component: () =>
          import(
            /* webpackChunkName: "RepoPage" */ '../views/ReleasesView.vue'
          )
      }
    ]
  }
]

export default routes
