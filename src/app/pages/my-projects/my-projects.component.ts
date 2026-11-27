import { Component, OnInit } from '@angular/core';
import { GithubRepo } from '../../shared/models/githubrepo.model';
import { GithubService } from '../../shared/services/github.services';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {
  repos: GithubRepo[] = [];
  loading = true;
  
  constructor(private readonly github: GithubService) {}

  ngOnInit(): void {
    this.github.list().subscribe({
      next: data => {
        this.repos = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
