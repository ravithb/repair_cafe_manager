'use client'

import { useSession } from "next-auth/react";

const navItems = [
  { name: 'Home', href: '/', roles: [] },
  { name: 'Repairs', href: '/repairs', roles: ['ADMIN','REPAIRER'] },
  { name: 'Settings', href: '/settings', roles: ['ADMIN'] },
];

export default function Sidebar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-64 bg-gray-800 text-white p-4 flex flex-col space-y-2 h-screen sticky top-0 md:top-16">
      <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Menu</h2>
      {navItems.map((item) => { 
        const setRoles = new Set(session?.user?.roles);
        const setRequiredRoles = new Set(item.roles);
        const showItem = setRequiredRoles.size==0 || setRequiredRoles.intersection(setRoles).size > 0;

        return showItem && (
        <a
          key={item.name}
          href={item.href}
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150"
        >
          <span className="mr-3">📄</span>
          {item.name}
        </a>
      )})}
    </nav>
  );
}