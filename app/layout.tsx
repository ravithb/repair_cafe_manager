import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import App from "./components/App";
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Repair Cafe :: MSA",
  description: "By Ravith Botejue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="fonts.googleapis.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <App>
        <div className="flex flex-col min-h-screen bg-gray-50">
              {/* Header (fixed at the top) */}
              <Header />
        
              {/* Main Content Layout: Sidebar + Main Area */}
              <div className="flex flex-1 pt-16"> {/* pt-16 pushes content down below the fixed header */}
                
                {/* Sidebar (Left Menubar) */}
                <Sidebar />
        
                {/* Content Area */}
                <main className="flex-1 p-6 lg:p-10">
                  {children}
                </main>
              </div>
        
              {/* Footer */}
              <Footer />
            </div>
        
        </App>
      </body>
    </html>
  );
}
