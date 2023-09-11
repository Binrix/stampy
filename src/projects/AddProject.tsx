import { FC, useState, FormEvent } from "react";
import "./AddProject.css";

type Props = {
    saveProject: (project: IProject) => void
}

export const AddProject: FC<Props> = ({ saveProject }) => {
    const [project, setProject] = useState<IProject>()

    const handleProjectData = (e: FormEvent<HTMLInputElement>) => {
        setProject({
            ...project,
            id: project ? project!.id : 0,
            timeStamps: [],
            name: e.currentTarget.value
        });
    };

    const addProject = (e: FormEvent) => {
        e.preventDefault();
        saveProject(project!)
    }

    return (
        <form onSubmit={addProject}>
            <input
                type="text"
                id="name"
                placeholder="Name"
                onChange={handleProjectData}
            ></input>
            <button>Create project</button>
        </form>
    )
}
