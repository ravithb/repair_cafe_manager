'use client'

import { useState, useRef, useContext, useEffect } from "react";
import { createRepairItem } from "@/actions/repairItems";
import CustomerSearchTypeahead from "./CustomerSearchTypeahead";
import { GlobalStateContext } from "@/app/components/GlobalStateContextProvider";
import { TextField } from "@mui/material";


export default function ItemModal({ categories, repairers }: { categories: any[], repairers: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomerExpanded, setIsCustomerExpanded] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<any>();

  const { selectedDate, setSelectedDate, selectedLocation, setSelectedLocation } = useContext(GlobalStateContext)

  useEffect(()=>{
    console.log('use effect', selectedLocation)
  }, [selectedLocation])

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await createRepairItem(formData);
    setIsOpen(false);
    formRef.current?.reset();
  };

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      + Add New Item
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 w-500">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Log New Repair Item</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-8 custom-scrollbar">
          <form action={handleSubmit} ref={formRef} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Item Name</label>
                <input name="item" required className="w-full border p-2 rounded" placeholder="e.g. Blender" />
              </div>
              <div className="md:col-span-2">
                   <TextField label="Fault Description" name="fault" multiline rows={3} fullWidth required />
              </div>
              <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select name="categoryId" className="w-full border p-2 rounded">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.category}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                  <input name="weight" type="number" step="0.01" className="w-full border p-2 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Make</label>
                  <input name="make" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Phillips" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Model</label>
                  <input name="model" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. HR3041/00" />
                </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="font-bold text-sm text-gray-700 uppercase tracking-wide">Customer Details</span>
              <span className="w-100"><CustomerSearchTypeahead onSelect={setSelectedCustomer} label="" placeholder="Search Customer"></CustomerSearchTypeahead>    </span>
              <button 
                type="button"
                onClick={() => setIsCustomerExpanded(!isCustomerExpanded)}
                className="px-4 py-2 bg-gray-200"
              >
                <span className="text-gray-500">{isCustomerExpanded ? '−' : '+'}</span>
              </button>
              </div>
              
              {isCustomerExpanded && (
                <div className="p-4 grid grid-cols-3 gap-3 bg-white border-t">
                  <input type="hidden" name="customerId" value={selectedCustomer?.id} />
                  <div className="col-span-1">
                    <label className="block text-xs font-semibold mb-1">Title</label>
                    <select name="customerTitle" className="w-full border p-2 rounded text-sm" value={selectedCustomer?.title}>
                      <option>Mr</option><option>Mrs</option><option>Ms</option><option>Dr</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">First Name</label>
                    <input name="customerFirstName" className="w-full border p-2 rounded text-sm" placeholder="John" value={selectedCustomer?.firstname} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Last Name</label>
                    <input name="customerLastName" className="w-full border p-2 rounded text-sm" placeholder="Doe" value={selectedCustomer?.lastname} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Mobile</label>
                    <input name="customerPhone" type="phone" className="w-full border p-2 rounded text-sm" placeholder="04xxxxxxxx" value={selectedCustomer?.phone} /> 
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold mb-1">Email</label>
                    <input name="customerEmail" type="email" className="w-full border p-2 rounded text-sm" placeholder="john@example.com" value={selectedCustomer?.email}/>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Repair Attempt</h3>
              <div className="flex gap-4 text-xs text-gray-500 pb-2 border-b border-blue-100">
                <p><strong>Date:</strong> {selectedDate?.format('DD/MM/YYYY')}</p>
                <p><strong>Location:</strong> {selectedLocation?.location}</p>
                <input type="hidden" name="location" value={selectedLocation} />
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Repair Status</label>
                  <select name="status" className="w-full border p-2 rounded bg-white text-sm">
                    <option>Pending</option>
                    <option>Fixed</option>
                    <option>Cannot Be Repaired</option>
                    <option>Waiting for Parts</option>
                    <option>Deffered To Another Session</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Notes</label>
                  <textarea name="notes" className="w-full border p-2 rounded bg-white text-sm" rows={2} placeholder="Repair notes..."></textarea>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Repairer</label>
                <select name="primaryRepairerId" className="w-full border p-2 rounded-md bg-white text-sm">
                  <option value="">None (Optional)</option>
                  {repairers.map(u => <option key={u.id} value={u.id}>{u.firstname} {u.lastname}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Secondary Repairer</label>
                <select name="secondaryRepairerId" className="w-full border p-2 rounded-md bg-white text-sm">
                  <option value="">None (Optional)</option>
                  {repairers.map(u => <option key={u.id} value={u.id}>{u.firstname} {u.lastname}</option>)}
                </select>
              </div>
            </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-600">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Add More Items...
              </button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}