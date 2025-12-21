import prisma from "@/lib/prisma";
import RepairItemsTable from "./RepairItemsTable";

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
    <RepairItemsTable repairItems={repairItems} categories={categories} repairers={repairers} pagination={
      {
        totalCount, skip, itemsPerPage, currentPage, totalPages
      }
    } />
  );
}

