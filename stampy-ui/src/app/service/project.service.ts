import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "../../../../shared/types/project.type";

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
  
    constructor(private readonly httpClient: HttpClient) { }
  
    public getProjects(): Observable<Project[]> {
        return this.httpClient.get<Project[]>('http://localhost:3000/api/project');
    }
}