<template>
  <div class="VConfirmPopup">
    <div class="popup__content">
      <h4 class="popup__title">
        {{ title }}
      </h4>
      <div class="popup__buttons">
        <el-button
          type="success"
          icon="el-icon-check"
          circle
          @click="$emit('onChange', 'confirm')"
        />
        <el-button
          type="danger"
          icon="el-icon-close"
          circle
          @click="$emit('onChange', 'decline')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VConfirmPopup',

  props: {
    title: {
      type: String,
      default: 'Confirm popup title'
    }
  }
}
</script>

<style lang="scss" scoped>
.VConfirmPopup {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba( 255,255,255, 0.8 );
}

.popup {
  &__content {
    min-width: 200px;
  }

  &__title {
    text-align: center;
  }

  &__buttons {
    display: flex;
    justify-content: center;
  }
}
</style>
