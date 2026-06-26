import { Observable } from 'rxjs';
import { Promotion } from '../models/promotion.model';
import { PromotionFilter } from '../models/romotion-filter.model';


export interface AffiliateProvider {
  platform: string;

  listPromotions(filter: PromotionFilter): Observable<Promotion[]>;

  searchProducts(filter: PromotionFilter): Observable<Promotion[]>;

  generateAffiliateLink(productUrl: string): Observable<string>;
}