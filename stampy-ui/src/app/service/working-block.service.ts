import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WorkingBlock } from "../../../../shared/types/workingBlock.type";

@Injectable({
    providedIn: 'root',
})
export class WorkingBlockService {
    constructor(private readonly httpClient: HttpClient) {  }

    public startWorkingBlock(projectId: number): Observable<WorkingBlock> {
        return this.httpClient.post<WorkingBlock>(`/api/workingblock/start`, { id: projectId });
    }

    public stopWorkingBlock(projectId: number): Observable<WorkingBlock> {
        return this.httpClient.post<WorkingBlock>(`/api/workingblock/stop`, { id: projectId });
    }

    public getWorkingTime(projectId: number): Observable<{ sum: string; }[]> {
        return this.httpClient.get<{ sum: string }[]>(`/api/workingblock/time/${projectId}`);
    }

    public getWorkingBlocks(projectId: number, startDate: Date, endDate: Date): Observable<WorkingBlock[]> {
        return this.httpClient.get<WorkingBlock[]>(`/api/workingblock/${projectId}/${startDate}/${endDate}`);
    }

    public getOpenWorkingBlock(projectId: number): Observable<WorkingBlock> {
        return this.httpClient.get<WorkingBlock>(`/api/workingblock/open/${projectId}`);
    }

}