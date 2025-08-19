import { Component } from '@angular/core';
import { GithubService } from 'src/app/shared/services/github.services';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent {
  repos: any[] = [];
  loading = true;
  
  constructor(private http: GithubService) {}

  ngOnInit(): void {
    this.loading = true;
    this.http.list().subscribe({
      next: data => {
        this.repos = data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
