import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseAffiliateService } from './base-affiliate.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmazonAffiliateService extends BaseAffiliateService {
  protected readonly endpoint = `${environment.apiUrl}/affiliate/amazon`;

  constructor(http: HttpClient) {
    super(http);
  }
}