<template>
  <div class="SettingsView">
    <el-button
      icon="el-icon-back"
      @click="$router.replace('/')"
    />
    <h1>
      Settings
    </h1>

    <div class="content">
      <div class="interval">
        Request interval: {{ intervals }} min
        <el-slider
          v-model="intervals"
          :min="5"
          :max="60"
          :step="5"
          show-stops
          class="interval__input"
          @change="onSliderChange()"
        />
      </div>

      <div>
        Notifications:
        <el-select
          v-model="notification"
          size="small"
          class="notifications"
        >
          <el-option
            v-for="(option, idx) in $options.selectOption"
            :key="option.label + idx"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SettingsView',

  selectOption: [
    {
      label: 'No notifications',
      value: 0
    },
    {
      label: 'Silent',
      value: 1
    },
    {
      label: 'On',
      value: 2
    }
  ],

  data: () => ({
    intervals: 0,
    notification: 0
  }),

  mounted () {
    this.intervals = this.settings.requestInterval
  },

  computed: {
    ...mapState([
      'settings'
    ])
  },

  methods: {
    onSliderChange () {
      this.$store.dispatch('updateSettings', {
        ...this.settings,
        requestInterval: this.intervals
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.SettingsView {
  //
}

.interval {
  margin-bottom: 10px;

  &__input {
    margin: 0 5px;
  }
}

.notifications {
  width: 100%;
  margin-top: 10px;
}
</style>
