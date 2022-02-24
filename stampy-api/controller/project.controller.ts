import { Db } from "../db.js";
import { Router, Request, Response } from "express";
import { Project } from "../tables/project.table";

export class ProjectController {
    public router: Router;

    public constructor() {
        this.router = Router();
        this.router.get('', this.getProjects)
    }

    private getProjects(req: Request, res: Response) {
        Db.knex<Project>("project")
            .then((data: Project[]) => {
                res.send(data);
            })
            .catch((error: any) => {
                res.status(400);
                res.send(error);
            });
    }

}