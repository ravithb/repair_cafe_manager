import prisma from "@/lib/prisma";
import RepairerTable from "./RepairerTable";

export default async function RepairersPage() {
  const repairers = await prisma.repairers.findMany({
    orderBy: { lastname: "asc" },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Repairers</h1>
        <p className="text-gray-500">Manage repairers available for repair sessions.</p>
      </div>
      
      <RepairerTable initialData={repairers} />
    </div>
  );
}