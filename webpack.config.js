const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//独立提取css的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const {CleanWebpackPlugin} = require("clean-webpack-plugin");//清理输出文件夹插件
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//打包分析插件
const devMode = process.env.NODE_ENV !== 'production';//标识生产/开发环境
const pages = require('./webpack.configPages.js');
const merge = require('webpack-merge');
const os = require('os');
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");

if (process.env.NODE_ENV === 'test') {
    console.log('打包测试环境程序！')
} else {
    console.log(devMode ? "打包开发环境程序！" : "打包生产环境程序！");
}

/**
 * 获取本机ip
 * @returns {app.address}
 */
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

let hmr = new webpack.HotModuleReplacementPlugin();

const conf = {
    entry: {},
    output: {
        filename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash:7].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ""
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'),
            'src@': path.resolve(__dirname, 'src')
        }
    },
    // externals: {
    //     $: 'jquery'
    // },
    devServer: {
        index:"login.html",//设置打开的主页
        host:getIPAdress(),
        disableHostCheck: true,
        contentBase: './dist',
        hot: devMode ? true : false
    },
    plugins: [
        new MiniCssExtractPlugin({//声明文件分离插件
            filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash:7].css',
            allChunks: true
        }),
        //静态资源输出
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, "./static"),
            to: './static',
            ignore: ['.*']
        }]),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                map: devMode ? {
                    // 不生成内联映射,这样配置就会生成一个source-map文件
                    inline: false,
                    //向css文件添加source-map路径注释,如果没有此项压缩后的css会去除source-map路径注释
                    annotation: true
                } : ''//开发环境下生成cssmap文件
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({//定义全局变量
            HTTP_ENV: JSON.stringify(process.env.NODE_ENV)
        }),
        // new BundleAnalyzerPlugin(),//打包分析插件
        new webpack.ProvidePlugin({//单独全局引入第三方插件
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ],
    optimization: {
        splitChunks: {//分离公共的js库
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /jquery|bootstrap/,
                    chunks: "all",
                    priority: 10
                }
            }
        }
    },
    module: {
        rules: [
            {//使用babel转义js
                test: /\.js$/,
                exclude: /node_modules/,//排除node_modules文件夹下的js文件的转义
                use:[
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {//加载less文件
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'less-loader',
                    "postcss-loader"
                ]
            },
            {//加载css文件
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    "postcss-loader"
                ]
            },
            /*{//加载html文件,这里不适用全局的html加载器因为会和htmlwebpackplugin冲突
                test:/\.(html)$/,
                use:{
                    loader:'html-loader'
                }
            },*/
            {//加载图片
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].[ext]',
                            limit: 10000//设置小于10k的文件转换为base64
                        }
                    }
                ]
            },
            {//加载svg
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'assets/[name].[ext]',
                            limit: 10000//设置小于10k的文件转换为base64
                        }
                    }
                ]
            },
            {//加载字体文件
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'assets/[name].[ext]',
                            limit: 10000//设置小于10k的文件转换为base64
                        }
                    }
                ]
            }
        ]
    }
}

if (devMode) {
    conf.plugins.push(hmr);
} else {
    conf.plugins.push(new CleanWebpackPlugin())//非开发环境添加清理插件
}

pageConf = {
    entry: pages.entrys,
    plugins: pages.pages
};

module.exports = merge(conf, pageConf);