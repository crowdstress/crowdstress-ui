import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import WasmPack from '@wasm-tool/wasm-pack-plugin';

const htmlPlugin = new HtmlWebPackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') });
const wasmPlugin = new WasmPack({ crateDirectory: path.resolve(__dirname, 'wasm', 'pkg') });

const config: webpack.Configuration = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './js/bundle.js',
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
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [htmlPlugin, wasmPlugin],
  devServer: {
    stats: 'errors-only',
    historyApiFallback: true,
    port: 8088,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/api' : '' },
      },
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
    runtimeChunk: { name: (entrypoint: any): string => `runtime-${entrypoint.name}` },
  },
};

export default config;
