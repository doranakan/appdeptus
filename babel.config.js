module.exports = function (api) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  api.cache(true)
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind'
        }
      ],
      'nativewind/babel'
    ],
    plugins: [
      [
        'babel-plugin-inline-import',
        {
          extensions: ['.svg']
        }
      ],
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],

          alias: {
            '@': './',
            appdeptus: './'
          }
        }
      ]
    ]
  }
}
