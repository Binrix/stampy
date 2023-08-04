import * as actionTypes from './projectActionTypes';

export function addProject(project: IProject) {
    const action: ProjectAction = {
        type: actionTypes.ADD_PROJECT,
        project: project
    }

    return action;
}

export function toggleTimer(project: IProject, timeStamp: Date) {  
    project.timeStamps.push(timeStamp);
    
    const action: ProjectAction = {
        type: actionTypes.TOGGLE_TIMER,
        project
    };

    return action;
}