import prisma from "@/lib/prisma";
import UsersTable from './UsersTable';
import { getAllUsers } from "@/actions/users";

// --- Component ---
export default async function UsersPage() {

  const users = await getAllUsers();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="mx-auto max-w-5xl">
        <UsersTable initialData={users}/>
        

        
      </div>
    </div>
  );
};
