<template>
  <el-collapse-item
    :title="release.version"
    :name="release.id"
  >
    <div
      ref="markdown"
      v-html="formattedBody"
    />
  </el-collapse-item>
</template>

<script>
import marked from 'marked'

export default {
  name: 'TheReleasesRow',

  props: {
    release: {
      type: Object,
      default: () => ({})
    }
  },

  mounted () {
    for (const link of this.$refs.markdown.getElementsByTagName('a')) {
      link.setAttribute('target', '_blank')
    }
  },

  computed: {
    formattedBody () {
      return marked(this.release.body)
    }
  }
}
</script>

<style lang="scss" scoped>
.TheReleasesRow {
  //
}
</style>
