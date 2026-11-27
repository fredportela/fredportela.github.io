import { Component, OnInit } from '@angular/core';
import { GithubRepo } from '../../shared/models/githubrepo.model';
import { GithubService } from '../../shared/services/github.services';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  repos: GithubRepo[] = [];
  loading = true;
    
  private emailEncode = 'ZnJlZHBvcnRlbGFAZ21haWwuY29t';
  private telefoneEncode = 'KDYxKSA5ODE0NS02OTY3';
  

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
