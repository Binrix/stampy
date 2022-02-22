import { Db } from './db.js';
import express from 'express';
import { Project } from 'tables/project.table';

const app = express();

Db.connect();
Db.initDb();

app.get("/", (req: any, res: any) => {
    Db.knex<Project>("project").then((data: Project[]) => {
        res.send(data);
    })
    .catch((error) => {
        res.status(400);
        res.send(error);
    });
});

app.listen(3000, () => console.log("Server is listening on port 3000"));

