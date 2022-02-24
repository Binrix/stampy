export interface Project {
    id: number;
    title: string;
}

export interface ProjectExtended extends Project {
    amountHours: number;
    averageHoursPerWeek: number;
}