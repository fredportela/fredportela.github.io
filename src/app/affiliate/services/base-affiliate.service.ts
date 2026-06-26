import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from '../models/promotion.model';
import { PromotionFilter } from '../models/romotion-filter.model';

export abstract class BaseAffiliateService {
  protected abstract readonly endpoint: string;

  constructor(protected http: HttpClient) {}

  listPromotions(filter: PromotionFilter): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.endpoint}/promotions`, {
      params: this.buildParams(filter)
    });
  }

  searchProducts(filter: PromotionFilter): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.endpoint}/search`, {
      params: this.buildParams(filter)
    });
  }

  generateAffiliateLink(productUrl: string): Observable<string> {
    return this.http.post<string>(`${this.endpoint}/affiliate-link`, {
      productUrl
    });
  }

  protected buildParams(filter: PromotionFilter): HttpParams {
    let params = new HttpParams();

    if (filter.query) {
      params = params.set('query', filter.query);
    }

    if (filter.category) {
      params = params.set('category', filter.category);
    }

    if (filter.minDiscount !== undefined) {
      params = params.set('minDiscount', String(filter.minDiscount));
    }

    if (filter.minPrice !== undefined) {
      params = params.set('minPrice', String(filter.minPrice));
    }

    if (filter.maxPrice !== undefined) {
      params = params.set('maxPrice', String(filter.maxPrice));
    }

    if (filter.limit !== undefined) {
      params = params.set('limit', String(filter.limit));
    }

    return params;
  }
}