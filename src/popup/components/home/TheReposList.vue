<template>
  <div class="repo__list">
    <div
      v-for="repo in repos"
      :key="repo.id"
      class="repo__tab-wrap"
    >
      <div class="repo__tab">
        <span>
          {{ repo.name }}
        </span>

        <div>
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

      </div>

    </div>

    <VConfirmPopup
      v-show="showConfirm"
      @onChange="onConfirmChange($event)"
    />

    <VObserver @intersect="intersected" />
  </div>
</template>

<script>
import VObserver from '../utils/VObserver'
import VConfirmPopup from '../sharable/VConfirmPopup'

export default {
  name: 'TheReposList',
  components: {
    VObserver,
    VConfirmPopup
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
      console.log(id)
      this.$router.push(`/repo/${id}`)
    },

    intersected () {
      this.$emit('loadMore')
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
  &__list {
    padding: 10px 8px;
  }

  &__tab {
    display: flex;
    justify-content: space-between;

    &-wrap {
      position: relative;
      cursor: pointer;
    }
  }
}
</style>
