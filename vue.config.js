module.exports = {
    pwa: {
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        navigateFallback: 'index.html',           
      },
      themeColor: "#42b983",
      msTileColor: "#42b983",
      appleMobileWebAppCache: "yes",
      manifestOptions: {
        background_color: "#42b983"
      }
    }
  };