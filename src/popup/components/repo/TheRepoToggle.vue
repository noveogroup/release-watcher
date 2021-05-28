<template>
  <div class="TheHeader">
    <span>
      Show all releases
    </span>
    <el-switch
      :value="value"
      @change="$emit('onChange', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'TheHeader',

  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .TheHeader {
    padding-top: 10px;

    & > span {
      margin-right: 5px;
    }
  }
</style>
