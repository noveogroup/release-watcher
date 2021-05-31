module.exports = {
  presets: [
    // [
    //   '@vue/cli-plugin-babel/preset',
    //   {
    //     modules: true
    //   }
    // ],
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
