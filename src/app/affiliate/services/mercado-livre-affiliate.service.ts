import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseAffiliateService } from './base-affiliate.service';

@Injectable({
  providedIn: 'root'
})
export class MercadoLivreAffiliateService extends BaseAffiliateService {
  protected readonly endpoint = '/api/affiliate/mercado-livre';

  constructor(http: HttpClient) {
    super(http);
  }
}