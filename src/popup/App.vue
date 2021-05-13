<template>
  <router-view />
</template>

<script>
import RepoController from '../controllers/RepoController'

export default {
  name: 'App',
  async mounted () {
    try {
      const repos = new RepoController()
      const all = await repos.getAll()
      console.log(all)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
