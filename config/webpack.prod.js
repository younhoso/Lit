const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const paths = require('./paths')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },
    
  // 프로덕션: IE11과 같은 이전 브라우저를 부분적으로 지원하기 위해 es5로 변환하는 마법이 여기서 발생합니다.
  target: ['web', 'es5'], 
  
  plugins: [
    // Extracts CSS into separate files
    // Note: style-loader is for development, MiniCssExtractPlugin is for production
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{ // images loader
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[name][ext]',
				},
			},
			{ // fonts loader
				test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]',
				},
			},
			{  // css 또는 scss loader
				test: /\.s[ac]ss|css$/i,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			},
		]
	},
	optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})