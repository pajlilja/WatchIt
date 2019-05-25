/**
 * One Webpack config for both dev and production.
 * Has support for Es6+ using Babel and Sass
 * Also works with React
 * Uses Webpack Dev Server in development for hot reloading
 *
 * Put Babel settings in a separate file called .babelrc
 *
 * Script to build: NODE_ENV=production webpack
 * Script to dev: webpack-dev-server --open --hot --inline
 *
 * Dependencies in this config:
 * npm i -D webpack webpack-cli webpack-dev-server
 * npm i -D uglifyjs-webpack-plugin clean-webpack-plugin webpack-merge
 * npm i -D node-sass sass-loader css-loader style-loader
 * npm i -D interpolate-html-plugin copy-webpack-plugin
 * npm i -D html-webpack-plugin extract-text-webpack-plugin@^4.0.0-beta.0
 * npm i -D babel-core babel-loader babel-preset-react babel-preset-env
 * npm i -D dotenv-webpack
 */

const path = require("path");
const url = require("url");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const packagejson = require("./package.json");

const production = process.env.NODE_ENV === "production";

// file names of bundles
const jsBundleName = "app.bundle.js";
const cssBundleName = "style.bundle.css";

// this dir should contain the entry point HTML and other static files
const contentBaseDir = path.resolve(__dirname, "public");

// where the built files should be
const outputDirName = path.resolve(__dirname, "dist");

// file name of entry HTML file
const htmlFile = "index.html";

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing shlash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
// In production, we read the `homepage` value from the package.json file
// (ensure the homepage value does not contain a trailing slash)
// and use "" as public url in development since Webpack Dev Server will serve
// the project at localhost:3000, aka from the root
const publicUrl = production ? packagejson.homepage || "" : "";

// common config options for both dev and prod
const config = {
  entry: "./src/index.js",
  output: {
    path: outputDirName,
    filename: jsBundleName,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [new Dotenv({ systemvars: true })],
};

let merged;
if (production) {
  merged = merge(config, {
    output: {
      publicPath: url.parse(publicUrl).pathname,
    },
    // minify JS, set process.env.NODE_ENV = "production" and other optimizations
    mode: "production",
    // source map type
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: { sourceMap: true },
              },
              {
                loader: "sass-loader",
                options: { sourceMap: true },
              },
            ],
            fallback: "style-loader",
          }),
        },
      ],
    },
    plugins: [
      // clean up dist dir
      new CleanWebpackPlugin([outputDirName]),
      // output CSS bundle
      new ExtractTextPlugin(cssBundleName),
      // inject bundles into our HTML file and minify
      new HtmlWebpackPlugin({
        filename: htmlFile,
        template: path.resolve(contentBaseDir, htmlFile),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      // In development, this will be an empty string.
      new InterpolateHtmlPlugin({
        PUBLIC_URL: publicUrl,
      }),
      // Copy all static files to the build folder except HTML files, which
      // should be handled by HtmlWebpackPlugin
      new CopyWebpackPlugin([
        {
          from: contentBaseDir,
          ignore: ["*.html"],
        },
      ]),
    ],
  });
} else {
  merged = merge(config, {
    output: {
      publicPath: "/",
    },
    // sets process.env.NODE_ENV = "development" and shows module path names
    mode: "development",
    // source map type
    devtool: "cheap-eval-source-map",
    devServer: {
      port: 3000,
      contentBase: contentBaseDir,
      // reload page when changing files in contentBase
      // does not interfere with HMR
      watchContentBase: true,
      // will fall back to index.html when no matching routes exist
      historyApiFallback: true,
      // terminal will only log errors, makes output prettier
      stats: "errors-only",
      // shows an error overlay when there is a compile error
      overlay: true,
      // should also enable hot and inline, but they
      // don't always work when enabled thru config files
      // hot: hot module replacement
      // inline: refresh page on changes that can't be hot replaced
    },
    module: {
      rules: [
        {
          // enable importing CSS in JS
          // to use hot reloading for CSS, must import it in JS
          test: /\.(scss|css)$/,
          use: [
            // creates style nodes from JS strings
            { loader: "style-loader" },
            // translates CSS into CommonJS
            { loader: "css-loader" },
            // compiles Sass to CSS
            { loader: "sass-loader" },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: htmlFile,
        template: path.resolve(__dirname, `${contentBaseDir}/${htmlFile}`),
      }),
      // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      // In development, this will be an empty string.
      new InterpolateHtmlPlugin({
        PUBLIC_URL: publicUrl,
      }),
    ],
  });
}

module.exports = merged;
