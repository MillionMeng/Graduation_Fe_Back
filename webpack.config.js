const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    //入口文件
    entry  : './src/app.jsx',
    //出口文件 __dirname 当前目录
    output : {
        path : path.resolve(__dirname,'dist'),
        publicPath: '/dist/',
        filename : 'js/app.js'
    },
    resolve: {
        alias: {
            page        : path.resolve(__dirname,'src/page'),
            component   : path.resolve(__dirname,'src/component'),
        }
    },
    module :{
      rules : [
          //react语法的处理 (jsx)
          {
              test : /\.jsx$/,
              //exclude  对: 后面的文件不做处理
              exclude : /(node_module)/,
              use : {
                  loader : 'babel-loader',
                  options : {
                      //@babel/preset-env  改为简写env
                      //env自动根据环境来打包
                      presets : ['env','react']
                  }
              }
          },
          //css文件的处理
          {
              test : /\.css$/,
              use  : ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
              })
          },
          //sass文件的处理
          {
              test : /\.scss$/,
              use  : ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: ['css-loader','sass-loader']
              })
          },
          //图片的配置
          {
              test: /\.(png|jpg|gif)$/,
              use : {
                  loader: "url-loader",
                  options :{
                      limit : 8192,
                      name  : 'resource/[name].[ext]'
                  }
              }
          },
          //字体图标的配置
          {
              test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
              use : {
                  loader: "url-loader",
                  options :{
                      limit : 8192,
                      name  : 'resource/[name].[ext]'
                  }
              }
          }
      ]
    },
    plugins : [
        //处理html文件
        new HtmlWebpackPlugin({
            template : './src/index.html',
            favicon:'./ibuy32.ico'
        }),
        //独立css文件
        new ExtractTextPlugin("css/[name].css"),
        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        })
    ],
    devServer: {
        port: 8086,
        historyApiFallback:{
            index : '/dist/index.html'
        }
    }
};