import { __SettingsController } from '@/store/modules/settings/actions'
import badge from './badge'

export async function showNotification (repoName) {
  badge.set()

  const settings = await __SettingsController.getSettings()
  if (!settings.notifications) return

  browser.notifications.create('', {
    title: `New version for ${repoName} was just released!`,
    message: 'Check it out in Release Watcher',
    iconUrl: '/icons/128.png',
    type: 'basic',
    silent: settings.notificationSound || false
  })
}
