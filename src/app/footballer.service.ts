import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Footballer} from './footballer';
import {environment} from '../environments/environment';

@Injectable()
export class FootballerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {

  }
  public getFootballers(): Observable<Footballer[]>{
    return this.http.get<Footballer[]>(`${this.apiServerUrl}/footballer/all`);
  }

  public addFootballer(footballer: Footballer): Observable<Footballer>{
    return this.http.post<Footballer>(`${this.apiServerUrl}/footballer/add`, footballer);
  }

  public updateFootballer(footballer: Footballer): Observable<Footballer>{
    return this.http.put<Footballer>(`${this.apiServerUrl}/footballer/update`, footballer);
  }

  public deleteFootballer(footballerId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/footballer/delete/${footballerId}`);
  }

}
