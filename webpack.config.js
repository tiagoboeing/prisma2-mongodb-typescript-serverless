const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');

const { spawnSync } = require('child_process');

const isOffline = !!slsw.lib.webpack.isLocal;

if (isOffline) {
  console.log('Offline mode detected!');

  process.env.PRISMA_QUERY_ENGINE_BINARY =
    '.build/.webpack/dependencies/node_modules/.prisma';
}

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'source-map',

  // Exclude aws-sdk folder
  externals: [nodeExternals()],

  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',

  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },

  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.beforeRun.tap('BeforeRun', (compilation) => {
          console.info('\u001b[33mExecuting Prisma Generate');
          spawnSync('npx prisma generate');
        });
      }
    },

    // Copy Prisma contents
    new CopyPlugin({
      patterns: [
        {
          from: './node_modules/.prisma/**',
          to: '../prisma'
        },
        {
          from: './node_modules/@prisma/**/*',
          to: '../prisma'
        }
      ]
    })
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: __dirname + '/src',
        exclude: /node_modules/
      }
    ]
  },

  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.build', '.webpack'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  }
};
