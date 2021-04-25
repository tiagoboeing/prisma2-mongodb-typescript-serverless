const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const exec = require('child_process').exec;
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'source-map',

  // Exclude aws-sdk folder
  externals: [nodeExternals(), 'node_modules/.prisma'],

  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',

  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './node_modules/.prisma/**',
          to: '../dependencies'
        }
      ]
    })
    // {
    //   apply: (compiler) => {
    //     compiler.hooks.beforeRun.tap('BeforeRun', (compilation) => {
    //       console.info('\u001b[33mExecuting Prisma Generate');
    //       exec('npx prisma generate', (err, stdout, stderr) => {
    //         if (stdout) process.stdout.write(stdout);
    //         if (stderr) process.stderr.write(stderr);
    //       });
    //     });
    //   }
    // }
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: __dirname,
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
