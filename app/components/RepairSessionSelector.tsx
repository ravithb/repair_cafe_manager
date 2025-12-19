"use client"

import { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from "@mui/material";

export default function RepairSessionSelector({ locations }: { locations: {id: number, location: string}[] }) {

  const [selectedLocation, setSelectedLocation] = useState(0);

  return (
    <Box className="p-2">
      <DatePicker label="Session Date" className="p-2"
        slotProps={{
          textField: {
            size: 'small', // don't need this anymore so feel free to remove
            sx: {
              '> .MuiOutlinedInput-root': {
                height: 18 // whatever height you want here
              }
            }
          }
        }}/>
      <select className="p-2 border rounded ml-1" value={selectedLocation}
          onChange={(e) => setSelectedLocation(parseInt(e.target.value))}>
        <option value="">Location</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.location}
          </option>
        ))}
      </select>
    </Box>
  );
}