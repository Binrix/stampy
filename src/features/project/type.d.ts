interface IProject {
    id: number;
    name: string;
    totalHours?: number;
    costsPerHour?: number;
    timeStamps: Date[];
}

type ProjectState = {
    projects: IProject[]
}

type ProjectAction = {
    type: string;
    project: IProject
}

type DispatchType = (args: ProjectAction) => ProjectAction; 