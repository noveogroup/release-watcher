<template>
  <div v-if="repos"
       class="repo__list"
  >
    <el-badge
      v-for="repo in repos"
      :key="repo.id"
      :value="repo.newReleasesCount"
      :max="99"
      :hidden="repo.newReleasesCount === 0"
      :class="{'--unread': repo.newReleasesCount > 0}"
      class="repo__row"
    >
      <el-link
        :href="repo.url"
        :title="repo.name"
        target="_blank"
        class="repo__name"
      >
        {{ repo.name }}
      </el-link>

      <el-button-group>
        <el-button
          size="small"
          icon="el-icon-view"
          @click="onRepoSelect(repo.id)"
        />

        <el-button
          size="small"
          icon="el-icon-delete"
          @click="onDeleteClicking(repo.id)"
        />
      </el-button-group>

    </el-badge>

    <VConfirmPopup
      v-show="showConfirm"
      @onChange="onConfirmChange($event)"
    />
  </div>
</template>

<script>

export default {
  name: 'TheReposList',
  components: {
    VConfirmPopup: () => import('../sharable/VConfirmPopup')
  },

  data: () => ({
    showConfirm: false,

    deletingCandidate: null
  }),

  props: {
    repos: {
      type: Array,
      default: () => ([])
    }
  },

  methods: {

    onRepoSelect (id) {
      this.$router.push(`/repo/${id}`)
    },

    onDeleteClicking (id) {
      this.deletingCandidate = id
      this.showConfirm = !this.showConfirm
    },

    onConfirmChange (status) {
      if (status === 'confirm') {
        this.$emit('onRemoveRepo', this.deletingCandidate)
      }
      this.deletingCandidate = null
      this.showConfirm = false
    }
  }
}
</script>

<style lang="scss" scoped>
.repo {

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-radius: 4px;
    border-bottom: 1px solid #ebeef5;

    &.--unread {
      background-color: rgba(245, 108, 108, 0.1);
    }

    &:first-child {
      border-top: 1px solid #ebeef5;
    }

    &:not(:last-child) {
      margin-bottom: 8px;
    }

    ::v-deep {
      .el-badge__content {
        top: 0;
        right: 33px;
      }
    }
  }

  &__name {
    max-width: 200px;
  }
}
</style>
