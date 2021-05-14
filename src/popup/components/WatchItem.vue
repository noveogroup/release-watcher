<template>
  <div>
    <el-input
      v-model="currentItem"
      size="mini"
    />

    <div>
      vuex getIsMainRepoPage: {{ getIsMainRepoPage }}
    </div>

    <el-button
      :disabled="!isFetching && !getIsMainRepoPage"
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
