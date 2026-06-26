import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseAffiliateService } from './base-affiliate.service';

@Injectable({
  providedIn: 'root'
})
export class AmazonAffiliateService extends BaseAffiliateService {
  protected readonly endpoint = '/api/affiliate/amazon';

  constructor(http: HttpClient) {
    super(http);
  }
}