import React from "react";
import { ProjectList } from "./ProjectList";
import "./ProjectView.css";

export class ProjectView extends React.Component {
    render() {
        return (
            <div className="Container" >
                <ProjectList></ProjectList>
            </div>
        )
    }
}