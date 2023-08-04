import { FC } from "react";
import './Project.css';
import { Link } from "react-router-dom";

type Props = {
    project: IProject; 
}

export const Project: FC<Props> = ({ project }) => {
    const { name, totalHours } = project;

    return (
        <div className="Project">
            <h2>{ name }</h2>
            <p>{ totalHours } hours</p>
            <Link className="Link" to='project' state={project}></Link>
        </div>
    );
}