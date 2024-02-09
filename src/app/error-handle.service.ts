import { ErrorHandler, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService implements ErrorHandler {

  constructor() {
  }
  handleError(error: any): void {


    if (error && error.error && error.error.includes('Validation failed')) {
      const validationErrors1 = error.error.split('Validation failed:')[1].trim();
      const validationErrors2 = error.error.split('Validation failed:')[1].trim();
      const fieldErrorMessage1 = validationErrors1.match(/-- Name: (.*) Severity:/);
      const fieldErrorMessage2 = validationErrors2.match(/-- Age: (.*) Severity:/);
      if (fieldErrorMessage1 && fieldErrorMessage1.length > 1) {
        console.error(`Name Validation Error:`, fieldErrorMessage1[1].trim());
      } else {
        console.error(`Name Validation Error not found.`);
      }
      if (fieldErrorMessage2 && fieldErrorMessage2.length > 1) {
        console.error(`Age Validation Error:`, fieldErrorMessage2[1].trim());
      } else {
        console.error(`Age Validation Error not found.`);
      }
    };
  }
}



