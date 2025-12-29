'use client'

import { deleteUser, upsertUser } from '@/actions/users';
import { Role, User } from '@/app/types';
import { Trash2, Edit, Check, X, UserPlus, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const ROLES: Role[] = ['ADMIN', 'REPAIRER', 'GUEST'];

export default function UsersTable({ initialData }: { initialData: User[] }) {

  const [users, setUsers] = useState<User[]>(initialData);
  // Editing states
  const [editingId, setEditingId] = useState<number | null>();
  const [editFormData, setEditFormData] = useState<User>({
    email: '',
    roles: []
  });

  useEffect(()=>{
    console.log(initialData);
    setUsers(initialData);
  }, [initialData])

  const [error, setError] = useState<string>("");

  const addNewUser = () => {
    const newUser: User = { email: '', roles: ['GUEST'] };
    setUsers([newUser, ...users]);
    startEdit(newUser);
  };


  // --- Handlers ---
  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditFormData({ ...user });
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFormData({ email: '', roles: [] });
    setError("");
  };

  const toggleRole = (role: Role) => {
    setEditFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const saveEdit = async () => {
    // Validation
    if (!validateEmail(editFormData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (editFormData.roles.length === 0) {
      setError("Please assign at least one role.");
      return;
    }

    // save user
    await upsertUser(editFormData);
    
    setEditingId(null);
    setError("");
  };

  const doDeleteUser = (id: number | undefined) => {
    if(!id){
      return;
    }
    if (window.confirm("Are you sure you want to delete this user?")) {
      // delte user
      deleteUser(id);
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500">Manage system access and roles</p>
        </div>
        <button
          onClick={addNewUser}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4" />
          Add New User
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 animate-in fade-in slide-in-from-top-1" role="alert">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p><span className="font-bold">Invalid Input:</span> {error}</p>
        </div>
      )}
      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-900">Email Address</th>
              <th className="px-6 py-4 font-semibold text-slate-900">Assigned Roles</th>
              <th className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => {
              const isEditing = editingId === user.id;

              return (
                <tr key={user.id} className={`transition-colors ${isEditing ? 'bg-blue-50/30' : 'hover:bg-slate-50/50'}`}>

                  {/* Email Cell */}
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <input
                        type="email"
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={editFormData.email}
                        placeholder="user@example.com"
                        onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                        autoFocus
                      />
                    ) : (
                      <span className="text-slate-700">{user.email || <span className="text-slate-400 italic">No email set</span>}</span>
                    )}
                  </td>

                  {/* Roles Cell */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {isEditing ? (
                        ROLES.map(role => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => toggleRole(role)}
                            className={`rounded-md px-2.5 py-1 text-xs font-bold transition ${editFormData.roles.includes(role)
                              ? 'bg-blue-500 text-white shadow-sm'
                              : 'bg-white text-slate-600 border border-slate-300 hover:border-blue-300'
                              }`}
                          >
                            {role}
                          </button>
                        ))
                      ) : (
                        user.roles.map(role => (
                          <span
                            key={role}
                            className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 ring-1 ring-inset ring-slate-500/10"
                          >
                            {role}
                          </span>
                        ))
                      )}
                      <input type="hidden" name="roles" value={editFormData?.roles?.join(",") || ""} />
                    </div>
                  </td>

                  {/* Actions Cell */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="rounded-md p-1 mr-1 text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Save Changes"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 transition-colors"
                            title="Cancel"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(user)}
                            className="rounded-md p-1 mr-1 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            title="Edit User"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => doDeleteUser(user?.id)}
                            className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
        {users.length == 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <p>No users found in the system.</p>
          </div>
        )}
      </div>
    </>
  )
}