const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImagesConfigWebpackPlugin = require('image-config-webpack-plugin');
const JsConfigWebpackPlugin = require('js-config-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require('./utils/manifest.generator');

module.exports = env => {
  const devServer= {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9000
  };
  const entry = {
    content: './src/content.js',
    background: './src/background.js',
  };

  let watch = (env.watch !== 'false');
  let devtool = 'source-map';
  let sassConfig = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }
  ];

  if (env.mode === 'production') {
    sassConfig = [
      {
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader'
      },
      {
        loader: 'sass-loader'
      }
    ];

    watch = false;
    devtool = false;
  }

  console.log(env);

  return {
    entry: entry,
    mode: env.mode,
    watch: watch,
    devtool: devtool,
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        },
        {
          // CSS Asyncrone
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          // SCSS Asyncrone
          test: /\.scss$/,
          use: ['style-loader', ...sassConfig],
          exclude: /style\.scss$/
        },
        {
          // SCSS > File
          test: /\.scss$/,
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options:
              {
                publicPath: '/'
              }
          },
            ...sassConfig
          ]
        },
        {
          // scss.js to scss
          test: /\.scss\.js$/,
          use:
            {
              loader: path.resolve('src/webpack/loader/json-to-sass/json-to-sass')
            }
        },
        {
          // Include file in CSS / SCSS
          test: /\.(jpe?g|png|woff2?|eot|ttf)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[path][name].[ext]',
              emitFile: true,
            }
          },
        },
        {
          // Include file in CSS / SCSS
          test: /\.(svg)$/,
          use: {
            loader: 'svg-url-loader',
            options: {
              limit: 1000,
              name: '[path][name].[ext]',
              emitFile: true,
            }
          },
        }
      ]
    },
    optimization: {
      // splitChunks: {
      //   cacheGroups: {
      //     vendor: {
      //       chunks: 'initial',
      //       name: 'vendor',
      //       test: 'vendor',
      //       enforce: true
      //     },
      //   }
      // },
      // runtimeChunk: true
    }
    ,
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css"
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        // ...
      })
    ],
    plugins: [
    // Cleans the dist folder before the build starts
    // new CleanWebpackPlugin(),
    // Generate a base html file and injects all generated css and js files
    new HtmlWebpackPlugin(),
    // File loader configuration for .gif .jpg .jpeg .png and .svg files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/image-config-webpack-plugin/config
    new ImagesConfigWebpackPlugin(),
    // Multi threading babel loader configuration with caching for .js and .jsx files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/js-config-webpack-plugin/config
    new JsConfigWebpackPlugin(),
    // SCSS Configuration for .css .module.css and .scss .module.scss files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin/config
    new ScssConfigWebpackPlugin(),
  ],
    resolve:
      {
        extensions: ['.ts', '.js', '.scss', '.css', '.less'],
        alias:
          {
            src: path.resolve(__dirname, 'src/'),
            scss: path.resolve(__dirname, 'src/scss/'),
            modules: path.resolve(__dirname, 'src/modules/'),
          }
      }
    ,
    externals: {
      // jquery: 'jQuery',
      // swiper: 'Swiper',
      // 'gsap.TweenMax': 'TweenMax',
      // 'gsap':'gsap',
      // nouislider: 'noUiSlider',
      // algoliasearch: 'algoliasearch'
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist/'),
      publicPath: './'
    }
  }
};
