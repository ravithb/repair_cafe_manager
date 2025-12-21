"use client"

import Link from "next/link";
import ItemModal from "./ItemModal";
import { useState } from "react";
import { upsertRepairItem, deleteRepairItem } from "@/actions/repairItems";
import { Pagination } from "@/app/types";
import Paginator from "@/app/components/Paginator";


export default function  RepairItemsTable( {repairItems, categories, repairers, pagination} 
    : { repairItems: any[], categories: any[], repairers: any[], 
      pagination : Pagination}){

   const [editingId, setEditingId] = useState<number | null>(null);
     const handleEditSave = async (formData: FormData) => {
       await upsertRepairItem(formData);
       setEditingId(null); // Close the edit mode on success
     };

  return (<div className="p-8">      

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold mb-6">Repair Items List</h1>
        <div className="flex-shrink-0">
          <ItemModal categories={categories} repairers={repairers} />
        </div>
      </div>

      <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Fault</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Weight</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {repairItems.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-mono">{item.id}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">{item.item} {item.make} {item.model}</td>
                <td className="px-6 py-4">{item.fault}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {item.last_repair_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">{item.weight}kg</td>

                <td className="px-6 py-4 text-right space-x-4">

                  <button 
                    onClick={() => setEditingId(item.id)} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={async () => {
                      if(confirm(`Are you sure you want to delete ${item.item}?`)) {
                        await deleteRepairItem(item.id);
                      }
                    }} 
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Paginator pagination={pagination} />
    </div>);
}