import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebPackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

const htmlPlugin = new HtmlWebPackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') });
const cssPlugin = new MiniCssExtractPlugin({
  filename: './css/[name].[contenthash:8].css',
  chunkFilename: './css/[name].[contenthash:8].chunk.css',
});

const config: webpack.Configuration = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './js/[name].[contenthash:8].js',
    chunkFilename: './js/[name].[contenthash:8].chunk.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { esModule: true },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [htmlPlugin, cssPlugin],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
};

export default config;
