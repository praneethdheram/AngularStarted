import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError , tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({


  providedIn : 'root'
})
export class ProductService{

    private productUrl ='api/products/products.json';

    constructor(private http: HttpClient){}
    getProducts(): Observable<IProduct[]>{

        return this.http.get<IProduct[]>(this.productUrl).pipe(

          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    private handleError(err : HttpErrorResponse){

      let errorMessage : string = 'error while retriving data from server';
      return throwError(errorMessage);
    }

}