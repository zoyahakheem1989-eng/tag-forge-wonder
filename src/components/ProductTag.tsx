import { Product, TagContent, TagSize } from '@/types/product';
import Barcode from 'react-barcode';
import { QRCodeSVG } from 'qrcode.react';

interface Props {
  product: Product;
  content: TagContent[];
  tagSize: TagSize;
}

export default function ProductTag({ product, content, tagSize }: Props) {
  const widthPx = tagSize.widthMm * 3.78; // mm to px (96dpi)
  const heightPx = tagSize.heightMm * 3.78;
  const isSmall = tagSize.widthMm < 50;
  const barcodeWidth = isSmall ? 1 : 1.3;
  const barcodeHeight = isSmall ? 28 : 40;
  const qrSize = isSmall ? 40 : 60;

  return (
    <div
      className="border border-tag-border bg-tag-bg flex flex-col items-center justify-center overflow-hidden"
      style={{
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        padding: `${isSmall ? 4 : 8}px`,
        fontSize: isSmall ? '8px' : '10px',
        lineHeight: '1.3',
      }}
    >
      {content.includes('brandLogo') && (
        <div
          className="font-bold text-center tracking-wider uppercase text-primary"
          style={{ fontSize: isSmall ? '9px' : '12px', marginBottom: '2px' }}
        >
          BRAND
        </div>
      )}

      {content.includes('productName') && (
        <div
          className="font-semibold text-center text-foreground leading-tight"
          style={{
            fontSize: isSmall ? '8px' : '11px',
            marginBottom: '2px',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.name}
        </div>
      )}

      {content.includes('productCode') && (
        <div className="font-mono text-muted-foreground" style={{ fontSize: isSmall ? '7px' : '9px', marginBottom: '3px' }}>
          {product.code}
        </div>
      )}

      {content.includes('barcode') && (
        <div className="my-1" style={{ transform: isSmall ? 'scale(0.75)' : 'scale(0.85)', transformOrigin: 'center' }}>
          <Barcode
            value={product.code || '000000'}
            width={barcodeWidth}
            height={barcodeHeight}
            displayValue={false}
            margin={0}
          />
        </div>
      )}

      {content.includes('qrCode') && (
        <div className="my-1">
          <QRCodeSVG value={product.code || product.name} size={qrSize} />
        </div>
      )}

      <div className="flex items-center gap-1.5 mt-auto">
        {content.includes('basePrice') && (
          <span
            className={`${content.includes('salePrice') ? 'line-through text-price-strike' : 'font-bold text-foreground'}`}
            style={{ fontSize: isSmall ? '8px' : '10px' }}
          >
            ₹{product.basePrice.toFixed(0)}
          </span>
        )}
        {content.includes('salePrice') && (
          <span className="font-bold text-price-sale" style={{ fontSize: isSmall ? '10px' : '13px' }}>
            ₹{product.salePrice.toFixed(0)}
          </span>
        )}
      </div>
    </div>
  );
}
