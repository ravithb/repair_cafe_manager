"use client"

import { useState , useContext} from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { GlobalStateContext } from "./GlobalStateContextProvider";

export default function RepairSessionSelector({ locations }: { locations: {id: number, location: string}[] }) {

  const { selectedDate, setSelectedDate, selectedLocation, setSelectedLocation } = useContext(GlobalStateContext)
  return (
    <Box className="p-2">
      <DatePicker label="Session Date" className="p-2" value={selectedDate} onChange={(newDate) => {
        setSelectedDate(newDate)
      }} 
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
      <select className="p-2 border rounded ml-1" value={selectedLocation?.id}
          onChange={(e) => {
            setSelectedLocation(JSON.parse(e.target.options[e.target.selectedIndex]?.getAttribute('data-obj')+""));
          }}>
        <option value="">Location</option>
        {locations.map((loc) => (
          <option key={loc.id} data-obj={JSON.stringify(loc)} value={loc.id}>
            {loc.location}
          </option>
        ))}
      </select>
    </Box>  
  );
}