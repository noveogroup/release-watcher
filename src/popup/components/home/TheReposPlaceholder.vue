<template>
  <div class="placeholder">
    <h4 class="placeholder__title">
      You have not added any repositories yet. <br />
      Here's what you can do:
    </h4>

    <div class="placeholder__instructions">
      <p>1. Add repository link to the input above.</p>

      <el-divider>or</el-divider>

      <div class="placeholder__gif-wrapper">
        <p>
          2. Go to the main page of any open GitHub repository and add it there
          directly.
        </p>

        <img class="placeholder__gif" src="@/assets/placeholder.gif" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.placeholder {
  padding: 1rem;
  border: 1px solid #999;
  border-radius: 5%;
  font-size: 14px;

  &__title {
    font-size: 16px;
  }

  &__gif {
    width: 60%;
    border-radius: 15%;
    display: inline-block;
  }

  &__gif-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
