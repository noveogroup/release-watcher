<template>
  <div>
    <el-input
      v-model="currentItem"
      size="mini"
    >
      <template #prepend>
        https://api.github.com
      </template>
    </el-input>

    <el-button
      :disabled="isFetching"
      type="primary"
      @click="onClick"
    >
      Add item
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    isFetching: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      currentItem: ''
    }
  },

  methods: {
    onClick () {
      this.$emit('onAddBtnClick', this.currentItem)
      this.currentItem = ''
    }
  }
}
</script>
