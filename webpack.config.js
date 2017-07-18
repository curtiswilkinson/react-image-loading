const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const paths = require('./paths')

const packageJson = require('./package.json')
const publicPath = packageJson.homepage

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    publicPath,
    contentBase: publicPath,
    historyApiFallback: {
      index: publicPath
    }
  },
  entry: {
    bundle: [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      ...paths.fonts,
      paths.appIndexJs
    ]
  },
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/[name].js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    alias: {
      'react-native': 'react-native-web'
    }
  },

  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    loaders: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.(ts|tsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        enforce: 'pre',
        test: /\.(ts|tsx)$/,
        loader: 'tslint-loader',
        options: {
          configFile: 'tslint.json',
          tsConfigFile: 'tsconfig.json'
        }
      },
      {
        test: /\.(ts|tsx)$/,
        include: paths.appSrc,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          babelOptions: {
            presets: ['es2015'],
            babelrc: false
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
