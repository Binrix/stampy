import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../../../shared/types/project.type';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  public projects: Project[] = [];

  constructor(
    private readonly projectService: ProjectService,
    private readonly router: Router
  ) { }

  public openTimeManagementForProject(id: number): void {
    this.router.navigate(['/time-management', id]);
  }

  public createProject(projectInputField: HTMLInputElement) {
    var projectName: string = projectInputField.value;
    
    if(projectName.length < 3) {
      return;
    }

    this.projectService.createProject(projectName).subscribe((project: Project) => {
      console.log(project);
      
      //this.projects.push(project);
    });

    projectInputField.value = "";
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      console.log(projects);
      this.projects = projects;
    });
  }

}
