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
            v-for="(option, i) in notifications"
            :key="`option-${i}`"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SettingsView',

  data: () => ({
    intervals: 15,
    notification: 1,
    notifications: [
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
    ]
  }),

  computed: {
    ...mapState('settings', [
      'settings'
    ])
  },

  async created () {
    try {
      const settings = await this.getSettings()

      const {
        notificationSound = false,
        notifications = false,
        requestInterval = 15
      } = settings || {}
      const notification = this.notifications.findIndex(notify => {
        return (notify.schema.notificationSound === notificationSound) &&
               (notify.schema.notifications === notifications)
      }) ?? 0

      this.notification = notification
      this.intervals = requestInterval
    } catch (error) {
      console.error(error)
    }
  },

  methods: {
    ...mapActions('settings', [
      'getSettings',
      'updateSettings'
    ]),
    onChange () {
      const currentSettings = this.settings || {}
      const notifySettings = this.notifications
        .find(notification => notification.value === this.notification)
        ?.schema || {}
      const requestInterval = this.intervals

      this.updateSettings({
        ...currentSettings,
        ...notifySettings,
        requestInterval
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
