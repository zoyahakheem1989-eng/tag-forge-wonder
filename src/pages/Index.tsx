import { useState } from 'react';
import { Product, TagContent, TagSize, PaperSize, TAG_SIZES } from '@/types/product';
import ProductCatalogue from '@/components/ProductCatalogue';
import TagConfigurator from '@/components/TagConfigurator';
import TagPrintPreview from '@/components/TagPrintPreview';
import { Button } from '@/components/ui/button';
import { Printer, Tags, RotateCcw } from 'lucide-react';

const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Classic White T-Shirt', code: 'TSH-001', basePrice: 599, salePrice: 449 },
  { id: '2', name: 'Denim Slim Fit Jeans', code: 'JNS-042', basePrice: 1999, salePrice: 1499 },
  { id: '3', name: 'Cotton Polo Shirt', code: 'POL-018', basePrice: 899, salePrice: 699 },
  { id: '4', name: 'Leather Belt Premium', code: 'BLT-007', basePrice: 1299, salePrice: 999 },
  { id: '5', name: 'Running Sneakers Pro', code: 'SNK-055', basePrice: 3499, salePrice: 2799 },
];

export default function Index() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedContent, setSelectedContent] = useState<TagContent[]>(['productName', 'productCode', 'barcode', 'salePrice']);
  const [paperSize, setPaperSize] = useState<PaperSize>('a4');
  const [tagSize, setTagSize] = useState<TagSize>(TAG_SIZES[3]);
  const [showPreview, setShowPreview] = useState(false);

  const canGenerate = selectedIds.length > 0 && selectedContent.length > 0 && tagSize;

  const handleGenerate = () => {
    setShowPreview(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedProducts = products.filter(p => selectedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tags className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">TagPrint</h1>
            <span className="text-xs text-muted-foreground ml-1">Product Tag Generator</span>
          </div>
          {showPreview && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>
                <RotateCcw className="h-4 w-4 mr-1" /> Back
              </Button>
              <Button size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" /> Print
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {!showPreview ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Product List */}
            <div className="lg:col-span-2">
              <ProductCatalogue
                products={products}
                setProducts={setProducts}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
            </div>

            {/* Configuration Sidebar */}
            <div className="space-y-5">
              <div className="border rounded-lg p-4 bg-card">
                <h2 className="text-lg font-semibold mb-4">Tag Settings</h2>
                <TagConfigurator
                  selectedContent={selectedContent}
                  setSelectedContent={setSelectedContent}
                  paperSize={paperSize}
                  setPaperSize={setPaperSize}
                  tagSize={tagSize}
                  setTagSize={setTagSize}
                />
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!canGenerate}
                onClick={handleGenerate}
              >
                <Tags className="h-4 w-4 mr-2" />
                Generate Tags ({selectedIds.length} product{selectedIds.length !== 1 ? 's' : ''})
              </Button>

              {!canGenerate && (
                <p className="text-xs text-muted-foreground text-center">
                  Select products and tag content to generate
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <TagPrintPreview
              products={selectedProducts}
              content={selectedContent}
              tagSize={tagSize}
              paperSize={paperSize}
            />
          </div>
        )}
      </main>
    </div>
  );
}
