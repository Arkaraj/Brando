const path = require('path');

module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    webpack: {
        configure: (webpackConfig) => {
          webpackConfig.output.path = path.resolve(__dirname, "../build");
          return webpackConfig;
        },
      },
}
