var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'src');
var publicDir = path.resolve(process.cwd(), 'public');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'scripts');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'scripts', item);
        }
    });
    console.log("============");
    console.log(JSON.stringify(files));
    return files;
}

module.exports = {
    cache: true,
    devtool: "#source-map",
    entry: {
        'index':path.resolve(srcDir, 'scripts/index.js'),
        'list': path.resolve(srcDir, 'scripts/list.js'),
        'list-detail': path.resolve(srcDir, 'scripts/list-detail.js'),
        'error': path.resolve(srcDir, 'scripts/error.js'),
        'common':["jquery", "lodash"]
    },
    output: {
        path: path.resolve(publicDir, 'scripts'),
        filename: "[name].js",
        chunkFilename: "[chunkhash:8].js",
    },
    resolve: {
        alias: {
            jquery: "./src/scripts/lib/jquery.js",
            lodash: "./src/scripts/lib/lodash.js",
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(
            "common",
            'common.js'
        ),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

    ]
};