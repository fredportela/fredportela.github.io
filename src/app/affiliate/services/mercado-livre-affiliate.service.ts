import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseAffiliateService } from './base-affiliate.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoLivreAffiliateService extends BaseAffiliateService {
  protected readonly endpoint =`${environment.apiUrl}/affiliate/mercado-livre`;

  constructor(http: HttpClient) {
    super(http);
  }
}