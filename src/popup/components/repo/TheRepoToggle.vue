<template>
  <div class="TheHeader">
    <span>
      Show release notes
    </span>
    <el-switch
      v-model="kekw"
      @change="meow"
    />
  </div>
</template>

<script>
export default {
  name: 'TheHeader',

  data () {
    return {
      kekw: false
    }
  },

  methods: {
    meow () {
      console.log('meoasdasdasd')
    }
  }
}
</script>

<style lang="scss" scoped>
  .TheHeader {
    & > span {
      margin-right: 5px;
    }
  }
</style>
