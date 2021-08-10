<template>
  <el-collapse-item
    :name="release.id"
    class="releases-row"
  >
      <template slot="title">
      {{release.version}}
      <el-tag type="danger" size="mini" v-if="release.new" class="releases-row__tag">
        new!
      </el-tag>
    </template>
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
.releases-row {
  &__tag  {
    margin-left: 1rem;
  }
}
</style>
