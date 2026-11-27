import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GithubRepo } from '../models/githubrepo.model';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly reposUrl = 'https://api.github.com/users/fredportela/repos';

  constructor(private readonly http: HttpClient) {}

  list(): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(this.reposUrl).pipe(
      map(repos => repos.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)))
    );
  }
}
