const path = require("path")

const myWindow = {
  width:1500,
  height:1000,
  development:"http://localhost:5173", // 开发环境
  production:path.join(__dirname, "../dist/index.html"), // 生产环境
}

module.exports = myWindow;