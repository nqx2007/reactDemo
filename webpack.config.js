/**
 * Created by niuqingxia on 2017/8/21.
 */
var path=require('path');//node 路径模块;
var webpack=require('webpack');//webpack模块;
var HtmlwebpackPlugin=require('html-webpack-plugin');//html模板模块;
var ExtractTextPlugin=require('extract-text-webpack-plugin');//独立打包css模块;
module.exports= {
    //启动dev source map，出错以后就会采用source-map的形式直接显示你出错代码的位置。
    devtool: 'eval-source-map',
    /*ertry表示入口文件，可以是一个字符串，对象，数组
        ----值为字符串时表示只有一个要打包的模块
        ----值为数组时表示将多个模块打包成一个模块，如果模块之间不存在依赖，数组之间值得顺序没有要求；
            如果有依赖关系，依赖性最高的模块要放在数组最后面
        ----值为对象表示将多个木块分别打包成多个模块，此时的output的filename不能是一个固定的名称
     */
    entry: {
        app: path.resolve(__dirname, 'app/main.js')
    },
    /*output是一个对象，表示webpack打出后的文件的输出
    -----output.publicPath
    -----(必须值)output.path表示输出文件的路径
    -----(必须值)output.filename表示输出文件的文件名，
         当输出只有一个文件时，文件名字为一个确定的字符串
         当输出多个文件(对应多个入口文件),filename的取值需要用到
                [name] is replaced by the name of the chunk.
     　　　　　　[hash] is replaced by the hash of the compilation.
     　　　　　　[chunkhash] is replaced by the hash of the chunk.
          [name].([hash].[chunkhash]).js

     */
    output: {
        publicPath: "build/",
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    /*webpack自身只理解js,module是一个对象，定义对模块的处理逻辑，loader是在文件被添加到依赖图中时，
          将其转换为模块
        -----1.x版本的module定义方式为：
             module.loaders:[
             　　　　　　　　{
             　　　　　　　　　　test:正则，用于匹配要处理的文件
             　　　　　　　　　　loader/loaders: 字符串或者数组， 如果只需要用到一个模块加载器 ,
                                                则使用loader：string，如果要使用多个模块加载器，
                                                则使用loaders：array
             　　　　　　　　　　include:字符串或者数组，指包含的文件夹
             　　　　　　　　　　exclude：字符串或者数组，指排除的文件夹
             　　　　　　　　}
             　　　　　　]
     */
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },{
            test: /\.css$/, //加载CSS文件
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract('css-loader')
        },{
            test:/\.(woff|woff2|eot|ttf|otf)$/,//加载字体
            exclude: /node_modules/,
            use:['file-loader']
        },{

            test: /\.(png|svg|jpg|gif)$/,//加载图片
            exclude: /node_modules/,
            use: ['file-loader']
        }]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("styles.css"),
        new HtmlwebpackPlugin({
            title:'hahaha',
            template:path.resolve(__dirname,'app/templates/index.ejs'),
            inject:'body'
        }),
        new webpack.ProvidePlugin({
            React:"react",
            ReactDOM:"react-dom"
        })
    ],
    /*devServer是webpack-dev-server(轻量级服务器)的配置
     */
    devServer: {
        contentBase: './build',
        historyApiFallback: true,
        inline: true,
        port: 8080
    }
}
