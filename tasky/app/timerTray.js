const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.mainWindow = mainWindow;

    this.setToolTip('Timer App')

    this.on('click', this.onClick.bind(this))
    this.on('right-click', this.onRightClick.bind(this))
  }

  onClick(event, bounds){
    // console.log(bounds.x, bounds.y) // get click position
    const { x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();
    let yPos = process.platform === 'darwin' ? y : y - height;
    let xPos = process.platform === 'darwin' ? x - (width / 2) : x - (width / 2);

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({
        x: xPos,
        y: yPos,
        height: height,
        width: width
      })
      this.mainWindow.show();
    }
  } //eof onClick

  onRightClick(event) {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }

    ])
    this.popUpContextMenu(menuConfig);
  } // eof onRightClick
  
} // eof class TimerTray



module.exports = TimerTray;