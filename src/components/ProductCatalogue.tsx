import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

interface Props {
  products: Product[];
  setProducts: (p: Product[]) => void;
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
}

const emptyProduct = (): Product => ({
  id: crypto.randomUUID(),
  name: '',
  code: '',
  basePrice: 0,
  salePrice: 0,
});

export default function ProductCatalogue({ products, setProducts, selectedIds, setSelectedIds }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Product>(emptyProduct());
  const [adding, setAdding] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedIds(
      selectedIds.includes(id) ? selectedIds.filter(i => i !== id) : [...selectedIds, id]
    );
  };

  const toggleAll = () => {
    setSelectedIds(selectedIds.length === products.length ? [] : products.map(p => p.id));
  };

  const addProduct = () => {
    setAdding(true);
    setDraft(emptyProduct());
  };

  const saveNew = () => {
    if (!draft.name || !draft.code) return;
    setProducts([...products, draft]);
    setAdding(false);
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setDraft({ ...p });
  };

  const saveEdit = () => {
    setProducts(products.map(p => p.id === draft.id ? draft : p));
    setEditingId(null);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  const renderEditRow = (onSave: () => void, onCancel: () => void) => (
    <>
      <TableCell className="w-10" />
      <TableCell>
        <Input
          value={draft.name}
          onChange={e => setDraft({ ...draft, name: e.target.value })}
          placeholder="Product name"
          className="h-8 text-sm"
        />
      </TableCell>
      <TableCell>
        <Input
          value={draft.code}
          onChange={e => setDraft({ ...draft, code: e.target.value })}
          placeholder="SKU-001"
          className="h-8 text-sm font-mono"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={draft.basePrice || ''}
          onChange={e => setDraft({ ...draft, basePrice: Number(e.target.value) })}
          placeholder="0.00"
          className="h-8 text-sm w-24"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={draft.salePrice || ''}
          onChange={e => setDraft({ ...draft, salePrice: Number(e.target.value) })}
          placeholder="0.00"
          className="h-8 text-sm w-24"
        />
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onSave}>
            <Check className="h-4 w-4 text-price-sale" />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onCancel}>
            <X className="h-4 w-4 text-price-strike" />
          </Button>
        </div>
      </TableCell>
    </>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Product Catalogue</h2>
        <Button size="sm" onClick={addProduct} disabled={adding}>
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10">
                <Checkbox
                  checked={products.length > 0 && selectedIds.length === products.length}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Sale Price</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(p =>
              editingId === p.id ? (
                <TableRow key={p.id}>
                  {renderEditRow(saveEdit, () => setEditingId(null))}
                </TableRow>
              ) : (
                <TableRow key={p.id} className="group">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(p.id)}
                      onCheckedChange={() => toggleSelect(p.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{p.code}</TableCell>
                  <TableCell>₹{p.basePrice.toFixed(2)}</TableCell>
                  <TableCell className="text-price-sale font-semibold">₹{p.salePrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => startEdit(p)}>
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => deleteProduct(p.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
            {adding && (
              <TableRow>
                {renderEditRow(saveNew, () => setAdding(false))}
              </TableRow>
            )}
            {products.length === 0 && !adding && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No products yet. Click "Add Product" to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedIds.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {selectedIds.length} product{selectedIds.length > 1 ? 's' : ''} selected for tag generation
        </p>
      )}
    </div>
  );
}
