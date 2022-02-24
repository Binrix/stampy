import { Db } from './db.js';
import express, { Application } from 'express';
import * as http from 'http';
import * as path from 'path';
import { ProjectController } from './controller/project.controller.js';
import { Http2ServerRequest } from 'http2';

export class Server {
    private httpServer: http.Server;
    private app: Application;

    constructor() {
        const port = 3000;

        this.app = express();

        this.registerController();

        this.app.use(express.static(path.join(process.cwd(), '/stampy-ui/dist/stampy-ui')));

        this.app.get('*', (req, res) => {
            res.sendFile(path.join(process.cwd(), '/stampy-ui/dist/stampy-ui/index.html'));
        });

        this.httpServer = http.createServer(this.app);
        Db.connect();

        this.httpServer.listen(port, () => {
            console.log(`Server runs on port ${port}`);
        });
    }

    registerController() {
        this.app.use('/api/project', new ProjectController().router);
    };
}

new Server();
