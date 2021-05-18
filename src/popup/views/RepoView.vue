<template>
  <div>
    <TheRepoToggle />
    repo id: {{ $route.params.id }}
  </div>
</template>

<script>
import TheRepoToggle from '../components/repo/TheRepoToggle'

export default {
  name: 'RepoView',
  components: {
    TheRepoToggle
  }
}
</script>

<style lang="scss" scoped>
.RepoView {
  //
}
</style>
