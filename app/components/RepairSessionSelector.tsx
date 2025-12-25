"use client"

import { useState , useContext, useEffect} from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { GlobalStateContext } from "./GlobalStateContextProvider";

export default function RepairSessionSelector({ locations }: { locations: {id: number, location: string}[] }) {

  const { selectedDate, setSelectedDate, selectedLocation, setSelectedLocation } = useContext(GlobalStateContext)
  const LOCATION_KEY = "rcm.last.location";
  const SESSION_DATE_KEY = "rcm.last.session.date";

  useEffect(()=>{
    if((selectedLocation == "" || selectedLocation == null) && locations && locations.length > 0 ){
      let lastLocation:any = localStorage.getItem(LOCATION_KEY);
      if(lastLocation){
        lastLocation = JSON.parse(lastLocation);
      }
      if(lastLocation && lastLocation.id > 0){
        setSelectedLocation(lastLocation);
      }else{
        setSelectedLocation(locations[0]);
      }
    }
  }, [locations]);

  useEffect(()=>{
    const lastSessionDate = localStorage.getItem(SESSION_DATE_KEY);
    if(lastSessionDate != null){
      setSelectedDate(dayjs(lastSessionDate));
    }
  },[])

  return (
    <Box className="p-2">
      <span key={"session-select-title"}>Current session : </span>
      <DatePicker className="p-2" value={selectedDate} onChange={(newDate) => {
        localStorage.setItem(SESSION_DATE_KEY, newDate?.format("YYYY-MM-DD")+"");
        setSelectedDate(newDate)
      }} 
        slotProps={{
          textField: {
            hiddenLabel: true,
            size: 'small', // don't need this anymore so feel free to remove
            sx: {
              width: '150px;',
              fontSize: '9px',
              '> .MuiOutlinedInput-root': {
                height: 18 // whatever height you want here
              },
              '& .MuiPickersSectionList-root': {
                padding: '6px 0px',
                fontSize: '12px'
              },
              '& .MuiPickersInputBase-root ' : {
                border: '1px solid #666666'
              }
            }
          }
        }}/>
      <strong> @ </strong>
      <select className="p-2 border rounded ml-1 h-8 text-xs" value={selectedLocation?.id}
          onChange={(e) => {
            let locationStr = e.target.options[e.target.selectedIndex]?.getAttribute('data-obj')+"";
            setSelectedLocation(JSON.parse(locationStr));
            localStorage.setItem(LOCATION_KEY, locationStr);
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