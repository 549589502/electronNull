/*
 * @Description: 
 * @Author: hexueying
 * @Date: 2025-03-17 17:26:31
 * @LastEditors: hexueying
 * @LastEditTime: 2025-03-19 13:43:45
 * @FilePath: main.js
 */
const { app, BrowserWindow,Menu  } = require('electron')
const path = require("path")
 
const createWindow = () => {
  const mainWin = new BrowserWindow({
    width: 1500,
    height: 1000,
  })
  
  //将链接修改成我们运行Vue时的地址：http://localhost:5173
  //mainWin.loadFile(path.join(__dirname, "./index.html"));
  //mainWin.loadURL('http://localhost:5173')
 
  const env = app.isPackaged ? "production" : "development";
  const indexHtml = {
    development: "http://localhost:5173", // 开发环境
    // development: "http://localhost:3100", // 开发环境
    production: path.join(__dirname, "../dist/index.html"), // 生产环境
  };
 
  mainWin.loadURL(indexHtml[env]);
}
 
// 准备完成调用创建方法
app.whenReady().then(() => {
  createWindow()
  createMenu();
})
 
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


function createMenu() {
  let template = [
    {
      label: '文件',
      submenu: [
        {label: '打开',
        accelerator: 'Ctrl+O',
        click(){
          console.log("open")
        }
        }
      ]
    },
    {
    label: '编辑',
    submenu: [{
      label: '撤销',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    }, {
      label: '重做',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: '剪切',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    }, {
      label: '复制',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }, {
      label: '粘贴',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    }, {
      label: '全选',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
    }]
  }, {
    label: '查看',
    submenu: [{
      label: '重载',
      accelerator: 'CmdOrCtrl+R',
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          // 重载之后, 刷新并关闭所有的次要窗体
          if (focusedWindow.id === 1) {
            BrowserWindow.getAllWindows().forEach(function (win) {
              if (win.id > 1) {
                win.close()
              }
            })
          }
          focusedWindow.reload()
        }
      }
    }, {
      label: '切换全屏',
      accelerator: (function () {
        if (process.platform === 'darwin') {
          return 'Ctrl+Command+F'
        } else {
          return 'F11'
        }
      })(),
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
        }
      }
    }, {
      label: '切换开发者工具',
      accelerator: (function () {
        if (process.platform === 'darwin') {
          return 'Alt+Command+I'
        } else {
          return 'Ctrl+Shift+I'
        }
      })(),
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      }
    }, {
      type: 'separator'
    }, {
      label: '应用程序菜单演示',
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          const options = {
            type: 'info',
            title: '应用程序菜单演示',
            buttons: ['好的'],
            message: '此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
          }
          dialog.showMessageBox(focusedWindow, options, function () {})
        }
      }
    }]
  }, {
    label: '窗口',
    role: 'window',
    submenu: [{
      label: '最小化',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    }, {
      label: '关闭',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }, {
      type: 'separator'
    }, {
      label: '重新打开窗口',
      accelerator: 'CmdOrCtrl+Shift+T',
      enabled: false,
      key: 'reopenMenuItem',
      click: function () {
        app.emit('activate')
      }
    }]
  }, {
    label: '帮助',
    role: 'help',
    submenu: [{
      label: '学习更多',
      click: function () {
        shell.openExternal('http://electron.atom.io')
      }
    }]
  }]
  
 
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
 
// app.whenReady().then(createMenu);