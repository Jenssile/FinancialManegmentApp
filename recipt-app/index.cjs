const { app, BrowserWindow } = require('electron')
const { join } = require('path')

app.whenReady().then(main)

function main() {
    const window = new BrowserWindow({
        width: 1800, height: 1000,
        autoHideMenuBar: true,
    })

    window.loadFile(join(__dirname, 'public/index.html'))
    window.webContents.openDevTools()
}