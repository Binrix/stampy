export interface WorkingBlock {
    id?: number;
    project_id: number;
    starttime: Date;
    endtime?: Date;
    workingtime: number;
}