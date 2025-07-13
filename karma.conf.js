const path = require('path');

process.env.CHROME_BIN = 'C:/Users/Lucas/AppData/Local/Programs/Opera GX/opera.exe';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: path.join(__dirname, './coverage/app'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    browsers: ['OperaIncognito'],
    customLaunchers: {
      OperaIncognito: {
        base: 'Chrome',
        executablePath: 'C:/Users/Lucas/AppData/Local/Programs/Opera GX/opera.exe',
        flags: ['--incognito', '--no-sandbox']
      }
    },

    singleRun: false,
    restartOnFileChange: true
  });
};