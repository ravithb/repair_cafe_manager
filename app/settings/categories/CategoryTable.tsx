'use client'

import { useState } from "react";
import { upsertCategory, deleteCategory } from "@/actions/categories";

export default function CategoryTable({ initialData }: { initialData: any[] }) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {/* Quick Add Form */}
      <form action={upsertCategory} className="flex gap-2 bg-gray-50 p-4 rounded-lg border">
        <input 
          name="category" 
          placeholder="New category name..." 
          className="flex-1 p-2 border rounded"
          required 
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Quick Add
        </button>
      </form>

      <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border-b w-16">ID</th>
            <th className="p-3 text-left border-b">Category Name</th>
            <th className="p-3 text-right border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((cat) => (
            <tr key={cat.id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-gray-500 font-mono">{cat.id}</td>
              <td className="p-3">
                {editingId === cat.id ? (
                  <form action={async (fd) => { await upsertCategory(fd); setEditingId(null); }} className="flex gap-2">
                    <input type="hidden" name="id" value={cat.id} />
                    <input name="category" defaultValue={cat.category} className="border p-1 rounded w-full" autoFocus />
                    <button type="submit" className="text-green-600 text-sm font-bold">Save</button>
                    <button type="button" onClick={() => setEditingId(null)} className="text-gray-400 text-sm">Cancel</button>
                  </form>
                ) : (
                  <span>{cat.category}</span>
                )}
              </td>
              <td className="p-3 text-right space-x-3">
                <button onClick={() => setEditingId(cat.id)} className="text-blue-600 hover:underline text-sm">Edit</button>
                <button onClick={() => setConfirmDeleteId(cat.id)} className="text-red-600 hover:underline text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold mb-2">Are you sure?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone. This category will be permanently removed.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
              <button 
                onClick={async () => {
                  await deleteCategory(confirmDeleteId);
                  setConfirmDeleteId(null);
                }} 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}