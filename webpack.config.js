const path = require('path');
const webpack = require('webpack'); 
var HtmlWebpackPlugin = require('html-webpack-plugin'); // used to compile html from the template to /dist


/**
 * We want to achieve the following
 * 1. Compile js, jsx from ES6 and jsx to browser compatible js 
 * 2. Produce built folder that can simply be deploy on static file host like S3 or github pages
 * 3. Prevent relative path importing
 * 
 * Babel and babel-loader is used for compiling jsx and es6 to browser compatible js 
 * We use file loaders like css-loader, style-loader, file-loader etc to bundle the images, css and other relevant files into /dist
 * 
 * For development we serve a local server which keeps a file and recompiles and serves everything
 * There is hot reloading enabled, which means the browser will reload everything if files changes. This is done using websockets. 
 * Handled by the HotModuleReplacementPlugin
 * Check App.js default export, there is a minimal change done
 * 
 */

module.exports = {
    entry: './src/index.js', // Entry point for the webpack to start traversing dependency graph
    mode: "development", 
    module: {
        rules: [ // These are the rules that tell webpack to transform the files
            {
                // compile js and jsx files, using babel-loader 
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env"]
                }
            }, {
                // compiles css files
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }, {
                // compile png, jpg, gif etc files 
                // places these in /dist/images/{name}-{hash}.{ext}
                // mostly hash is used to because browser caches these contents, to refresh them we use this
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name]-[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],  // resolves file when doing import xyz from "XYZ" (XYZ can be XYZ.js, XYZ.jsx or XYZ.*),
        modules: [ // This will free us from using relative imports 
            // instead of doing import image from "../../../public/images/react-logo.png" in Title/Title.jsx you can now simply use
            // import image from "images/react-logo.png"
            // Similar things can be used to refer components
            // Check App.jsx 
            path.resolve('./src'),
            path.resolve('./public'),
            path.resolve('./node_modules')
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist/"), // output should go here 
        publicPath: "/", // This is relevant to the devServer // This is used internally in the bundle.js and to map to files and assets
        filename: "bundle.js" 
    }, 
    devServer: {
        // contentBase: path.join(__dirname, 'dist'), //only used to serve static files, not needed anymore
        port: 3000,
        publicPath: "/", // Files will be bundled and available at this path
        hotOnly: true // enable hot reloading
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ // Used to inject built bundle.js dynamically and place it in /dist 
            template: 'public/index.html', // Use public/index.html as the template to be placed in /dist/index.html
            favicon: 'public/images/react.png' // inject this dynamically 
        })
    ]
};