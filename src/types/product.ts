export interface Product {
  id: string;
  name: string;
  code: string;
  basePrice: number;
  salePrice: number;
  brandLogo?: string;
}

export interface TagSize {
  id: number;
  label: string;
  widthIn: number;
  heightIn: number;
  widthMm: number;
  heightMm: number;
}

export type TagContent = 'brandLogo' | 'qrCode' | 'barcode' | 'productName' | 'productCode' | 'basePrice' | 'salePrice';

export type PaperSize = 'a4' | 'a3';

export const TAG_SIZES: TagSize[] = [
  { id: 15, label: '1" × 1"', widthIn: 1, heightIn: 1, widthMm: 25.4, heightMm: 25.4 },
  { id: 12, label: '1" × 2"', widthIn: 1, heightIn: 2, widthMm: 25.4, heightMm: 50.8 },
  { id: 16, label: '1.3" × 1.3"', widthIn: 1.3, heightIn: 1.3, widthMm: 33.02, heightMm: 33.02 },
  { id: 17, label: '1.3" × 2"', widthIn: 1.3, heightIn: 2, widthMm: 33.02, heightMm: 50.8 },
  { id: 13, label: '1.375" × 2"', widthIn: 1.375, heightIn: 2, widthMm: 34.93, heightMm: 50.8 },
  { id: 1, label: 'Size 1', widthIn: 1.375, heightIn: 2.75, widthMm: 34.93, heightMm: 69.85 },
  { id: 2, label: 'Size 2', widthIn: 1.625, heightIn: 3.25, widthMm: 41.28, heightMm: 82.55 },
  { id: 3, label: 'Size 3', widthIn: 1.875, heightIn: 3.75, widthMm: 47.63, heightMm: 95.25 },
  { id: 14, label: '2" × 2"', widthIn: 2, heightIn: 2, widthMm: 50.8, heightMm: 50.8 },
  { id: 4, label: 'Size 4', widthIn: 2.125, heightIn: 4.25, widthMm: 53.98, heightMm: 107.95 },
  { id: 5, label: 'Size 5', widthIn: 2.375, heightIn: 4.75, widthMm: 60.33, heightMm: 120.65 },
  { id: 6, label: 'Size 6', widthIn: 2.625, heightIn: 5.25, widthMm: 66.68, heightMm: 133.35 },
  { id: 7, label: 'Size 7', widthIn: 2.875, heightIn: 5.75, widthMm: 73.03, heightMm: 146.05 },
  { id: 8, label: 'Size 8', widthIn: 3.125, heightIn: 6.25, widthMm: 79.38, heightMm: 158.75 },
  { id: 9, label: 'Size 9', widthIn: 3.625, heightIn: 7.25, widthMm: 92.08, heightMm: 184.15 },
  { id: 10, label: 'Size 10', widthIn: 4.125, heightIn: 8.25, widthMm: 104.78, heightMm: 209.55 },
  { id: 11, label: 'Size 11', widthIn: 4.625, heightIn: 9.25, widthMm: 117.48, heightMm: 234.95 },
];

export const PAPER_SIZES = {
  a4: { widthMm: 210, heightMm: 297, label: 'A4' },
  a3: { widthMm: 297, heightMm: 420, label: 'A3' },
};

export function getSuggestedTagSizes(selectedContent: TagContent[]): TagSize[] {
  const count = selectedContent.length;
  // More content = bigger tag needed
  if (count <= 2) return TAG_SIZES.slice(0, 5);
  if (count <= 4) return TAG_SIZES.slice(2, 8);
  return TAG_SIZES.slice(4);
}
