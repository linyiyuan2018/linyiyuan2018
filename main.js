// Modules to control application life and create native browser window
const {app, BrowserWindow,Menu,ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const template = [
  {
    label: 'V86_Linux',
    submenu: [
      {
        label: '关于',
        click () { require('electron').shell.openExternal('https://gitee.com/formatkm/v86_Linux') }
      },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


function initialize () {
  makeSingleInstance();

  //启动koa http服务
  app.server = require('./app.js');

  function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })
  }


  // This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

// Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

  ipcMain.on('quit', (event, arg)=> app.quit());

  ipcMain.on('openUrl',(event, arg)=>
  {
    let newwin = new BrowserWindow({
      width: 1100,
      height: 650,
      // frame:false,
      parent: mainWindow, //win是主窗口
    });
    newwin.loadURL(arg); //新开窗口的渲染进程
    newwin.on('closed',()=>{newwin = null});

  });
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return;

  app.requestSingleInstanceLock();

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus()
    }
  })
}


initialize();
