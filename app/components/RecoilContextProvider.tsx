"use client";
import { RecoilRoot } from "recoil";

export default function RecoilContextProvider({ children }:any) {
  return <RecoilRoot>{children}</RecoilRoot>;
}