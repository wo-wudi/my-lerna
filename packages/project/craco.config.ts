/*
 * @Author: licw
 * @Description: 
 * @LastEditTime: 2022-06-22 11:00:16
 */
/* eslint-disable */
import { CracoConfig, ESLINT_MODES } from '@craco/craco';
import { resolve } from 'path';
import { ProvidePlugin } from 'webpack';
import SimpleProgressWebpackPlugin from 'simple-progress-webpack-plugin';
import CracoEsbuildPlugin from 'craco-esbuild';
import CracoLessPlugin from 'craco-less';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default {
  plugins: [{ plugin: CracoEsbuildPlugin }, { plugin: CracoLessPlugin }],
  webpack: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    plugins: {
      add: [
        new ProvidePlugin({
          React: 'react',
        }),
        new SimpleProgressWebpackPlugin({}),
        new StyleLintPlugin({
          configBasedir: __dirname,
          context: resolve(__dirname, 'src'),
          files: ['**/*.css', '**/*.less', '**/*.scss'],
        }),
        new MonacoWebpackPlugin({
          languages: [ 'go', 'java', 'javascript', 'json', 'markdown', 'mysql', 'python', 'redis', 'ruby', 'rust', 'shell',  'sql']
        })
      ],
    },
    configure(webpackConfig, { env }) {
      /**
       * 开发环境不需要处理，便于开发调试
       * 生产环境打包： externals 公共依赖包，但是antd 并不能视为公共依赖包，因为使用的组件是动态加载的，没必要处理
       * 如果接入门户，公共依赖统一使用门户的
       * 如果不接入门户，那么公共资源也便于Http做持久化缓存，也加快打包速度
       */
      if (env !== 'development') {
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
        };
      }
      return webpackConfig;
    },
  },
  babel: {
    plugins: [
      [
        'babel-plugin-import',
        {
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: false, // 不能使用按需引入CSS，因为使用CSS3主题
        },
      ],
    ],
  },
  devServer: {
    proxy: [
      {
        context: ['/api'],
        target: 'http://127.0.0.1:12321/',
        changeOrigin: true,
      },
    ],
  },
  eslint: {
    mode: ESLINT_MODES.file,
  },
} as CracoConfig;
