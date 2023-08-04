import { FC, useCallback } from "react";
import { Project } from "./Project"
import './ProjectList.css';
import { useAppDispatch, useAppSelector } from "../hooks";
import { AddProject } from "./AddProject";
import { Dispatch } from "redux"
import { addProject } from "../features/project/projectActionCreator";

export const ProjectList: FC = () => {
    const projects: IProject[] = useAppSelector(
        (state) => state.projects
    );

    const dispatch: Dispatch<any> = useAppDispatch();

    const addProjectDispatch = useCallback(
        (project: IProject) => dispatch(addProject(project)),
        [dispatch]
    );

    return (
        <>
            <div className="AddProject">
                <AddProject saveProject={addProjectDispatch}></AddProject>
            </div>
            <div className="List">
                { projects.map(project =>
                    <Project 
                        project={project}
                    ></Project>
                )}
            </div>
        </>
    )
}