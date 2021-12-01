<template>
  <el-form class="TheUrlAdder">
    <el-input
      class="input"
      placeholder="/owner/name"
      v-model="urlInput"
      clearable
    >
      <template slot="prepend">github.com</template>
    </el-input>
    <el-button
      class="button"
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="addUrl"
    />
  </el-form>
</template>

<script>
export default {
  name: 'TheUrlAdder',

  data: () => ({
    urlInput: ''
  }),

  methods: {
    addUrl () {
      this.$emit('onUrlAdd', this.urlInput)
      this.urlInput = ''
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
  border-radius: 0 3px 3px 0;
}
</style>
