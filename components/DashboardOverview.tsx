import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function DashboardOverview() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Bienvenido al Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Aquí encontrarás un resumen general de tu sistema.</p>
      </CardContent>
    </Card>
  );
}

export default DashboardOverview;