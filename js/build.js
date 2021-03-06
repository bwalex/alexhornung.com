({
  appDir: "./",
  baseUrl: "./",
  dir: "../output/assets/js",
  skipDirOptimize: false,

  optimize: "uglify2",
  preserveLicenseComments: false,
  generateSourceMaps: true,

  keepAmdefine: true,
  fileExclusionRegExp: /(^\.|~$|^build.js$)/,

  stubModules: [
    'jade'
  ],
  paths: {
    /* modules from CDN: */
    'jquery'     : "empty:",
    'underscore' : "empty:",
    'lodash'     : "empty:",
    'recaptcha'  : "empty:"
  },

  modules: [
    {
      name: "modules/scrollspy"
    },
    {
      name: "modules/comments",
      exclude: ['jade-full'],
      stubModules: ['jade']
    },
    {
      name: "modules/test",
      exclude: ['jade-full'],
      stubModules: ['jade']
    },
  ]
})
