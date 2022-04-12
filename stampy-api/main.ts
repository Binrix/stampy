import { Db } from './db.js';
import express, { Application, json, urlencoded } from 'express';
import * as http from 'http';
import * as path from 'path';
import { ProjectController } from './controller/project.controller.js';
import { WorkingBlockController } from './controller/workingblock.controller.js';

export class Server {
    private httpServer: http.Server;
    private app: Application;

    constructor() {
        const port = 3000;

        this.app = express();
        
        this.app.use(json({ limit: '50mb'}));
        this.app.use(urlencoded({ limit: '50mb', extended: true }));

        this.registerController();

        this.app.use(express.static(path.join(process.cwd(), '/stampy-ui/dist/stampy-ui'))); // /stampy-ui/dist/stampy-ui (local) | /stampy-ui (docker)
        this.app.use(express.urlencoded({ extended: true }));

        this.app.get('*', (req, res) => {
            res.sendFile(path.join(process.cwd(), '/stampy-ui/dist/stampy-ui/index.html')); // /stampy-ui/dist/stampy-ui/index.html | /stampy-ui/index.html (docker)
        });

        this.httpServer = http.createServer(this.app);
        Db.connect();

        this.httpServer.listen(port, () => {
            console.log(`Server runs on port ${port}`);
        });
    }

    registerController() {
        this.app.use('/api/project', new ProjectController().router);
        this.app.use('/api/workingblock', new WorkingBlockController().router);
    };
}

new Server();
