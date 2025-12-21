"use client";
import dayjs from "dayjs";
import { createContext, useState } from "react";

export const GlobalStateContext = createContext<any>(null);

export default function GlobalStateContextProvider({ children }:any) {

  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [selectedLocation, setSelectedLocation] = useState(null);

  return <GlobalStateContext.Provider value={
    {selectedDate, setSelectedDate, selectedLocation, setSelectedLocation}}>{children}</GlobalStateContext.Provider>;
}