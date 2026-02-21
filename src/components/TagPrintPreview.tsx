import { Product, TagContent, TagSize, PaperSize, PAPER_SIZES } from '@/types/product';
import ProductTag from './ProductTag';

interface Props {
  products: Product[];
  content: TagContent[];
  tagSize: TagSize;
  paperSize: PaperSize;
}

export default function TagPrintPreview({ products, content, tagSize, paperSize }: Props) {
  const paper = PAPER_SIZES[paperSize];
  const cols = Math.floor(paper.widthMm / tagSize.widthMm);
  const rows = Math.floor(paper.heightMm / tagSize.heightMm);
  const tagsPerPage = cols * rows;

  // Build flat list of all tags
  const allTags = products.flatMap(p =>
    [p].map(product => ({ product, key: product.id }))
  );

  // Split into pages
  const pages: typeof allTags[] = [];
  for (let i = 0; i < allTags.length; i += tagsPerPage) {
    pages.push(allTags.slice(i, i + tagsPerPage));
  }

  const paperWidthPx = paper.widthMm * 3.78;
  const paperHeightPx = paper.heightMm * 3.78;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Tag Preview
          <span className="text-sm font-normal text-muted-foreground ml-2">
            {allTags.length} tag{allTags.length !== 1 ? 's' : ''} · {pages.length} page{pages.length !== 1 ? 's' : ''}
          </span>
        </h2>
      </div>

      <div className="print-area space-y-8">
        {pages.map((pageTags, pageIdx) => (
          <div
            key={pageIdx}
            className="bg-card border border-border mx-auto shadow-sm"
            style={{
              width: `${paperWidthPx}px`,
              height: `${paperHeightPx}px`,
              padding: '8px',
              display: 'flex',
              flexWrap: 'wrap',
              alignContent: 'flex-start',
              gap: '2px',
              pageBreakAfter: 'always',
            }}
          >
            {pageTags.map((tag, i) => (
              <ProductTag
                key={`${tag.key}-${i}`}
                product={tag.product}
                content={content}
                tagSize={tagSize}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
