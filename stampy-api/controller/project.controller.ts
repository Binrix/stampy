import { Db } from "../db.js";
import { Router, Request, Response } from "express";
import { Project } from "../tables/project";

export class ProjectController {
    public router: Router;

    public constructor() {
        this.router = Router();
        this.router.get('', this.getProjects);
        this.router.get('/:id', this.getProject);
        this.router.post('/create', this.createProject)
    }

    private getProjects(req: Request, res: Response): void {
        Db.knex<Project>('project')
            .then((data: Project[]) => {
                res.send(data);
            })
            .catch((error: any) => {
                res.status(400);
                res.send(error);
            });
    }

    private createProject(req: Request, res: Response): void {
        var project: Project = {
            title: req.body.name
        }

        Db.knex<Project>('project')
            .insert(project)
            .returning('*')
            .then((data: Project[]) => {
                res.send(data[0]);
            })
            .catch((error) => {
                res.status(400);
                res.send(error);
            });
    }

    private getProject(req: Request, res: Response): void {
        Db.knex<Project>('project')
            .where({ id: Number.parseInt(req.params['id'])})
            .then((data: Project[]) => {
                res.send(data[0]);
            })
            .catch((error) => {
                res.status(400);
                res.send(error);
            });
    }

}