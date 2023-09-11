import { FC } from "react";
import './Project.css';
import { Link } from "react-router-dom";
import { timestamp } from "rxjs";

type Props = {
    project: IProject;
}

export const Project: FC<Props> = ({ project }) => {
    const { name, timeStamps } = project;

    var time = 0;
    var timeStampsLength = timeStamps.length;

    for (let i = 0; i <= timeStampsLength - 2; i += 2)
        time += timeStamps[i + 1].getTime() - timeStamps[i].getTime();

    return (
        <div className="Project">
            <h2>{name}</h2>
            <p>{(time / 3600000).toFixed(2)} hours</p>
            <Link className="Link" to='project' state={project}></Link>
        </div>
    );
}
