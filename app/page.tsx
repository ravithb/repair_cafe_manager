import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

// This is the main page component which serves as the layout wrapper.
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header (fixed at the top) */}
      <Header />

      {/* Main Content Layout: Sidebar + Main Area */}
      <div className="flex flex-1 pt-16"> {/* pt-16 pushes content down below the fixed header */}
        
        {/* Sidebar (Left Menubar) */}
        <Sidebar />

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Dashboard</h1>
          <p className="text-gray-600">
            This is where your main application content will be rendered.
          </p>
          {/* Your specific page content goes here */}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}