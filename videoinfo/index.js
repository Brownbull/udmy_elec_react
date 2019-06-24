const electron = require('electron');
const ffmpeg = require('ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  //console.log('App is now ready');
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (e, path)=> {
  ffmpeg.ffprobe(path, (err, metadata) => {
    // console.log('Video duration is: ', metadata.format.duration);
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
  });
});

