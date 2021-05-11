<template>
  <div>
    <el-input :value="value" @input="$emit('input', $event)" size="mini">
      <template #prepend> https://api.github.com/repos/ </template>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: () => {
        return {
          settings: {
            on: true
          },
          url: ''
        }
      },
      required: true
    }
  }
}
</script>
