import { Component } from '@angular/core';
import packageJson from '../../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  appVersion: string = packageJson.version;
  buildDate: Date = new Date();
}
