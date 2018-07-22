import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs';
import {ContinuationToken, PageDto} from './Payment';
import {catchError, tap} from 'rxjs/internal/operators';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getPayments(pageSize: number, continuationToken: ContinuationToken): Observable<PageDto> {
    const href = 'http://localhost:8080/v1/api/payments';
    const requestUrl = `${href}?pageSize=${pageSize}&continuationToken=${this.toString(continuationToken)}`;
    return this.http.get<PageDto>(requestUrl);
  }

  private toString(continuationToken: ContinuationToken) {
    if (null == continuationToken)
      return null;

    return encodeURIComponent(continuationToken.Id + "_" + continuationToken.Timestamp);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PaymentsService: ${message}`);
  }
}
