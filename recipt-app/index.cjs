const { app, BrowserWindow } = require('electron')
const { join } = require('path')
const fs = require('fs')

app.whenReady().then(main)
//console.log(app.getPath("appData"))
function main() {
    const window = new BrowserWindow({
        width: 1800, height: 1000,
        autoHideMenuBar: true,
    })

    //window.webContents.preload()
    window.loadFile(join(__dirname, 'public/index.html'))
    window.webContents.openDevTools()
}