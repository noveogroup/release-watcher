<template>
  <div class="repo__list">
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
          @click="onViewRepo(repo)"
        />

        <el-popconfirm
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          icon="el-icon-info"
          iconColor="red"
          :title="`Are you sure to delete «${repo.name}»?`"
          @confirm="onDeleteRepo(repo.id)"
        >
          <template #reference>
            <el-button
              size="small"
              icon="el-icon-delete"
            />
          </template>
        </el-popconfirm>
      </el-button-group>

    </el-badge>
  </div>
</template>

<script>

export default {
  name: 'TheReposList',

  props: {
    repos: {
      type: Array,
      default: () => ([])
    }
  },

  methods: {
    onViewRepo (repo) {
      this.$router.push({ path: `/repo/${repo.id}`, query: { name: repo.name } })
    },

    onDeleteRepo (id) {
      this.$emit('onRemoveRepo', id)
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
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #ebeef5;

    &.--unread {
      background-color: rgba(245, 108, 108, 0.1);
    }

    &:first-child {
      border-top: 1px solid #ebeef5;
    }
    &:not(:last-child) {
      margin-bottom: 12px;
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
