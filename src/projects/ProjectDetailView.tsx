import { Dispatch, FC, useCallback, useState } from 'react';
import './ProjectDetailView.css';
import { useLocation } from "react-router-dom";
import { useAppDispatch } from '../hooks';
import { toggleTimer } from '../features/project/projectActionCreator';
import dayjs from 'dayjs';

export const ProjectDetailView: FC = () => {
    const projectToDetail = useLocation().state as IProject;
    const [project, setProject] = useState<IProject>();

    const dispatch: Dispatch<any> = useAppDispatch();

    const handleProjectData = (project: IProject) => {
        setProject({
            ...project
        });
    };

    const toggleTimerDispatch = useCallback(
        (project: IProject, timeStamp: Date) => dispatch(toggleTimer(project, timeStamp)),
        [dispatch]
    );

    const toggleTimerFnc = () => {
        let date = new Date();
        handleProjectData(projectToDetail)
        toggleTimerDispatch(projectToDetail!, date);
    }

    return (
        <div className='Container'>
            <div className="Project">
                <h2>{ projectToDetail!.name }</h2>
                <button onClick={toggleTimerFnc}>Start timer</button>
            </div>
            <div className='Timestamps'>
                <h2>Timestamps</h2>
                { projectToDetail!.timeStamps.map(timeStamp => 
                    <p>{ dayjs(timeStamp).format("DD.MM.YYYY HH:mm:ss") }</p>
                )}    
            </div>
        </div>
    );
}