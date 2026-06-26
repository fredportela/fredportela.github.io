import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { finalize } from 'rxjs';

import { Promotion } from '../../affiliate/models/promotion.model';
import { PromotionFilter } from '../../affiliate/models/romotion-filter.model';
import { AffiliatePromotionService } from '../../affiliate/services/affiliate-promotion.service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {
  promotions: WritableSignal<Promotion[]> = signal<Promotion[]>([]);
  loading = false;

  filter: PromotionFilter = {
    query: 'ofertas',
    minDiscount: 10,
    limit: 40,
    platforms: [
      'MERCADO_LIVRE',
      'SHOPEE',
      'AMAZON',
      'ALIEXPRESS'
    ]
  };

  constructor(
    private affiliatePromotionService: AffiliatePromotionService
  ) {}

  ngOnInit(): void {
    this.loadPromotions();
  }

  loadPromotions(): void {
    this.loading = true;

    this.affiliatePromotionService
      .listBestPromotions(this.filter)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (promotions) => {
          const lista = this.normalizarPromocoes(promotions);

          this.promotions.set(lista);

          console.log('Total de promoções:', lista.length);
          console.log('Promoções:', lista);
        },
        error: (error) => {
          console.error('Erro ao carregar promoções:', error);
          this.promotions.set([]);
        }
      });
  }

  search(query: string): void {
    this.filter = {
      ...this.filter,
      query
    };

    this.loadPromotions();
  }

  openPromotion(promotion: Promotion): void {
    window.open(promotion.affiliateUrl || promotion.productUrl, '_blank');
  }

  trackByPromotion(index: number, promotion: Promotion): string {
    return promotion?.id || String(index);
  }

  private normalizarPromocoes(promotions: unknown): Promotion[] {
    if (!Array.isArray(promotions)) {
      return [];
    }

    return promotions
      .flat()
      .filter((item): item is Promotion => {
        return !!item
          && typeof item === 'object'
          && !!(item as Promotion).id
          && !!(item as Promotion).title;
      });
  }
}