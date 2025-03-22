/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var fs = require('fs');

process.env.VUE_APP_GIT_VERSION = fs.readFileSync('version', 'utf8');

module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  pluginOptions: {
    gitDescribe: {
      variableName: 'GIT_DESCRIBE'  // The compile-time global constant varialbe name to use in the code.
    }
  }

}

