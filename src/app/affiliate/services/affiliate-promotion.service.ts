import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { Promotion, AffiliatePlatform } from '../models/promotion.model';
import { MercadoLivreAffiliateService } from './mercado-livre-affiliate.service';
import { ShopeeAffiliateService } from './shopee-affiliate.service';
import { AmazonAffiliateService } from './amazon-affiliate.service';
import { AliExpressAffiliateService } from './aliexpress-affiliate.service';
import { PromotionFilter } from '../models/romotion-filter.model';

@Injectable({
  providedIn: 'root'
})
export class AffiliatePromotionService {
  constructor(
    private mercadoLivreService: MercadoLivreAffiliateService,
    private shopeeService: ShopeeAffiliateService,
    private amazonService: AmazonAffiliateService,
    private aliexpressService: AliExpressAffiliateService
  ) {}

  listBestPromotions(filter: PromotionFilter): Observable<Promotion[]> {
    const platforms = filter.platforms || [
      AffiliatePlatform.MERCADO_LIVRE,
      AffiliatePlatform.SHOPEE,
      AffiliatePlatform.AMAZON,
      AffiliatePlatform.ALIEXPRESS,
    ];

    const requests: Observable<Promotion[]>[] = [];

    if (platforms.includes(AffiliatePlatform.MERCADO_LIVRE)) {
      requests.push(this.safeRequest(this.mercadoLivreService.listPromotions(filter)));
    }

    if (platforms.includes(AffiliatePlatform.SHOPEE)) {
      requests.push(this.safeRequest(this.shopeeService.listPromotions(filter)));
    }

    if (platforms.includes(AffiliatePlatform.AMAZON)) {
      requests.push(this.safeRequest(this.amazonService.listPromotions(filter)));
    }

    if (platforms.includes(AffiliatePlatform.ALIEXPRESS)) {
      requests.push(this.safeRequest(this.aliexpressService.listPromotions(filter)));
    }

    return forkJoin(requests).pipe(
      map((responses) => responses.flat()),
      map((promotions) => this.removeDuplicates(promotions)),
      map((promotions) => this.rankPromotions(promotions)),
      map((promotions) => promotions.slice(0, filter.limit || 50))
    );
  }

  searchAll(filter: PromotionFilter): Observable<Promotion[]> {
    return forkJoin([
      this.safeRequest(this.mercadoLivreService.searchProducts(filter)),
      this.safeRequest(this.shopeeService.searchProducts(filter)),
      this.safeRequest(this.amazonService.searchProducts(filter)),
      this.safeRequest(this.aliexpressService.searchProducts(filter))
    ]).pipe(
      map((responses) => responses.flat()),
      map((promotions) => this.removeDuplicates(promotions)),
      map((promotions) => this.rankPromotions(promotions))
    );
  }

  private safeRequest(request: Observable<Promotion[]>): Observable<Promotion[]> {
    return request.pipe(
      catchError((error) => {
        console.error('Erro ao buscar promoções de afiliado:', error);
        return of([]);
      })
    );
  }

  private removeDuplicates(promotions: Promotion[]): Promotion[] {
    const mapByKey = new Map<string, Promotion>();

    for (const promotion of promotions) {
      const key = this.normalizeKey(promotion);

      if (!mapByKey.has(key)) {
        mapByKey.set(key, promotion);
        continue;
      }

      const current = mapByKey.get(key);

      if (current && promotion.price < current.price) {
        mapByKey.set(key, promotion);
      }
    }

    return Array.from(mapByKey.values());
  }

  private normalizeKey(promotion: Promotion): string {
    return promotion.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 80);
  }

  private rankPromotions(promotions: Promotion[]): Promotion[] {
    return promotions.sort((a, b) => {
      const scoreA = this.calculateScore(a);
      const scoreB = this.calculateScore(b);

      return scoreB - scoreA;
    });
  }

  private calculateScore(promotion: Promotion): number {
    let score = 0;

    if (promotion.discountPercent) {
      score += promotion.discountPercent * 3;
    }

    if (promotion.rating) {
      score += promotion.rating * 10;
    }

    if (promotion.salesCount) {
      score += Math.min(promotion.salesCount / 10, 50);
    }

    if (promotion.freeShipping) {
      score += 15;
    }

    if (promotion.primeOrFull) {
      score += 10;
    }

    if (promotion.originalPrice && promotion.price) {
      const discountValue = promotion.originalPrice - promotion.price;
      score += Math.min(discountValue / 10, 50);
    }

    return score;
  }
}