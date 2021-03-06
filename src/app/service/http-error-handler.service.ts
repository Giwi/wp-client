/*
 *  Copyright 2021  SenX S.A.S.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {ToastrService} from 'ngx-toastr';
import {NGXLogger} from 'ngx-logger';


/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError = <T> (operation?: string, anies?: any, silently?: boolean) => (error: HttpErrorResponse) => Observable<T>;

// noinspection UnterminatedStatementJS
/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {

  constructor(private logger: NGXLogger, private toastrService: ToastrService) {
  }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') =>
    <T>(operation = 'operation', result = {} as T, silently = false) => this.handleError(serviceName, operation, result, silently);

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   *
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @param silently - with or without alert
   */
  // tslint:disable-next-line:typedef
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T, silently = false) {
    return (error: HttpErrorResponse): Observable<T> => {
      const errMessage = (!!error.error && !!error.error.message) ? error.error.message : error.status ? error.statusText : 'Server error';
      if (!silently) {
        this.logger.error(error);
        this.logger.error(`${operation} failed: ${error.statusText}`);
        this.logger.error(errMessage);
        throw errMessage;
      } /* else {
      } */
      return of(result);
    };
  }
}
