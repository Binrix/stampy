import * as actionTypes from './projectActionTypes';

const initialState: ProjectState = {
    projects: [
        { id: 1, name: "test1", totalHours: 20, timeStamps: [] },
        { id: 2, name: "test2", totalHours: 10, timeStamps: [] },
        { id: 3, name: "test3", totalHours: 30, timeStamps: [] },
        { id: 4, name: "test4", totalHours: 50, timeStamps: [] },
        { id: 5, name: "test5", totalHours: 90, timeStamps: [] },
        { id: 6, name: "test6", totalHours: 98, timeStamps: [] },
    ]
}

function replaceProject(arr: IProject[], itemForReplacement: IProject) {

}

const reducer = (state = initialState, action: ProjectAction): ProjectState => {
    switch(action.type) {
        case actionTypes.ADD_PROJECT:
            return {
                ...state,
                projects: state.projects.concat(action.project)
            };
        case actionTypes.TOGGLE_TIMER:
            let index = state.projects.findIndex(p => p.id == action.project.id);
            if(index != undefined)
                state.projects[index] = action.project;

            return {
                ...state,
                projects: state.projects
            }
        }

    return state;
}

export default reducer;