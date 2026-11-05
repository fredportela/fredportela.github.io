import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  private emailEncode = 'ZnBvcnRlbGFAZ21haWwuY29t';
  private telefoneEncode = 'KDYxKSA5ODE0NS02OTY3';
  
  get email(): string {
    return atob(this.emailEncode);
  }

  get telefone(): string {
    return atob(this.telefoneEncode);
  }
}
