import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-management',
  templateUrl: './time-management.component.html',
  styleUrls: ['./time-management.component.scss']
})
export class TimeManagementComponent implements OnInit {
  private projectId: number = 0;

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    console.log(this.projectId);
  }

}
