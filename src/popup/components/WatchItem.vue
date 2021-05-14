<template>
  <div>
    <el-input
      v-model="currentItem"
      size="mini"
    />

    <div>
      vuex isAllowedURL: {{ getIsAllowedURL }}
    </div>

    <el-button
      :disabled="!isFetching && !allowedPage"
      type="primary"
      @click="onClick"
    >
      Add item
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
      currentItem: '',

      currentURL: null,
      allowedPage: false
    }
  },

  computed: {
    ...mapGetters(['getIsAllowedURL'])
  },

  methods: {
    onClick () {
      this.$emit('onAddBtnClick', this.currentItem)
      this.currentItem = ''
    }
  }
}
</script>
