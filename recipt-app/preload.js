const { contextBridge } = require('electron')

const StoreData = (data) => {
    console.log(data)
}

const API = {
    "StoreData": StoreData,
}

contextBridge.exposeInMainWorld("api", API)