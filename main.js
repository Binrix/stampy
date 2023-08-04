const { BrowserWindow, app, ipcMain} = require("electron");
const { url } = require("url");
const path = require("path");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("")

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Stampy',
        width: 1000,
        height: 600
    });
    const url = path.join('file://', __dirname, './build/index.html');

    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(url);
}

db.serialize(() => {
    db.run("CREATE TABLE project (name, costsPerHour, timeStamps)");
});

ipcMain.handle('db-query', async (event, sqlQuery) => {
    return new Promise(res => {
        db.all(sqlQuery, (err, rows) => {
          res(rows);
        });
    });
});

app.whenReady().then(createMainWindow);