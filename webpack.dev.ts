import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebPackPlugin from 'html-webpack-plugin';

const htmlPlugin = new HtmlWebPackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') });

const config: webpack.Configuration = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './js/bundle.js',
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
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [htmlPlugin],
  devServer: {
    stats: 'errors-only',
    historyApiFallback: true,
    port: 8088,
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
