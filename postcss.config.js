const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    // require('postcss-easy-import')({ prefix: '_' }), // keep this first
    autoprefixer({
      browsers: [
        'iOS >= 8',
        'Android >= 4',
      ],
    }),
    pxtorem({
      rootValue: 50,
      unitPrecision: 5,
      propList: ['*', '!border', '!border*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: true,
      minPixelValue: 0,
    }),
  ],
}
