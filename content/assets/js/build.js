({
  appDir: "./",
  baseUrl: "./",
  dir: "../../../output/assets/js",
  skipDirOptimize: false,

  optimize: "none",//"uglify2",
  preserveLicenseComments: false,
  generateSourceMaps: true,

  fileExclusionRegExp: /(^\.|~$|^build.js$)/,

  stubModules: [
    'jade'
  ],
  paths: {
    /* modules from CDN: */
    'jquery' : "empty:",
    'templates/test.jade' : "../templates/test.jade"
  },

  modules: [
    {
      name: "modules/scrollspy"
    },
    {
      name: "modules/test",
      exclude: [
        'jade'
      ]
    },
  ]
})
