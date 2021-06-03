<template>
  <div class="TheUrlAdder">

    <el-input
      class="input"
      placeholder="/owner/name"
      :value="urlInput"
      @input="setRepoUrl"
      clearable
    >
      <template slot="prepend">github.com</template></el-input
    >
    <el-button
      class="button"
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="addUrl"
    />
  </div>
</template>

<script>
export default {
  name: 'TheUrlAdder',

  data: () => ({
    source: 'https://github.com',
    urlInput: ''
  }),

  methods: {
    setRepoUrl (url) {
      this.urlInput = url.replace(this.source, '')
    },
    addUrl () {
      const url = this.urlInput
      this.urlInput = ''
      this.$emit('onUrlAdd', url)
    }
  }
}
</script>

<style lang="scss" scoped>
.TheUrlAdder {
  display: flex;
}

.select {
  ::v-deep .el-input__inner{
    border-radius: 4px 0 0 4px;
  }
}

.input {
  ::v-deep .el-input__inner{
    border-radius: 0;
  }
}

.button {
  height: 100%;
  border-radius: 0 3px 3px 0;
}
</style>
