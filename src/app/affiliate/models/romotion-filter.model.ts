import { AffiliatePlatform } from './promotion.model';

export interface PromotionFilter {
  query?: string;
  category?: string;
  minDiscount?: number;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  platforms?: AffiliatePlatform[];
}