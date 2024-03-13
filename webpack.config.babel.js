/**
 * Webpack configuration
 *
 * Created by: Riski Muhamad S <hi@riski.me>
 * 20:06 17/04/2022
 */

import { join } from 'path';
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { DefinePlugin, ProvidePlugin } from 'webpack';


import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/**
 * base config
 */

export const rootDir = join(__dirname, './');
export const mode = process.env.NODE_ENV ?? 'production';
export const isDevServer = process.env.WEBPACK_IS_DEV_SERVER === 'true';
export const isProd = mode === 'production';
export const isDev = !isProd;
export const PORT = 3000;

/**
 * Automatic load modules instead of having to import them anywhere.
 * @see https://webpack.js.org/plugins/provide-plugin/
 */
export const providePlugin = new ProvidePlugin({
  Buffer: ['buffer', 'Buffer'],
  process: 'process/browser',
});

/**
 * The DefinePlugin replaces variables in code with other values at compile time.
 * @see https://webpack.js.org/plugins/define-plugin/
 */
export const definePlugin = new DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(mode),
  IS_PROD: isProd,
  IS_DEV: isDev,
  IS_DEV_SERVER: isDevServer,
});

/**
 * A webpack plugin to remove/clean build folder
 * @see https://github.com/johnagan/clean-webpack-plugin
 */
export const cleanWebpackPlugin = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ['**/*', '!profile.json', '!tsconfig.tsbuildinfo'],
});

/**
 * HTML webpack plugin
 * @see https://webpack.js.org/plugins/html-webpack-plugin/
 */
export const htmlWebpackPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  inject: true,
  template: join(rootDir, './src/index.html'),
});

/**
 * Copy individual files or entire directories.
 * @see https://webpack.js.org/plugins/copy-webpack-plugin/
 */
export const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [{ from: join(rootDir, './src/assets'), to: 'assets' }],
});

/**
 * This plugin uses eslint to find and fix problems in your javascript code.
 * @see https://webpack.js.org/plugins/eslint-webpack-plugin/
 */
export const eslintWebpackPlugin = new ESLintWebpackPlugin({
  context: join(rootDir, '/src'),
  extensions: ['js', 'jsx', 'ts', 'tsx'],
});

/**
 * Webpack plugins that runs Typescript type checker on a separate process.
 * @see https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#readme
 */
export const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin({
  async: isDev,
  typescript: {
    configFile: join(rootDir, '/tsconfig.json'),
    memoryLimit: 4096,
  },
});

/**
 * Mini css plugin
 * @see https://webpack.js.org/plugins/mini-css-extract-plugin/
 */
export const miniCssExtractPlugin = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: '[name].[contenthash].css',
  chunkFilename: '[id].[contenthash].css',
});

/**
 * Dot env plugin webpack
 * @see https://github.com/mrsteele/dotenv-webpack
 */
export const dotEnvPlugin = new Dotenv({});


/**
 * Resource list for sass-resource-loader
 * @see https://github.com/shakacode/sass-resources-loader
 * @example
 *  [
 *      path.resolve(__dirname, '../src/foo.scss'),
 *  ]
 */
const sassResourceItems = [];

/**
 * @see https://webpack.js.org/guides/typescript/#loader
 */
export const typescriptRule = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  exclude: /node_modules/,
  options: {
    // disable type checker - we will use it in fork plugin
    transpileOnly: true,
  },
};

/**
 * @see https://webpack.js.org/loaders/babel-loader
 */
export const javascriptRule = {
  test: /\.(js|jsx)$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        configFile: join(rootDir, '/.babelrc.js'),
      },
    },
  ],
  exclude: /node_modules/,
};

/**
 * @see https://webpack.js.org/loaders/html-loader
 */
export const htmlRule = {
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
  },
};

/**
 * @see https://webpack.js.org/guides/asset-modules/
 */
export const imagesRule = {
  test: /\.(?:svg|ico|gif|png|jpg|jpeg)$/i,
  type: 'asset/resource',
};

/**
 * @see https://webpack.js.org/guides/asset-modules/
 */
export const fontsRule = {
  test: /\.(woff(2)?|eot|ttf|otf|)$/i,
  type: 'asset/inline',
};

/***
 * Using MiniCssExtractPlugin in production or style-loader in development
 * @see https://webpack.js.org/plugins/mini-css-extract-plugin/#root
 * @see https://webpack.js.org/loaders/style-loader/#root
 */
const miniCssExtractLoader = isProd
  ? {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: false,
      },
    }
  : {
      loader: 'style-loader',
      options: {
        esModule: false,
      },
    };

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: ['autoprefixer', isProd ? 'cssnano' : null],
    },
    sourceMap: true,
  },
};

/**
 * @see https://webpack.js.org/loaders/sass-loader/#problems-with-url
 */
const resolveUrlLoader = {
  loader: 'resolve-url-loader',
  options: {
    sourceMap: true,
  },
};

const typingsCssModulesLoader = {
  loader: '@teamsupercell/typings-for-css-modules-loader',
  options: {
    banner: '// autogenerated by typings-for-css-modules-loader. \n// Please do not change this file!',
    formatter: 'prettier',
  },
};

const cssModulesSupportLoaderItems = [
  miniCssExtractLoader,
  typingsCssModulesLoader,
  {
    loader: 'css-loader',
    options: {
      esModule: false,
      modules: {
        exportLocalsConvention: 'camelCaseOnly',
        localIdentName: '[local]__[contenthash:base64:5]',
      },
    },
  },
];

/**
 * @see https://webpack.js.org/loaders/less-loader/#root
 */
export const lessLoader = {
  loader: 'less-loader',
  options: {
    sourceMap: true,
    lessOptions: {
      javascriptEnabled: true,
    },
  },
};

const cssLoaderItems = [
  miniCssExtractLoader,
  {
    loader: 'css-loader',
  },
];

/**
 * CSS Rule
 */
export const cssRule = {
  test: /\.css$/,
  use: [
    miniCssExtractLoader,
    {
      loader: 'css-loader',
    },
    postCssLoader,
  ],
};

/**
 * LESS Rule
 */
export const lessRules = [
  {
    test: /\.module.less$/,
    use: [...cssModulesSupportLoaderItems, postCssLoader, resolveUrlLoader, lessLoader],
  },
  {
    test: /\.less$/,
    exclude: /\.module.less$/,
    use: [...cssLoaderItems, postCssLoader, resolveUrlLoader, lessLoader],
  },
];

/**
 * SASS Rule
 */
export const sassRules = [
  {
    test: /\.module\.s([ca])ss$/,
    use: [
      ...cssModulesSupportLoaderItems,
      postCssLoader,
      resolveUrlLoader,
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          implementation: require('sass'), // Prefer `dart-sassRules`
        },
      },
    ],
  },
  {
    test: /\.s([ca])ss$/,
    exclude: /\.module.scss$/,
    use: [
      ...cssLoaderItems,
      postCssLoader,
      resolveUrlLoader,
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          implementation: require('sass'), // Prefer `dart-sassRules`
        },
      },
    ],
  },
];

/**
 * SVG Rule
 */
export const svgRule = [
  /**
   * Using @svgr/webpack for handling svg files in react components
   * @see https://react-svgr.com/docs/webpack/
   */
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: /\.[jt]sx$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          configFile: join(rootDir, '/.babelrc.js'),
        },
      },
      {
        loader: '@svgr/webpack',
        options: {
          babel: false,
          icon: true,
        },
      },
    ],
  },

  /**
   * Using file-loader for handling svg files
   * @see https://webpack.js.org/guides/asset-modules/
   */
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: { not: [/\.[jt]sx$/] },
    type: 'asset/inline',
  },
];


const baseConfig = {
  context: __dirname,
  target: isDevServer ? 'web' : ['web', 'es5'],
  mode: isProd ? 'production' : 'development',
  entry: {
    main: [join(rootDir, '/src/index.tsx')],
  },
  output: {
    path: join(rootDir, '/dist'),
    publicPath: '/',
    filename: isDevServer ? '[name].[fullhash].js' : '[name].[contenthash].js',
  },
  module: {
    rules: [typescriptRule, javascriptRule, htmlRule, imagesRule, fontsRule, cssRule, ...lessRules, ...sassRules],
  },
  plugins: [
    providePlugin,
    definePlugin,
    forkTsCheckerWebpackPlugin,
    eslintWebpackPlugin,
    cleanWebpackPlugin,
    htmlWebpackPlugin,
    copyWebpackPlugin,
    miniCssExtractPlugin,
    dotEnvPlugin,
  ],
  resolve: {
    alias: {
      '@': join(rootDir, '/src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    fallback: {
      process: require.resolve('process/browser'),
      zlib: require.resolve('browserify-zlib'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
      buffer: require.resolve('buffer'),
      assert: require.resolve('assert'),
    },
  },

  /**
   * @see https://webpack.js.org/configuration/optimization/
   */
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  /**
   * @see https://webpack.js.org/configuration/externals/
   */
  // externals: "",
};

/**
 * Development config
 */
const developmentConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    client: {
      overlay: false,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    hot: true,
    port: PORT,
    proxy: {},
    static: {
      publicPath: '/',
    },
  },
};

/**
 * Production config
 */
const productionConfig = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({})],
  },
  plugins: [cleanWebpackPlugin],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default () => (isProd ? merge(baseConfig, productionConfig) : merge(baseConfig, developmentConfig));
