var path = require('path')
var webpack = require('webpack')
var Mix = require('webpack-mix').config;
var plugins = require('webpack-mix').plugins;


Mix.initialize();

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          },
          postcss: [
              require('autoprefixer')
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },

  devtool: Mix.sourcemaps
}

module.exports.context = Mix.Paths.root();
module.exports.entry = Mix.entry();
module.exports.output = Mix.output();

if (Mix.cssPreprocessor) {
    Mix[Mix.cssPreprocessor].forEach(toCompile => {
        let extractPlugin = new plugins.ExtractTextPlugin(
            Mix.cssOutput(toCompile)
        );

        module.exports.module.rules.push({
            test: new RegExp(toCompile.src.fileWithDir.replace(/\\/g, '\\\\') + '$'),
            loader: extractPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: [
                    'css-loader',
                    'postcss-loader',
                    'resolve-url-loader',
                    (Mix.cssPreprocessor == 'sass') ? 'sass-loader?sourceMap&precision=8' : 'less-loader'
                ]
            })
        });

        module.exports.plugins = (module.exports.plugins || []).concat(extractPlugin);
    });
}


module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.ProvidePlugin(Mix.autoload || {
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery'
    }),

    new plugins.FriendlyErrorsWebpackPlugin(),

    new plugins.StatsWriterPlugin({
        filename: "mix-manifest.json",
        transform: Mix.manifest.transform,
    }),

    new plugins.WebpackMd5HashPlugin(),

    new webpack.LoaderOptionsPlugin({
        minimize: Mix.inProduction,
        options: {
            postcss: [
                require('autoprefixer')
            ],
            context: __dirname,
            output: { path: './' }
        }
    })
]);



if (Mix.notifications) {
    module.exports.plugins.push(
        new plugins.WebpackNotifierPlugin({
            title: 'Webpack Mix',
            alwaysNotify: true,
            contentImage: Mix.Paths.root('node_modules/webpack-mix/icons/webpack.png')
        })
    );
}


module.exports.plugins.push(
    new plugins.WebpackOnBuildPlugin(
        stats => Mix.events.fire('build', stats)
    )
);


if (Mix.versioning) {
    Mix.versioning.record();

    module.exports.plugins.push(
        new plugins.WebpackOnBuildPlugin(() => {
            Mix.versioning.prune(Mix.publicPath);
        })
    );
}


if (Mix.combine || Mix.minify) {
    module.exports.plugins.push(
        new plugins.WebpackOnBuildPlugin(() => {
            Mix.concatenateAll().minifyAll();
        })
    );
}


if (Mix.copy) {
    Mix.copy.forEach(copy => {
        module.exports.plugins.push(
            new plugins.CopyWebpackPlugin([copy])
        );
    });
}


if (Mix.js.vendor) {
    module.exports.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            names: [Mix.js.base + '/vendor', Mix.js.base + '/' + 'manifest'],
            minChunks: Infinity
        })
    );
}


if (Mix.inProduction) {
    module.exports.plugins = module.exports.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ]);
}


/*
 |--------------------------------------------------------------------------
 | Mix Finalizing
 |--------------------------------------------------------------------------
 |
 | Now that we've declared the entirety of our Webpack configuration, the
 | final step is to scan for any custom configuration in the Mix file.
 | If mix.webpackConfig() is called, we'll merge it in, and build!
 |
 */
Mix.finalize(module.exports);



if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
