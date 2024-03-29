const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/main.js',
    output: {
        path:path.resolve(__dirname,'dist'),
        filename:"js/bundle.js"
        
    },
    devServer:{
        contentBase:'dist'
    },
    plugins:[
        
            
        new htmlPlugin({
            filename:"index.html",
            template:"./src/index.html"
        })
    ]
    
}