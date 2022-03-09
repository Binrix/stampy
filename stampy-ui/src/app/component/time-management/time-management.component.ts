import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { WorkingBlockService } from 'src/app/service/working-block.service';
import { Project } from '../../../../../shared/types/project.type';
import { WorkingBlock } from '../../../../../shared/types/workingBlock.type';
import { startOfWeek, endOfWeek, subWeeks, addWeeks, endOfMonth, startOfMonth } from 'date-fns'

@Component({
  selector: 'app-time-management',
  templateUrl: './time-management.component.html',
  styleUrls: ['./time-management.component.scss']
})
export class TimeManagementComponent implements OnInit {
  public project: Project = {
    id: 0,
    title: ''
  };
  public totalWorkingTime: string = '0';
  public workingBlocks: WorkingBlock[] = [];
  public startWeek: Date = startOfWeek(new Date(), { weekStartsOn: 1 });
  public endWeek: Date = endOfWeek(new Date(), { weekStartsOn: 1 });
  public startMonth: Date = startOfMonth(new Date()); 
  public endMonth: Date = endOfMonth(new Date()); 

  constructor(
    private readonly route: ActivatedRoute,
    private readonly projectService: ProjectService,
    private readonly workingBlockService: WorkingBlockService,
    private readonly router: Router
  ) { }

  public millisecondsToHours(milliseconds: number | undefined): string {
    if(milliseconds === undefined) { return '0 hours'; }
    return `${(milliseconds / (1000 * 60 * 60)).toFixed(2)} hours` ;
  }

  public startWorkingBlock(): void {
    this.workingBlockService.startWorkingBlock(this.project.id).subscribe((result) => {
      console.log(result);
    }); 
  } 

  public goToProjectOverview(): void {
    this.router.navigate(['/projects']);
  }

  public stopWorkingBlock(): void {
    this.workingBlockService.stopWorkingBlock(this.project.id).subscribe((result: number) => {
      console.log(result);
      this.getWorkingTime();
    });
  }

  public getWeekByFactor(factor: number) {
    return addWeeks(this.startWeek, 1 * factor);
  }

  public getWorkingTime(): void {
    this.workingBlockService.getWorkingTime(this.project.id).subscribe((result: { sum: string; }[]) => {
      var sum: number = Number.parseInt(result[0].sum);
      this.totalWorkingTime = this.millisecondsToHours(Number.isNaN(sum) === true ? 0 : sum);
    });
  }

  public getWorkingBlocksOfPreviousWeek() {
    this.endWeek = subWeeks(this.endWeek, 1);
    this.startWeek = subWeeks(this.startWeek, 1);
    this.getWorkingBlocks();
  }

  public getWorkingBlocksOfNextWeek() {
    this.endWeek = addWeeks(this.endWeek, 1);
    this.startWeek = addWeeks(this.startWeek, 1);
    this.getWorkingBlocks();
  }

  public getWorkingBlocks(): void {
    this.workingBlockService.getWorkingBlocks(this.project.id,  this.startWeek, this.endWeek).subscribe((result: WorkingBlock[]) => {
      console.log(result);
      this.workingBlocks = result;
    });
  }

  ngOnInit(): void {
    var idOfProject = this.route.snapshot.params['id'];
    this.projectService.getOneById(idOfProject).subscribe((project: Project) => {
      this.project = project;
      console.log(this.startWeek);
      console.log(this.endWeek);
      this.getWorkingTime();
      this.getWorkingBlocks();
    });

  }

}
