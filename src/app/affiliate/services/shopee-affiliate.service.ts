import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseAffiliateService } from './base-affiliate.service';

@Injectable({
  providedIn: 'root'
})
export class ShopeeAffiliateService extends BaseAffiliateService {
  protected readonly endpoint = '/api/affiliate/shopee';

  constructor(http: HttpClient) {
    super(http);
  }
}