module.exports = {
  title: "workbook",
  components: "./playroom/components.ts",
  outputPath: "./dist/playroom",
  snippets: "./playroom/snippets/index.js",
  port: 9001,
  openBrowser: false,
  // themes: "./playroom/themes/index.ts",
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: __dirname,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                "@babel/preset-react"
              ],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader"
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"]
    }
  })
};
