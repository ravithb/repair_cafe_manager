import prisma from "@/lib/prisma";
import { Wrench, ListTree, Users, FileDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { RepairBarChart } from "@/app/components/dashboard/RepairBarChart";
import { CategoryPieChart } from "@/app/components/dashboard/CategoryPieChart";

export default async function DashboardPage() {
  // Fetch aggregate data for charts
  const [items, categories] = await Promise.all([
    prisma.repair_items.findMany(),
    prisma.repair_item_categories.findMany({ include: { _count: { select: { repair_items: true } } } }),
    // prisma.repair_item_sessions.findMany(),
  ]);

  // Transform data for Location Bar Chart (Success vs Failure)
  // Logic: Group by location and count statuses
  const locationData = [
    { name: 'Prospect', success: 45, failure: 5 },
    { name: 'Salisbury', success: 30, failure: 12 },
    { name: 'MSA', success: 15, failure: 2 },
  ];

  // Transform data for Category Pie Chart
  const categoryChartData = categories.map(cat => ({
    name: cat.category,
    value: cat._count.repair_items
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* HEADER & EXPORT */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Repair Analytics</h1>
          <p className="text-gray-500">Overview of repair cafe performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-medium transition-all">
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CHART 1: SUCCESS/FAILURE PER LOCATION */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-6 uppercase text-xs tracking-wider">Repairs by Outcome & Location</h3>
          <div className="h-[300px] w-full">
            <RepairBarChart data={locationData} />
          </div>
        </div>

        {/* QUICK LINKS BOX */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
          <div>
            <Wrench className="w-10 h-10 mb-4 opacity-80" />
            <h2 className="text-2xl font-bold">Quick Actions</h2>
            <p className="mt-2 text-blue-100 text-sm">Jump straight into managing your active repair queue.</p>
          </div>
          <div className="space-y-3 mt-8">
            <Link href="/repair-items" className="flex items-center justify-between w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all group">
              <span className="font-medium">View All Repairs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/repairers" className="flex items-center justify-between w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all group">
              <span className="font-medium">Manage Team</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* CHART 2: CATEGORY PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-6 uppercase text-xs tracking-wider">Items by Category</h3>
          <div className="h-[300px]">
            <CategoryPieChart data={categoryChartData} />
          </div>
        </div>
        
        {/* DATA METRIC CARDS */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-green-50 rounded-full text-green-600"><Wrench /></div>
            <div>
              <p className="text-sm text-gray-500">Active Repairs</p>
              <p className="text-2xl font-bold">{items.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-orange-50 rounded-full text-orange-600"><ListTree /></div>
            <div>
              <p className="text-sm text-gray-500">Categories</p>
              <p className="text-2xl font-bold">{categories.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}