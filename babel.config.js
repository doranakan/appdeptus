module.exports = function (api) {
  api.cache(true)
  return {
    presets: [["babel-preset-expo", {
      jsxImportSource: "nativewind"
    }], "nativewind/babel"],
    plugins: [[
      'babel-plugin-inline-import',
      {
        extensions: ['.svg']
      }
    ], 'react-native-reanimated/plugin', ["module-resolver", {
      root: ["./"],

      alias: {
        "@": "./"
      }
    }]]
  };
}
