"use client"

import { useState } from "react";

export default function LocationSelector({ locations }: { locations: {id: number, location: string}[] }) {

  const [selectedLocation, setSelectedLocation] = useState(0);

  return (
    <div>
      <span className="p-2">Location</span>
      <select className="p-2 border rounded" value={selectedLocation}
          onChange={(e) => setSelectedLocation(parseInt(e.target.value))}>
        <option value="">Select a location</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.location}
          </option>
        ))}
      </select>
    </div>
  );
}