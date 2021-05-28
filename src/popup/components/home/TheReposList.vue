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
      <div class="repo__name">
        <span>
          {{ repo.name }}
        </span>
        <p>
          {{ repo.url }}
        </p>
      </div>

      <div class="repo__buttons">
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
      </div>

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
    align-content: center;
    padding: 12px;
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
    display: flex;
    flex-direction: column;

    & > span {
      font-size: 16px;
    }

    & > p {
      all: unset;
      margin-top: 4px;
      opacity: 0.4;
      font-size: 10px;
    }
  }

  &__buttons {
    padding-left: 10px;
    margin-left: auto;

    ::v-deep {
      .el-button {
        margin: 0;

        &:first-child {
          border-radius: 3px 0 0 3px;
          border-right: none;
        }

        &:last-child {
          border-radius: 0 3px 3px 0;
        }
      }
    }
  }
}
</style>
