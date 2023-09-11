const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");

const isWin = process.platform === "win32";
const sqlite3 = require("sqlite3");

var dbPath = isWin ? path.join('file://', __dirname, './build/db/file.db') : './build/db/file.db';
const db = new sqlite3.Database(dbPath);

function createMainWindow () {
    const mainWindow = new BrowserWindow({
        title: 'Stampy',
        width: 1000,
        height: 600
    });

    var url;
    if (isWin) {
        url = path.join('file://', __dirname, './build/index.html');
        mainWindow.loadURL(url);
    } else {
        mainWindow.loadFile('./build/index.html');
    }

    mainWindow.webContents.openDevTools();
}

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS project (id INTEGER PRIMARY KEY, name TEXT, costsPerHour INTEGER, timeStamps STRING)");
});

ipcMain.handle('db-query', async (event, sqlQuery) => {
    return new Promise(res => {
        db.all(sqlQuery, (err, rows) => {
            res(rows);
        });
    });
});

app.whenReady().then(createMainWindow);
