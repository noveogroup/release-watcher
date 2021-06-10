<template>
  <div
    class="credits"
  >
    <span
      class="credits--text"
    >Made by</span>
    <a
      href="https://noveogroup.com/"
      target="_blank"
      class="credits--link"
    >Noveo</a>
  </div>
</template>

<style lang="scss" scoped>
.credits {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 10px;

  &--text {
    margin-right: 4px;
  }
  &--link {
    text-decoration: none;
    color: #409eff;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
