import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package } from 'lucide-react';

export function Inventory() {
  return (
    <div>
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,345</div>
          <p className="text-xs text-muted-foreground">items in stock</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Detailed inventory management content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Inventory;