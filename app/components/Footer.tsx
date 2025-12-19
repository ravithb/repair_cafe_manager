export default function Footer() {
  return (
    <footer className="w-full p-4 text-center text-xs text-gray-500 border-t border-gray-200 bg-white">
      © {new Date().getFullYear()} Makerspace Adelaide. All rights reserved.
    </footer>
  );
}