import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './component/project/project.component';
import { TimeManagementComponent } from './component/time-management/time-management.component';
import { HttpErrorHandling } from './service/http-error-handling.interceptor';
import { ErrorService } from './service/error.service';
import { ErrorComponent } from './component/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    TimeManagementComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ErrorService, { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandling, multi: true, deps: [ErrorService] } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
