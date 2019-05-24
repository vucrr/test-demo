const { ANALYZE } = process.env
const path = require('path')
const withPlugins = require('next-compose-plugins')
const withLess = require('@zeit/next-less')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
// const nextBuildId = require('next-build-id')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const { assetPrefix, isProd, PORT } = require('./src/utils/config')

const REACT_APP_API_ENV = process.env.REACT_APP_API_ENV || 'dev'
const TEST = process.env.TEST || ''
// const env = process.env.NODE_ENV || 'development'

if (isProd) {
  if (REACT_APP_API_ENV === 'test' && TEST === '') {
    console.error('TEST env is required when yarn run build:test!')
    process.exit(1)
  }
  if (REACT_APP_API_ENV === 'test') {
    console.log(`build: ENV: TEST${process.env.TEST}, will listen PORT: ${PORT}`)
  } else {
    console.log(`build: ENV: ${REACT_APP_API_ENV}, will listen PORT: ${PORT}`)
  }
}

// next.js configuration
const nextConfig = {
  assetPrefix,
  distDir: 'build',
  // generateBuildId: async () => {
  //   // get the latest git commit id
  //   const fromGit = await nextBuildId({ dir: __dirname })
  //   return fromGit.id
  // },
  // serverRuntimeConfig: {
  //   mySecret: 'secret', // Will only be available on the server side
  // },
  // publicRuntimeConfig: {
  //   staticFolder: '/static', // Will be available on both server and client
  // },
  webpack: (config, { dev, isServer }) => {
    // if (env === 'production' && isServer) {
    if (isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }
    config.output.publicPath = `${assetPrefix}${config.output.publicPath}`

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      components: path.resolve('./src/components'),
      store: path.resolve('./src/store'),
      utils: path.resolve('./src/utils'),
      constant: path.resolve('./src/constant'),
      containers: path.resolve('./src/containers'),
      actions: path.resolve('./src/actions'),
      services: path.resolve('./src/services'),
      configs: path.resolve('./src/configs'),
      svg: path.resolve('./static/svg'),
      themes: path.resolve('./src/themes'),
      images: path.resolve('./static/images'),
      json: path.resolve('./static/json'),
      md: path.resolve('./static/md'),
      lottie: path.resolve('./static/lottie'),
    }

    // fix with babel-plugin-import start
    config.resolve.extensions = ['.web.js', '.js', '.json', '.ts', '.tsx']

    // 解决_document.ts 引入fs报错
    config.node = {
      fs: 'empty',
    }

    config.module.rules.push(
      {
        test: /\.(svg)$/,
        use: [
          { loader: 'svg-sprite-loader' },
        ],
        include: path.join(__dirname, 'static/svg'),
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              publicPath: `${assetPrefix}/_next/static/images/`,
              outputPath: `${isServer ? '../' : ''}static/images/`,
              name: '[name]-[hash].[ext]',
            },
          },
        ],
        include: path.join(__dirname, 'static/images'),
      },
      {
        test: /\.md$/,
        use: [
          { loader: 'html-loader' },
          { loader: 'markdown-loader' },
        ],
        include: path.join(__dirname, 'static/md'),
      },
    )
    // fix with babel-plugin-import end

    // 修复dev模式下切换页面样式丢失的问题
    // TODO 待官方修复后删除此部分
    if (!isServer && !isProd) {
      let lessRuleIndex = config.module.rules.findIndex((rule) => {
        return rule.test.toString().indexOf('.less$') !== -1
      })

      let lessLoaders = config.module.rules[lessRuleIndex].use

      lessLoaders = lessLoaders.slice(2)

      lessLoaders.unshift({
        loader:'style-loader',
        options: {
          hmr: false
        }
      })

      config.module.rules[lessRuleIndex].use = lessLoaders
    }
    // fix end

    if (ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true,
      }))
    }

    /* Enable only in Production */
    if (!dev) {
      // Service Worker
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          cacheId: 'mobile-next',
          filename: 'service-worker.js',
          filepath: './static/service-worker.js',
          minify: true,
          // stripPrefix: 'static/',
          // replacePrefix: '/',
          // navigateFallback: 'index.html',
          staticFileGlobsIgnorePatterns: [/\.next\//],
          staticFileGlobs: [
            'static/**/*',
          ],
          runtimeCaching: [
            // Example with different handlers
            {
              handler: 'fastest',
              urlPattern: /[.](png|jpg|css)/,
            },
            {
              handler: 'networkFirst',
              urlPattern: /^http.*/, // cache all files
            },
          ],
        }),
      )
    }

    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /Conflicting order between:/,
      }),
    )

    return config
  },
}

const plugins = [
  withTypescript,
  [withLess, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: isProd ? '[local]___[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
    },
  }],
]

module.exports = withPlugins(plugins, nextConfig)
