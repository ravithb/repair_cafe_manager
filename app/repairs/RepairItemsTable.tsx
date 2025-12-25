"use client"

import Link from "next/link";
import ItemModal from "./ItemModal";
import { useRef, useState } from "react";
import { upsertRepairItem, deleteRepairItem } from "@/actions/repairItems";
import { Pagination } from "@/app/types";
import Paginator from "@/app/components/Paginator";


export default function  RepairItemsTable( {repairSessionItems, categories, repairers,locations, pagination} 
    : { repairSessionItems: any[], categories: any[], repairers: any[], locations: any[],
      pagination : Pagination}){

  const [itemModalState, setItemModalState] = useState("CLOSED");
  const [editingId, setEditingId] = useState<number | null>(null);
     const handleEditSave = async (formData: FormData) => {
       await upsertRepairItem(formData);
       setEditingId(null); // Close the edit mode on success
     };

  const itemModal:any = useRef(null);

  function openAddItem(){
    setItemModalState("ADDNEW");
    itemModal.current.open(null);
  }

  function openEditItem(item:any){
    setEditingId(item.id);
    setItemModalState("EDIT");
    itemModal.current.open(item);
  }

  return (<div className="p-8">      

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold mb-6">Repair Items List</h1>
        <div className="flex-shrink-0">
          <button
            onClick={() => openAddItem()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add New Item
          </button>
          <ItemModal categories={categories} repairers={repairers} locations={locations} ref={itemModal}/>
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
            {repairSessionItems.map((rsItem) => (
              <tr key={rsItem.repair_session_id+":"+rsItem.repair_item_id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-mono">{rsItem?.repair_item?.id}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">{rsItem?.repair_item?.item} {rsItem?.repair_item?.make} {rsItem?.repair_item?.model}</td>
                <td className="px-6 py-4">{rsItem?.repair_item?.fault}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {rsItem?.repair_item?.last_repair_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">{rsItem?.repair_item?.weight}kg</td>

                <td className="px-6 py-4 text-right space-x-4">

                  <button 
                    onClick={() => {
                      openEditItem(rsItem);
                    } }
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={async () => {
                      if(confirm(`Are you sure you want to delete line - ${rsItem?.repair_item?.item}?`)) {
                        await deleteRepairItem(rsItem?.repair_item?.id);
                      }
                    }} 
                    className="text-red-600 hover:underline font-medium"
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