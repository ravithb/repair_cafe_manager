import Link from "next/link";
import { ListTree, Users, ChevronRight, Wrench } from "lucide-react"; // Optional icons

export default async function RepairsListPage() {
  const settingsLinks = [
    {
      title: "Item Categories",
      description: "Manage repair item categories, add new types, or edit existing ones.",
      href: "/settings/categories",
      icon: <ListTree className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Users",
      description: "Manage system users, permissions, and account access levels.",
      href: "/settings/users",
      icon: <Users className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Repairers",
      description: "Manage your technical staff, contact details, and assigned roles.",
      href: "/settings/repairers",
      icon: <Wrench className="w-6 h-6 text-orange-600" />,
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">
          Configure your application preferences and manage data tables.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                {link.icon}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>
            
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                {link.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
