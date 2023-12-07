import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotFoundError, Observable, catchError, retry, throwError, map, switchMap } from 'rxjs';
import { AppBadInputError } from '../../../common/bad-input';
import { AppNotFoundError } from '../../../common/not-found-error';
import { AppError } from '../../../common/app-error';



export class DataService<T extends any> {
    constructor(private url: string, private http: HttpClient) { }

    getAll(params: HttpParams): Observable<any> {
        return this.http
            .get<T[]>(this.url, { ...params })
            .pipe(
                map((response) => {
                    // console.log('response format is ', response);
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    getById(id: string): Observable<T> {
        return this.http
            .get<T>(this.url + '/' + id)
            .pipe(catchError(this.handleError));
    }

    create(resource: any): Observable<T> {
        return this.http
            .post<T>(this.url, resource)
            .pipe(catchError(this.handleError));
    }

    update(resource: any, id :string): Observable<T> {
        return this.http
            .put<T>(this.url + '/' + id, resource)
            .pipe(catchError(this.handleError));


    }

    delete(id: string): Observable<T> {
        // return throwError(() => { return new AppError() });
        return this.http.delete<T>(this.url + '/' + id)
            .pipe(catchError(this.handleError));

    }

    private handleError(error: HttpErrorResponse) {
        console.log('error.error is ', error.message);

        return throwError(() => {
            if (error.status == 400) {
                return new AppBadInputError();
            }
            if (error.status == 404) {
                return new AppNotFoundError();
            }
            else {
                return new AppError(error);
            }
        });
    }

}
