export enum AffiliatePlatform {
  MERCADO_LIVRE = 'MERCADO_LIVRE',
  SHOPEE = 'SHOPEE',
  AMAZON = 'AMAZON',
  ALIEXPRESS = 'ALIEXPRESS',
}

export interface Promotion {
  id: string;
  platform: AffiliatePlatform;

  title: string;
  description?: string;

  imageUrl?: string;
  productUrl: string;
  affiliateUrl: string;

  price: number;
  originalPrice?: number;
  discountPercent?: number;

  currency: string;

  rating?: number;
  salesCount?: number;

  category?: string;
  storeName?: string;

  freeShipping?: boolean;
  primeOrFull?: boolean;

  createdAt?: string;
}