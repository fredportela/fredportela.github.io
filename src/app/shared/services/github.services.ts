import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { delay, Observable } from 'rxjs';
import { GithubRepo } from '../models/githubrepo.model';

@Injectable({ providedIn: 'root' })
export class GithubService {
private baseUrl = `${environment.apiUrl}/repos`;
  
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<GithubRepo[]>(this.baseUrl).pipe(delay(1000));
  }

}
