import CustomerTable from "@/components/tables/customer-info/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { customers } from "@/assets/dummy/customer";

export default function Home() {
  return (
    <section className="container">
      <Card className="p-0 md:p-4 shadow-none md:shadow-lg md:border md:border-gray-200">
        <CardHeader className="p-0 md:p-4">
          <CardTitle className="lg:text-2xl text-primary">
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:p-4">
          <CustomerTable customers={customers} />
        </CardContent>
      </Card>
    </section>
  );
}
