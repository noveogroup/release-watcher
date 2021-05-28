<template>
  <div
    v-if='settings'
    class="SettingsView"
  >
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
          @change="onChange()"
        />
      </div>

      <div>
        Notifications:
        <el-select
          v-model="notification"
          size="small"
          class="notifications"
          @change="onChange()"
        >
          <el-option
            v-for="(option, idx) in notOptions"
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
import store from '@/store'
import { mapState } from 'vuex'

import { settings } from '@/store/modules/settings/settings.js'

if (!store.state.settings) {
  store.registerModule('settings', settings)
}

export default {
  name: 'SettingsView',

  notData: [ // notification Data
    {
      label: 'No notifications',
      value: 0,
      schema: {
        notificationSound: false,
        notifications: false
      }
    },
    {
      label: 'Silent',
      value: 1,
      schema: {
        notificationSound: false,
        notifications: true
      }
    },
    {
      label: 'On',
      value: 2,
      schema: {
        notificationSound: true,
        notifications: true
      }
    }
  ],

  data: () => ({
    intervals: 0,
    notification: 0
  }),

  async created () {
    try {
      await this.$store.dispatch('settings/setSettings')

      this.intervals = this.settings.requestInterval

      const { notificationSound, notifications } = this.settings

      const item = this.$options.notData.find(e => {
        if (e.schema.notificationSound === notificationSound && e.schema.notifications === notifications) {
          return e
        }
      })

      this.notification = item.value
    } catch (error) {
      console.error(error)
    }
  },

  computed: {
    ...mapState({
      settings: state => state.settings.settings
    }),

    notOptions () {
      return this.$options.notData.map(e => ({
        label: e.label,
        value: e.value
      }))
    }
  },

  methods: {
    onChange () {
      this.$store.dispatch('settings/updateSettings', {
        ...this.settings,
        ...this.$options.notData.find(e => e.value === this.notification).schema,
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
