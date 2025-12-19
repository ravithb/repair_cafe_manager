import prisma from "@/lib/prisma";
import ItemModal from "./ItemModal";
import Link from "next/link";

export default async function RepairsListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Parse pagination params
  const params = await searchParams;
  const itemsPerPage = 10;
  const currentPage = Number(params.page) || 1;
  const skip = (currentPage - 1) * itemsPerPage;

  // Fetch data and total count in parallel
  const [repairItems, totalCount, categories, repairers] = await Promise.all([
    prisma.repair_items.findMany({
      skip,
      take: itemsPerPage,
      orderBy: { id: "desc" },
      //include: { category: true } // Assuming a relation exists in schema
    }),
    prisma.repair_items.count(),
    prisma.repair_item_categories.findMany({ orderBy: { category: 'asc' } }),
    prisma.repairers.findMany({ orderBy: [{ firstname: 'asc'}, {lastname: 'asc' }] })
  ]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="p-8">      

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold mb-6">Repair Items List</h1>
        <div className="flex-shrink-0">
          <ItemModal categories={categories} repairers={repairers} />
        </div>
      </div>

      <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Fault</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Weight</th>
            </tr>
          </thead>
          <tbody>
            {repairItems.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-mono">{item.id}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">{item.item} {item.make} {item.model}</td>
                <td className="px-6 py-4">{item.fault}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {item.last_repair_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">{item.weight}kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{skip + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(skip + itemsPerPage, totalCount)}
          </span>{" "}
          of <span className="font-medium">{totalCount}</span> results
        </p>

        <nav className="inline-flex -space-x-px rounded-md shadow-sm">
          <Link
            href={`?page=${currentPage - 1}`}
            className={`px-4 py-2 text-sm font-medium border rounded-l-md ${
              currentPage <= 1
                ? "pointer-events-none bg-gray-100 text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </Link>
          
          <div className="px-4 py-2 text-sm font-medium border-t border-b bg-white text-gray-700">
            Page {currentPage} of {totalPages}
          </div>

          <Link
            href={`?page=${currentPage + 1}`}
            className={`px-4 py-2 text-sm font-medium border rounded-r-md ${
              currentPage >= totalPages
                ? "pointer-events-none bg-gray-100 text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </Link>
        </nav>
      </div>
    </div>
  );
}

