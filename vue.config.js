const path = require("path");
module.exports = {
    publicPath: "./",
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        open: true,
        port: 8080
    }
}