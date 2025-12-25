'use client'

import { useState } from "react";
import { upsertRepairer, deleteRepairer } from "@/actions/repairers";

export default function RepairerTable({ initialData }: { initialData: any[] }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const handleEditSave = async (formData: FormData) => {
    await upsertRepairer(formData);
    setEditingId(null); // Close the edit mode on success
  };

  return (
    <div className="space-y-6">
      <form action={upsertRepairer} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="mb-4">
          <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider">Add New Repairer</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          {/* Smaller Title Box (col-span-1) */}
          <div className="md:col-span-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Title</label>
            <select name="title" className="w-full border border-gray-300 p-2 rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Mr</option><option>Mrs</option><option>Ms</option><option>Dr</option><option>Mx</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">First Name</label>
            <input name="firstname" required className="w-full border border-gray-300 p-2 rounded-md text-sm" placeholder="e.g. Alice" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Last Name</label>
            <input name="lastname" required className="w-full border border-gray-300 p-2 rounded-md text-sm" placeholder="e.g. Smith" />
          </div>

          <div className="md:col-span-3">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Email</label>
            <input name="email" type="email" required className="w-full border border-gray-300 p-2 rounded-md text-sm" placeholder="alice@example.com" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Mobile Number</label>
            <input name="phone" type="tel" className="w-full border border-gray-300 p-2 rounded-md text-sm" placeholder="04xxx xxxxxx" />
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md font-bold hover:bg-blue-700 transition-all shadow-sm active:scale-95">
              Save
            </button>
          </div>
        </div>
      </form>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px] tracking-widest">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {initialData.map((r) => {
              const isEditing = editingId === r.id;

              return (
                <tr key={r.id} className={`${isEditing ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors`}>
                  {isEditing ? (
                    /* EDIT MODE ROW */
                    <td colSpan={6} className="p-0">
                      <form action={handleEditSave} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 items-center">
                        <input type="hidden" name="id" value={r.id} />
                        
                        <div className="md:col-span-1">
                          <select name="title" defaultValue={r.title} className="w-full border p-1.5 rounded text-sm bg-white">
                            <option>Mr</option><option>Mrs</option><option>Ms</option><option>Dr</option>
                          </select>
                        </div>
                        
                        <div className="md:col-span-2">
                          <input name="firstname" defaultValue={r.firstname} className="w-full border p-1.5 rounded text-sm" required />
                        </div>
                        
                        <div className="md:col-span-2">
                          <input name="lastname" defaultValue={r.lastname} className="w-full border p-1.5 rounded text-sm" required />
                        </div>
                        
                        <div className="md:col-span-3">
                          <input name="email" type="email" defaultValue={r.email} className="w-full border p-1.5 rounded text-sm" required />
                        </div>
                        
                        <div className="md:col-span-2">
                          <input name="phone" defaultValue={r.phone} className="w-full border p-1.5 rounded text-sm" />
                        </div>
                        
                        <div className="md:col-span-2 flex justify-end gap-2">
                          <button type="submit" className="text-green-600 font-bold text-xs hover:bg-green-100 px-2 py-1 rounded">
                            SAVE
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setEditingId(null)}
                            className="text-gray-500 font-bold text-xs hover:bg-gray-200 px-2 py-1 rounded"
                          >
                            CANCEL
                          </button>
                        </div>
                      </form>
                    </td>
                  ) : (
                    /* VIEW MODE ROW */
                    <>
                      <td className="px-6 py-4 text-gray-400">{r.title}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{r.firstname}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{r.lastname}</td>
                      <td className="px-6 py-4 text-gray-600">{r.email}</td>
                      <td className="px-6 py-4 text-gray-600">{r.phone || '—'}</td>
                      <td className="px-6 py-4 text-right space-x-4">
                        <button 
                          onClick={() => setEditingId(r.id)} 
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={async () => {
                            if(confirm(`Are you sure you want to delete ${r.firstname}?`)) {
                              await deleteRepairer(r.id);
                            }
                          }} 
                          className="text-red-600 hover:underline font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}