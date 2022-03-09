import { Db } from '../db.js';
import { Router, Request, Response } from "express";
import { WorkingBlock } from "../tables/workingblock";
import { resolveNaptr } from 'dns';


export class WorkingBlockController {
    public router: Router;

    public constructor() {
        this.router = Router();
        this.router.post('/start', this.startWorkingBlock);
        this.router.post('/stop', this.stopWorkingBlock);
        this.router.get('/time/:id', this.getWorkingTime);
        this.router.get('/:id', this.getWorkingBlocks);
        this.router.get('/:id/:startdate/:enddate', this.getWorkingBlocksFromWeek);
    }

    private stopWorkingBlock(req: Request, res: Response): void {
        console.log(req.body);
        Db.knex<WorkingBlock>('working_block')
            .whereNull('endtime')
            .andWhere({ projectid: Number.parseInt(req.body.id) })
            .update({ endtime: new Date() })
            .returning('*')
            .then((affectedRows: WorkingBlock[]) => {
                if(affectedRows.length > 0) {
                    var affectedWorkingBlock: WorkingBlock = affectedRows[0];

                    var dateDiff: number = affectedWorkingBlock.endtime!.valueOf() - affectedWorkingBlock.starttime.valueOf();

                    Db.knex<WorkingBlock>('working_block')
                        .where({ id: affectedWorkingBlock.id })
                        .update({ workingtime: dateDiff })
                        .then((updateResult: number) => {
                            res.send({ affectedRow: updateResult});
                            return;
                        })
                        .catch((error) => {
                            res.status(400);
                            res.send(error);
                        });
                } else {
                    res.status(400);
                    res.send("No rows were affected");
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(400);
                res.send(`The working block for the project with the id ${req.body.id} could not be closed`);
            });
    }

    private getWorkingBlocksFromWeek(req: Request, res: Response) {
        Db.knex<WorkingBlock>('working_block')
            .select()
            .where({ projectid: Number.parseInt(req.params['id']) })
            .andWhereBetween('starttime', [new Date(req.params['startdate']), new Date(req.params['enddate'])])
            .then((data: WorkingBlock[]) => {
                res.send(data);
            })
            .catch((error) => {
                console.error(error);
                res.status(400);
                res.send(`The working blocks between the ${req.params['startdate']} and ${req.params['enddate']} could not be fetched`);
            });
    }

    private getWorkingTime(req: Request, res: Response) {
        Db.knex<WorkingBlock>('working_block')
            .select()
            .where({ projectid: Number.parseInt(req.params['id']) })
            .sum('workingtime')
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                console.error(error);
                res.status(400);
                res.send(`The working time for the project with the id ${req.params['id']} could not be fetched`);
            })
    }

    private startWorkingBlock(req: Request, res: Response): void {
        console.log(req.body);
        Db.knex<WorkingBlock>('working_block')
            .select()
            .whereNull('endtime')
            .andWhere({ projectid: Number.parseInt(req.body.id) })
            .then((openWorkingBlocks: WorkingBlock[]) => {
                if(openWorkingBlocks.length <= 0) {
                    var workingBlock: WorkingBlock = {
                        projectid: Number.parseInt(req.body.id),
                        starttime: new Date(),
                    }

                    Db.knex<WorkingBlock>('working_block')
                        .insert(workingBlock)
                        .then((result) => {
                            res.send(result);
                        })
                        .catch((error) => {
                            res.status(400);
                            res.send(error);
                        });
                } else {
                    res.status(400);
                    res.send("The working block was already opened. Please close the current block");
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(400);
                res.send(`The working block for the project with the id ${req.body.id} could not be opened`);
            });
    }

    private getWorkingBlocks(req: Request, res: Response) {
        Db.knex<WorkingBlock>('working_block')
            .select()
            .where({ projectid:  Number.parseInt(req.params['id']) })
            .then((data: WorkingBlock[]) => {
                res.send(data);
            })
            .catch((error) => {
                console.error(error);
                res.status(400);
                res.send(`Working blocks for ${req.params['id']} were not found`);
            })
    }
}