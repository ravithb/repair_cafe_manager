import prisma from "@/lib/prisma";
import RepairItemsTable from "./RepairItemsTable";
import { getLocations } from "@/actions/locations";

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
  const [repairSessionItems, totalCount, categories, repairers, locations] = await Promise.all([
    prisma.repair_session_items.findMany({
      skip,
      take: itemsPerPage,
      orderBy: { repair_session_id: "desc" },
      include: { repairItem: true, repairSession: { include :{ customer : true }} } // Assuming a relation exists in schema
    }),
    prisma.repair_items.count(),
    prisma.repair_item_categories.findMany({ orderBy: { category: 'asc' } }),
    prisma.repairers.findMany({ orderBy: [{ firstname: 'asc'}, {lastname: 'asc' }] }),
    getLocations()
  ]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <RepairItemsTable repairSessionItems={repairSessionItems} categories={categories} repairers={repairers} locations={locations} pagination={
      {
        totalCount, skip, itemsPerPage, currentPage, totalPages
      }
    } />
  );
}

