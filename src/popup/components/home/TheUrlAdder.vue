<template>
  <div class="TheUrlAdder">
    <el-select
      v-model="source"
      class="select"
      :disabled="options.length < 2"
      :placeholder="options[0].label"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <el-input
      class="input"
      placeholder="/owner/name"
      :value="urlInput"
      @input="setRepoUrl"
      clearable>
    </el-input>

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
    urlInput: null,

    options: [
      {
        value: 'https://github.com',
        label: 'GitHub'
      }
    ]
  }),

  methods: {
    setRepoUrl (url) {
      this.urlInput = url.replace(this.source, '')
    },
    addUrl () {
      this.$emit('onUrlAdd', this.urlInput)
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
