<template>
  <div>
    <el-button
      v-show="getIsMainRepoPage"
      :disabled="isFetching"
      type="primary"
      @click="onClick"
    >
      Add this repo
    </el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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

  computed: {
    ...mapGetters(['getIsMainRepoPage'])
  },

  methods: {
    onClick () {
      this.$emit('onAddBtnClick', this.currentItem)
      this.currentItem = ''
    }
  }
}
</script>
