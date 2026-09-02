import { useState } from 'react';

import type { User } from '../components/users/types/user.types';
import {  UserList } from '../components/users/components/UserList';
import { UserEditForm } from '../components/users/components/UserEditForm';
import { UserAddForm } from '../components/users/components/UserAddForm';

export default function AdminUser() {
  const [deleteUser, setdeleteUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [addOpen,setAddOpen]=useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
  <h1 className="text-lg font-medium text-slate-900">Users</h1>
  <button
    onClick={() => setAddOpen(true)}
    className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
  >
    Add user
  </button>
</div>
      <UserList onDelete={(user) => setdeleteUser(user)} onEdit={(user) => setEditUser(user)} />
      <UserEditForm user={editUser} onClose={() => setEditUser(null)} />
              <UserAddForm open={addOpen} onClose={() => setAddOpen(false)} /> 
    </div>
  );
}