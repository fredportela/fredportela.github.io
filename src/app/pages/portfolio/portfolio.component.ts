import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  repos: any[] = [];
  loading = true;
  currentYear: number = new Date().getFullYear();
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://api.github.com/users/fredportela/repos')
      .subscribe({
        next: data => {
          this.repos = data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
          this.loading = false;
        },
        error: () => this.loading = false
      });
  }
}
