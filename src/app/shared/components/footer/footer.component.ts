import { Component } from '@angular/core';
import { AppVersionService } from '../../services/app-version.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly buildInfo$ = this.appVersionService.buildInfo$;

  constructor(private readonly appVersionService: AppVersionService) {}
}
