const path=require("path")
const HTMLplugin=require('html-webpack-plugin')
const ImageMinPlugin=require('image-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const clearPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const CssMinExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports={
    entry:path.resolve(__dirname,'./src/index.js')
    ,output:{
        filename:'script.bundle.js'
        ,path: path.resolve(__dirname,'./dist')
    }
    ,mode:'development'
    ,module:{
        rules:[
        {
            test:/\.css$/i,
            use:[CssMinExtractPlugin.loader,'css-loader']
        },
        {
            test:/\.(png|jpe?g|gif)$/i,
            use:[{
                loader: 'file-loader', 
                options:{
                    name:'[path][name].[ext]',
                    outputPath:'images/'
                }
            },
            {
                loader:ImageMinPlugin.loader,
                options:{
                    minimizerOptions:{
                        plugins: ['gifsicle',
                        'svgo',
                        'optipng',
                        ['mozjpeg',{quality:60}]
                    ]
                    }
                }
            }
        ],
        },
        {
            test: /\.s[ac]ss$/i,
            use:[CssMinExtractPlugin.loader, 'css-loader','sass-loader' ]
        }
        ]
    }
    ,plugins:[
        new HTMLplugin({title:'output',filename:'index.html',inject:'body'}),
        new clearPlugin(),
        new CssMinExtractPlugin()
    ]
    ,optimization:{
        minimize:true,
        minimizer:[
            new TerserPlugin({
                terserOptions:{
                    format:{
                        comments:false
                    }
                },
                extractComments:false,
            }),
            new CssMinimizerPlugin(),
        ]
    }
}