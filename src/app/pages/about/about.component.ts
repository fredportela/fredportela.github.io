import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [RouterLink, MatDividerModule, MatIconModule],
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  private emailEncode = 'ZnJlZHBvcnRlbGFAZ21haWwuY29t';
  private telefoneEncode = 'KDYxKSA5ODE0NS02OTY3';
  
  get email(): string {
    return atob(this.emailEncode);
  }

  get telefone(): string {
    return atob(this.telefoneEncode);
  }
}
