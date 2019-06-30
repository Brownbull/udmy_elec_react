// System imports
const path = require('path')
const electron = require('electron')
// Project imports
const TimerTray = require('./app/timerTray')
const MainWindow = require('./app/mainWindow')

// Program Vars
const { app, ipcMain } = electron;
let mainWindow;
let tray;

// Setup Vars
let windowOptions = {
  webPreferences: { 
    nodeIntegration: true,
    backgroungThrottling: false
  },
  height: 500,
  width: 300,
  frame: false,
  resizable: false,
  show: false
}
let loadURL = `file://${__dirname}/src/index.html`;
const iconName = process.platform === 'darwin' ? 'iconTemplate@2x.png' : 'windows-icon@2x.png';
const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

// App
app.on('ready', () => {
  mainWindow = new MainWindow(loadURL, windowOptions);
  // Skip Task bar icon
  process.platform === 'win32' ? mainWindow.setSkipTaskbar(true) : app.dock.hide();
  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on("updt:timer", (event, timeLeft) => { 
  process.platform == 'darwin' ? tray.setTitle(timeLeft) : tray.displayBalloon({
    icon: iconPath,
    title: '', 
    content: timeLeft
  })
})
