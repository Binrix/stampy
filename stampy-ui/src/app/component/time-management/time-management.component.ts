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
  public totalWorkingTimeOfWeek: string = '0';
  public totalWorkingTime: string = '0';
  public workingBlocks: WorkingBlock[] = [];
  public startWeek: Date = startOfWeek(new Date(), { weekStartsOn: 1 });
  public endWeek: Date = endOfWeek(new Date(), { weekStartsOn: 1 });
  public startMonth: Date = startOfMonth(new Date()); 
  public endMonth: Date = endOfMonth(new Date()); 
  public isWorking: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly projectService: ProjectService,
    private readonly workingBlockService: WorkingBlockService,
    private readonly router: Router
  ) { }

  public millisecondsToHoursString(milliseconds: number | undefined): string {
    if(milliseconds === undefined) { return '0 hours'; }
    return `${(milliseconds / (1000 * 60 * 60)).toFixed(2)} hours` ;
  }

  public startWorkingBlock(): void {
    this.workingBlockService.startWorkingBlock(this.project.id).subscribe((result: WorkingBlock) => {
      this.isWorking = true;
      this.workingBlocks.push(result);
    }); 
  } 

  public goToProjectOverview(): void {
    this.router.navigate(['/projects']);
  }

  public stopWorkingBlock(): void {
    this.workingBlockService.stopWorkingBlock(this.project.id).subscribe((result: WorkingBlock) => {
      
      for(var i = 0; i < this.workingBlocks.length; i++) {
        if(this.workingBlocks[i].id == result.id) {
          this.workingBlocks[i] = result;
          break;
        }
      }

      this.isWorking = false;
      this.getWorkingTime();
    });
  }

  public getWeekByFactor(factor: number) {
    return addWeeks(this.startWeek, 1 * factor);
  }

  public getWorkingTime(): void {
    this.workingBlockService.getWorkingTime(this.project.id).subscribe((result: { sum: string; }[]) => {
      var sum: number = Number.parseInt(result[0].sum);
      this.totalWorkingTime = this.millisecondsToHoursString(Number.isNaN(sum) === true ? 0 : sum);
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

  public getOpenWorkingBlock() {
    this.workingBlockService.getOpenWorkingBlock(this.project.id).subscribe((openWorkingBlock) => {
      this.isWorking = openWorkingBlock == undefined ? false : true;
    })
  }

  public getWorkingBlocks(): void {
    this.workingBlockService.getWorkingBlocks(this.project.id,  this.startWeek, this.endWeek).subscribe((result: WorkingBlock[]) => {
      var milliseconds: number = 0;
      for(var i = 0; i < result.length; i++) {
        console.log(result[i].workingtime);
        milliseconds += +result[i].workingtime;
      }

      this.totalWorkingTimeOfWeek = this.millisecondsToHoursString(milliseconds);
      this.workingBlocks = result;
    });
  }

  ngOnInit(): void {
    var idOfProject = this.route.snapshot.params['id'];
    this.projectService.getOneById(idOfProject).subscribe((project: Project) => {
      this.project = project;
      this.getWorkingTime();
      this.getWorkingBlocks();
      this.getOpenWorkingBlock();
    });

  }

}
