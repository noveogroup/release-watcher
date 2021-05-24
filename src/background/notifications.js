import SettingsController from '@/controllers/SettingsController'
import badge from './badge'

export async function showNotification (repoName) {
  badge.set()

  const settingsController = new SettingsController()
  const currSettings = await settingsController.getOne(1)
  if (!currSettings.notifications) return

  browser.notifications.create('', {
    title: `New version for ${repoName} was just released!`,
    message: 'Check it out in Release Watcher',
    iconUrl: '/icons/128.png',
    type: 'basic',
    silent: currSettings.notificationSound || false
  })
}
