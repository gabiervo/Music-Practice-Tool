const { createPublicKey } = require('crypto')
const {app, BrowserWindow} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 650,
        height:680,
        minWidth: 650,
        minHeight:680
    });
    win.loadFile('./src/index.html');
    win.focus();
}

app.whenReady().then(()=>{
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })

})
require('electron-reload')(__dirname)