import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 't1vzj9vq',
    dataset: 'production'
  },
  deployment: {
    appId: 'b6tp4oadxarj7k98cyvh2e3m',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
