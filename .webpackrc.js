import path from 'path'

export default {
  es5ImcompatibleVersions: true,
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  "extraBabelPlugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true
    }],
  ],
  externals: {},
  alias: {
    "@": path.resolve(__dirname, 'src/'),
    // "antd-landing": "/Users/bianyixuan/zhangbaige/github/antd-landing"
  },
  "theme": "./src/theme.js",
  "ignoreMomentLocale": true,
  "hash": true,
  "html": {
    template: path.resolve(__dirname, './src/index.ejs'),
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableDynamicImport: false,
  publicPath: '/',
  "outputPath": path.resolve(__dirname, `build`),
  "disableCSSModules": true,
  "disableCSSSourceMap": false,
  "copy": [
    {
      "from": path.resolve(__dirname, './public'),
      "to": path.resolve(__dirname, `./build`)
    },
  ],
};
