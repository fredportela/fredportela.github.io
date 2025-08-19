import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/shared/services/github.services';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  repos: any[] = [];
  loading = true;
  currentYear: number = new Date().getFullYear();
  
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

  onPrint(): void {
    window.print();
  }
}
