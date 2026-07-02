import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseAffiliateService } from './base-affiliate.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopeeAffiliateService extends BaseAffiliateService {
  protected readonly endpoint = `${environment.apiUrl}/affiliate/shopee`;

  constructor(http: HttpClient) {
    super(http);
  }
}