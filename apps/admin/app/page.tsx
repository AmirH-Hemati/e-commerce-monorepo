import AppBarChart from "@/features/dashboard/components/AppBarchart";
import { AppPieChart } from "@/features/dashboard/components/AppPieChart";
import CardList from "@/components/CardList";
import AppAreaChart from "@/features/dashboard/components/AppAreaChart";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="latest orders" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Popular Products" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="latest Products" />
      </div>
    </div>
  );
}
