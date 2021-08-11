import { __SettingsController } from '@/store/modules/settings/actions'
import badge from './badge'

export async function showNotification (repoName, repoLink) {
  badge.set()

  const settings = await __SettingsController.getSettings()
  if (!settings.notifications) return

  browser.notifications.create('', {
    title: `New version for ${repoName} was just released!`,
    message: 'Check it out in Release Watcher',
    iconUrl: '/icons/128_warning.png',
    type: 'basic',
    silent: Boolean(settings.notificationSound) || false,
    buttons: repoLink ? [{ title: 'Go to GutHub' }] : null
  })

  browser.notifications.onButtonClicked.addListener((id, index) => {
    browser.notifications.clear(id)
    browser.tabs.create({ active: true, url: repoLink })
  })
}
