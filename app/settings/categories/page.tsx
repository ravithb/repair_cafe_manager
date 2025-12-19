import prisma from "@/lib/prisma";
import CategoryTable from "./CategoryTable";

export default async function CategoriesPage() {
  const categories = await prisma.repair_item_categories.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Repair Categories</h1>
      </div>
      <CategoryTable initialData={categories} />
    </div>
  );
}