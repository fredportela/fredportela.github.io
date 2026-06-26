import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseAffiliateService } from './base-affiliate.service';

@Injectable({
  providedIn: 'root'
})
export class AliExpressAffiliateService extends BaseAffiliateService {
  protected readonly endpoint = '/api/affiliate/aliexpress';

  constructor(http: HttpClient) {
    super(http);
  }
}