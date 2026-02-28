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
    
  private emailEncode = 'ZnBvcnRlbGFAZ21haWwuY29t';
  private telefoneEncode = 'KDYxKSA5ODE0NS02OTY3';
  

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
  
  get email(): string {
    return atob(this.emailEncode);
  }

  get telefone(): string {
    return atob(this.telefoneEncode);
  }

  onPrint(): void {
    window.print();
  }
}
