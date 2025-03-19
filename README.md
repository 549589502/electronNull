<!--
 * @Description: 创建项目，打开项目
 * @Author: hexueying
 * @Date: 2025-03-17 16:55:26
 * @LastEditors: hexueying
 * @LastEditTime: 2025-03-18 14:29:38
 * @FilePath: README.md
-->

node版本18.20.7
#1.npm create vite@latest（创建vite项目）
#2.npm install
#3.npm run dev
#4.npm install electron -D（安装electron）
#5.新建electron文件夹=》main.js
const { app, BrowserWindow } = require('electron')
// const path = require("path")
 
const createWindow = () => {
  const mainWin = new BrowserWindow({
    width: 1000,
    height: 800,
  })
  
  //将链接修改成我们运行Vue时的地址：http://localhost:5173
  //mainWin.loadFile(path.join(__dirname, "./index.html"));
  mainWin.loadURL('http://localhost:5173')
 
}
 
// 准备完成调用创建方法
app.whenReady().then(() => {
  createWindow()
})
 
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
#6.修改package.json：
{
  "type": "commonjs",
  "main": "electron/main.js",
  "scripts": {
    "electron:dev": "electron ."
  }
}
#7.electron-》新建index.html:
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Electron</title>
  </head>
  <body>
    <h1>Hello Electron </h1>
  </body>
</html>

## npm run dev
## npm run electron:dev

#npm install nodemon -D(热更新工具)
package.json 的 scripts 标签新增一条启动命令，监控文件改变
"electron": "nodemon --exec electron . --watch ./ --ext .js,.html,.css,.vue",

#npm install npm-run-all -D（命令合并工具）
package.json 的 scripts 标签新增，nmp run start就会同时运行 vue 和 electron
"start": "npm-run-all --parallel dev electron",

#npm install electron-builder -D(打包工具)
package.json 的 scripts 标签新增：
"electron:build": "vite build && electron-builder"，
package.json 新增：
"build": {
    "productName": "electron-vue",
    "appId": "electron-vue",
    "asar": true,
    "directories": {
        "output": "dist_electron/${version}"
    },
    "files": [
        "dist",
        "electron"
    ],
    "nsis": {
        "oneClick": false,
        "allowToChangeInstallationDirectory": true
    },
    "mac": {
        "category": "your.app.category.type"
    },
    "win": {
        "icon": "./electron/log.ico",
        "target": [
        {
            "target": "nsis",
            "arch": [
            "ia32"
            ]
        }
        ]
    },
    "linux": {}
}
根据环境显示不同的地址：
在main.js：
const path = require("path");
//将链接修改成我们运行Vue时的地址：http://localhost:5173
//mainWin.loadFile(path.join(__dirname, "./index.html"));
//mainWin.loadURL('http://localhost:5173')

const env = app.isPackaged ? "production" : "development";
const indexHtml = {
development: "http://localhost:5173", // 开发环境
production: path.join(__dirname, "../dist/index.html"), // 生产环境
};

mainWin.loadURL(indexHtml[env]);

让vite打包后的静态资源能够以本地file协议访问
在vite.config.js:
mport { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
 
export default defineConfig({
  plugins: [vue()],
  base:'./',
  manifest:true,  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    exclude: ['electron'], 
  }

#npm run electron:build(打包)