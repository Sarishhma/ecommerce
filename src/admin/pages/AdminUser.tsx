import { useState } from 'react';

import type { User } from '../components/users/types/user.types';
import {  UserList } from '../components/users/components/UserList';
import { UserEditForm } from '../components/users/components/UserEditForm';
import { UserAddForm } from '../components/users/components/UserAddForm';

export default function AdminUser() {
  const [, setdeleteUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [addOpen,setAddOpen]=useState(false)

  return (
    <div className="animate-fade-in pb-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-stone font-semibold mb-1">Management</p>
          <h1 className="text-3xl font-display text-charcoal">Staff Users</h1>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="rounded-xl bg-terracotta px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-copper transition-colors shadow-sm"
        >
          Add Staff
        </button>
      </div>
      <UserList onDelete={(user) => setdeleteUser(user)} onEdit={(user) => setEditUser(user)} />
      <UserEditForm user={editUser} onClose={() => setEditUser(null)} />
              <UserAddForm open={addOpen} onClose={() => setAddOpen(false)} /> 
    </div>
  );
}