import { TagContent, TagSize, PaperSize, TAG_SIZES, PAPER_SIZES, getSuggestedTagSizes } from '@/types/product';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useMemo } from 'react';

const TAG_CONTENT_OPTIONS: { value: TagContent; label: string }[] = [
  { value: 'brandLogo', label: 'Brand Logo' },
  { value: 'qrCode', label: 'QR Code' },
  { value: 'barcode', label: 'Barcode' },
  { value: 'productName', label: 'Product Name' },
  { value: 'productCode', label: 'Product Code' },
  { value: 'basePrice', label: 'Base Price' },
  { value: 'salePrice', label: 'Sale Price' },
];

interface Props {
  selectedContent: TagContent[];
  setSelectedContent: (c: TagContent[]) => void;
  paperSize: PaperSize;
  setPaperSize: (s: PaperSize) => void;
  tagSize: TagSize | null;
  setTagSize: (s: TagSize) => void;
}

export default function TagConfigurator({
  selectedContent, setSelectedContent,
  paperSize, setPaperSize,
  tagSize, setTagSize,
}: Props) {
  const suggestedSizes = useMemo(() => getSuggestedTagSizes(selectedContent), [selectedContent]);

  const toggleContent = (value: TagContent) => {
    const next = selectedContent.includes(value)
      ? selectedContent.filter(c => c !== value)
      : [...selectedContent, value];
    setSelectedContent(next);
  };

  const paper = PAPER_SIZES[paperSize];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Tag Content</h3>
        <div className="grid grid-cols-2 gap-2">
          {TAG_CONTENT_OPTIONS.map(opt => (
            <label
              key={opt.value}
              className="flex items-center gap-2 p-2 rounded-md border bg-card hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <Checkbox
                checked={selectedContent.includes(opt.value)}
                onCheckedChange={() => toggleContent(opt.value)}
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Paper Size</h3>
        <Select value={paperSize} onValueChange={(v) => setPaperSize(v as PaperSize)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
            <SelectItem value="a3">A3 (297 × 420 mm)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
          Tag Size
          {selectedContent.length > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs font-normal">
              {suggestedSizes.length} suggested
            </Badge>
          )}
        </h3>
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          {TAG_SIZES.map(size => {
            const isSuggested = suggestedSizes.some(s => s.id === size.id);
            const isSelected = tagSize?.id === size.id;
            return (
              <button
                key={size.id}
                onClick={() => setTagSize(size)}
                className={`w-full text-left px-3 py-2 rounded-md border text-sm transition-all ${
                  isSelected
                    ? 'border-primary bg-accent ring-1 ring-primary/30'
                    : isSuggested
                    ? 'border-border bg-card hover:bg-muted/50'
                    : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50 opacity-60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{size.widthIn}" × {size.heightIn}"</span>
                  <span className="text-xs text-muted-foreground">
                    {size.widthMm} × {size.heightMm} mm
                  </span>
                </div>
                {isSuggested && !isSelected && (
                  <span className="text-xs text-primary">Recommended</span>
                )}
              </button>
            );
          })}
        </div>
        {tagSize && (
          <p className="text-xs text-muted-foreground mt-2">
            Fits ~{Math.floor(paper.widthMm / tagSize.widthMm) * Math.floor(paper.heightMm / tagSize.heightMm)} tags per {PAPER_SIZES[paperSize].label} sheet
          </p>
        )}
      </div>
    </div>
  );
}
