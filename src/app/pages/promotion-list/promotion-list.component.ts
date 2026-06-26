import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Promotion } from 'src/app/affiliate/models/promotion.model';
import { PromotionFilter } from 'src/app/affiliate/models/romotion-filter.model';
import { AffiliatePromotionService } from 'src/app/affiliate/services/affiliate-promotion.service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html'
})
export class PromotionListComponent implements OnInit {
  promotions: Promotion[] = [];
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
          this.promotions = promotions;
        },
        error: (error) => {
          console.error('Erro ao carregar promoções:', error);
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
    window.open(promotion.affiliateUrl, '_blank');
  }
}