import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/service/error.service';
import { CustomError } from '../../../../../shared/types/custom-error.type';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  public errorMessages: CustomError[] = []; 

  constructor(private readonly errorService: ErrorService) { }

  public removeError(error: string) {
    this.errorService.removeError(error);
  }

  ngOnInit(): void {
    this.errorMessages = this.errorService.getErrors();
    this.errorService.subscribeForChanges().subscribe((errors: CustomError[]) => {
      this.errorMessages = errors;
    });
  }

  ngOnDestroy(): void {
    this.errorService.subscribeForChanges().unsubscribe();
  }

}
