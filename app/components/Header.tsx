'use client'; 

import { useEffect, useState } from 'react';
import { getLocations } from "@/actions/locations";
import RepairSessionSelector from './RepairSessionSelector';
import { useSession, signIn, signOut } from 'next-auth/react';

//const locations = ['New York', 'London', 'Tokyo', 'Sydney'];

export default function Header() {
  //const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [locations, setLocations] = useState<{id: number, location: string}[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Calling the Server Action from the client
    getLocations().then(setLocations);
  }, []);

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-md fixed w-full top-0 z-20 h-16">
      {/* Left side: Logo/Title */}
      <div className="text-xl font-semibold text-indigo-600">
        Fixlog :: Repair cafe manager
      </div>
      {session ? (<>
      {/* Right side: Controls (Location, User Icon, Logout) */}
      <div className="flex items-center space-x-4">
        {/* Pass the server-fetched data to the client component */}
        <RepairSessionSelector locations={locations} />

        {/* User Icon/Avatar */}
        <div 
          title={(session?.user?.name + " : " + session?.user?.roles?.join(","))}
          className="p-2 bg-indigo-100 text-blue-600 rounded-full cursor-pointer hover:bg-blue-200 transition duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-150"
        >
          Logout
        </button>        
      </div>
      </>) : (
        <button
          onClick={()=> { signIn("google", { "callbackUrl": "/"}) }}
          className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-150"
        >
          Login
        </button>   
      )}
    </header>
  );
}