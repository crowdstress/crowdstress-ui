import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WasmPack from '@wasm-tool/wasm-pack-plugin';


const htmlPlugin = new HtmlWebPackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') });
const cssPlugin = new MiniCssExtractPlugin({
  filename: './css/[name].[contenthash:8].css',
  chunkFilename: './css/[name].[contenthash:8].chunk.css',
});
const wasmPlugin = new WasmPack({ crateDirectory: path.resolve(__dirname, 'wasm', 'pkg') });

const config: webpack.Configuration = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './js/[name].[contenthash:8].js',
    chunkFilename: './js/[name].[contenthash:8].chunk.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.wasm'],
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
  plugins: [htmlPlugin, cssPlugin, wasmPlugin],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
};

export default config;
