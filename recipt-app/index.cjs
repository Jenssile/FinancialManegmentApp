const { app, BrowserWindow } = require('electron')
const { join } = require('path')

app.whenReady().then(main)

function main() {
    const window = new BrowserWindow({
        width: 800, height: 700,
        autoHideMenuBar: true,
    })

    window.loadFile(join(__dirname, 'public/index.html'))
    //window.webContents.openDevTools()
}