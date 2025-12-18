const navItems = [
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Analytics', href: '#analytics' },
  { name: 'Projects', href: '#projects' },
  { name: 'Settings', href: '#settings' },
];

export default function Sidebar() {
  return (
    <nav className="w-64 bg-gray-800 text-white p-4 flex flex-col space-y-2 h-screen sticky top-0 md:top-16">
      <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Navigation</h2>
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150"
        >
          {/* Simple placeholder icon */}
          <span className="mr-3">📄</span>
          {item.name}
        </a>
      ))}
    </nav>
  );
}