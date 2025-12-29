'use client'

import { useState } from "react";
import { upsertCategory, deleteCategory } from "@/actions/categories";
import { Check, Edit, FolderPlus, Trash2, X } from "lucide-react";

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
        <button type="submit" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <FolderPlus className="h-5 w-5 mr-1" />Add Category
        </button>
      </form>

      <table className="w-full border-collapse bg-white shadow-sm rounded-lg text-sm">
        <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px] tracking-widest">
          <tr>
            <th className="px-6 py-4 w-16">ID</th>
            <th className="px-6 py-4">Category Name</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((cat) => {
            const isEditing = editingId === cat.id;

            return (<tr key={cat.id} className={`${isEditing ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors`}>
              <td className="p-2 text-gray-500">{cat.id}</td>
              <td className="p-2">
                {editingId === cat.id ? (
                  <form action={async (fd) => { await upsertCategory(fd); setEditingId(null); }} className="flex gap-2">
                    <input type="hidden" name="id" value={cat.id} />
                    <input name="category" defaultValue={cat.category} className="border p-1 rounded w-full" autoFocus />
                    <button type="submit" className="rounded-md p-1 mr-1 text-emerald-600 hover:bg-emerald-50 transition-colors"
                      title="Save Changes"
                    >
                      <Check className="h-5 w-5" /></button>
                    <button type="button" onClick={() => setEditingId(null)} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 transition-colors"
                      title="Cancel"
                    >
                      <X className="h-5 w-5" /></button>
                  </form>
                ) : (
                  <span className="px-6 py-4 text-gray-600">{cat.category}</span>
                )}
              </td>
              <td className="p-2 text-right space-x-3">
                <button onClick={() => setEditingId(cat.id)} className="rounded-md p-1 mr-1 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  title="Edit Category"
                >
                  <Edit className="h-5 w-5" /></button>
                <button onClick={() => setConfirmDeleteId(cat.id)} className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete Category"
                >
                  <Trash2 className="h-5 w-5" /></button>
              </td>
            </tr>

          )})}
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