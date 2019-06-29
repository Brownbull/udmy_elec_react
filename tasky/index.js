const path = require('path')
const electron = require('electron')
const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ 
    webPreferences: { nodeIntegration: true } ,
    height: 500,
    width: 300,
    frame: false, 
    resizable: false,
    show: false

  })
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

  const iconName = process.platform === 'darwin' ? 'iconTemplate@2x.png' : 'windows-icon@2x.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new Tray(iconPath);
  tray.on('click', (event, bounds) => {
    // console.log(bounds.x, bounds.y) // get click position
    const { x, y } = bounds;
    const { height, width } = mainWindow.getBounds();
    let yPos = process.platform === 'darwin' ? y : y - height;
    let xPos = process.platform === 'darwin' ? x - (width / 2) : x - (width / 2);

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.setBounds({
        x: xPos,
        y: yPos,
        height: height,
        width: width
      })
      mainWindow.show();
    }
  });
});