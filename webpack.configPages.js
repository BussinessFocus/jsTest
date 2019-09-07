const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require("glob");

//读取src目录所有page入口
function getEntry() {
    let entry = {};
    glob.sync('./src/pages/**/*.js')
        .forEach(function (name) {
            var start = name.indexOf('src/') + 4,
                end = name.length - 3;
            var eArr = [];
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口 
            n = n.split('pages/')[1];
            eArr.push(name);
            entry[n] = eArr;
        });
    return entry;
};

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, chunks) {
    return {
        template: `./src/pages/${name}/index.html`,
        filename: process.env.NODE_ENV === "development" ? `${name.slice(name.lastIndexOf('/') + 1)}.html` : `${name.slice(name.lastIndexOf('/') + 1)}.html`,
        inject: true,   // 注入向所有的template模板中注入静态资源 就是编译的js和css 
        hash: false,    //开启hash  ?[hash]
        chunks: chunks,
        minify: process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            minifyCss: true, //压缩html内的样式
            minifyJS: true, //压缩html内的js
            // removeAttributeQuotes: true, //去除属性引用
        },
    };
};

let entrys = getEntry()
let htmlArray = []
Object.keys(entrys).forEach(element => {
    htmlArray.push({
        _html: element,
        title: ' ',
        chunks: [element, 'vendor']
    })
})

let pages = []
htmlArray.forEach(element => {
    pages.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)))
})


module.exports = {
    entrys,
    pages
}