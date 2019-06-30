const electron = require('electron');
const { BrowserWindow} = electron;

class MainWindow extends BrowserWindow {
  constructor(url, options){
    super(options);

    this.loadURL(url);
    this.on('blur', this.onBlur.bind(this));
  }

  onBlur() {
    this.hide();
  }
} //eof 

module.exports = MainWindow;