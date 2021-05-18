<template>
  <div>

    <div v-if="repos.length < 5" class="repo__btn-wrap">
      <el-button
        v-for="repo in repos"
        :key="`repo_option-${repo.id}`"
        type="primary"
        class="repo__btn"
        @click="onRepoClicked(repo.id)"
      >
        {{ repo.name }}
      </el-button>
    </div>

    <template v-else>
      <el-select
        :value="val"
        @change="onRepoSelect($event)"
        placeholder="Your following repositories"
      >
        <el-option
          v-for="repo in formattedRepos"
          :key="`repo_option-${repo.value}`"
          :label="repo.label"
          :value="repo.value">
        </el-option>
      </el-select>
    </template>

  </div>
</template>

<script>
export default {
  name: 'TheReposList',

  data () {
    return {
      val: null
    }
  },

  computed: {
    formattedRepos () {
      return this.repos.map(repo => {
        return {
          label: repo.name,
          value: repo.id
        }
      })
    }
  },

  props: {
    repos: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    onRepoClicked (command) {
      this.$router.push(`/${command}`)
    },

    onRepoSelect (val) {
      this.$router.push(`/repo/${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.repo {
  &__btn {
    width: calc(100% / 2 - 10px / 2);
    margin: 0 0 10px 0;

    &:nth-child(2n) {
      margin-left: 10px;
    }

    &-wrap {
      display: flex;
      flex-wrap: wrap;
      padding-top: 10px;
    }
  }
}
</style>
