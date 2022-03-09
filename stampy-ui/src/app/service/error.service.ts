import { Injectable } from "@angular/core";
import { Observable, Observer, Subject, Subscription } from "rxjs";
import { CustomError } from "../../../../shared/types/custom-error.type"

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    private errorMessages: CustomError[] = [];
    private subject: Subject<CustomError[]> = new Subject();

    public subscribeForChanges(): Subject<CustomError[]> {
        return this.subject;
    }

    public addError(error: string) {
        var found = false;
        for(let i = 0; i < this.errorMessages.length; i++) {
            if(this.errorMessages[i].message == error) {
                this.errorMessages[i].quantity++;
                found = true;
            }
        }

        if(!found) {
            this.errorMessages.push({ message: error, quantity: 1 });
        }

        this.subject.next(this.errorMessages);
    }

    public removeError(error: string) {
       for(let i = 0; i < this.errorMessages.length; i++) {
           if(this.errorMessages[i].message == error) {
               this.errorMessages.splice(i, 1);
           }
       }
    }

    public getErrors(): CustomError[] {
        return this.errorMessages;
    }
}