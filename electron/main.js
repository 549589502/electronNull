/*
 * @Description: 
 * @Author: hexueying
 * @Date: 2025-03-17 17:26:31
 * @LastEditors: hexueying
 * @LastEditTime: 2025-03-21 11:36:03
 * @FilePath: main.js
 */
const { app, BrowserWindow,Menu  } = require('electron')

const template = require("./app/menu.js");
const myWindow = require("./app/window.js");
 
const createWindow = () => {
  const mainWin = new BrowserWindow({
    width: myWindow.width,
    height: myWindow.height,
  })
  
  //将链接修改成我们运行Vue时的地址：http://localhost:5173
  //mainWin.loadFile(path.join(__dirname, "./index.html"));
  //mainWin.loadURL('http://localhost:5173')
 
  const env = app.isPackaged ? "production" : "development";
  const indexHtml = {
    development:  myWindow.development, // 开发环境
    production: myWindow.production, // 生产环境
  };
 
  mainWin.loadURL(indexHtml[env]);

  // -------------------加载一个模态窗口start-------------------------
  const child = new BrowserWindow({ parent: mainWin, modal: true, show: false,width:800,height:400 })
  child.loadURL('https://www.baidu.com/')
  child.once('ready-to-show', () => {
    child.show()
  })
  // -------------------加载一个模态窗口end-------------------------
}
 
// 准备完成调用创建方法
app.whenReady().then(() => {
  createWindow()
  createMenu();
})
 
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 创建菜单
function createMenu() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}