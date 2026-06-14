'use client';

import { apiService } from '@/services/api';

type UserItem = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

type UsersListProps = {
  users: UserItem[];
  onRefresh: () => Promise<void>;
};

export default function UsersList({ users, onRefresh }: UsersListProps) {
  const handleRoleChange = async (userId: string, role: string) => {
    await apiService.updateUser(userId, { role });
    await onRefresh();
  };

  const handleStatusToggle = async (userId: string, isActive: boolean) => {
    await apiService.updateUser(userId, { isActive: !isActive });
    await onRefresh();
  };

  const handleDelete = async (userId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');

    if (!confirmed) {
      return;
    }

    await apiService.deleteUser(userId);
    await onRefresh();
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Users</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">ব্যবহারকারী ব্যবস্থাপনা</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.18em] text-slate-400">
              <th className="pb-3 font-black">Name</th>
              <th className="pb-3 font-black">Email</th>
              <th className="pb-3 font-black">Role</th>
              <th className="pb-3 font-black">Status</th>
              <th className="pb-3 font-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-slate-100">
                <td className="py-4 font-semibold text-slate-900">{user.name}</td>
                <td className="py-4 text-slate-600">{user.email}</td>
                <td className="py-4">
                  <select
                    value={user.role}
                    onChange={(event) => handleRoleChange(user._id, event.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-4">
                  <button
                    type="button"
                    onClick={() => handleStatusToggle(user._id, user.isActive)}
                    className={`rounded-full px-3 py-1 text-xs font-black ${user.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="py-4">
                  <button type="button" onClick={() => handleDelete(user._id)} className="text-sm font-semibold text-rose-600 hover:text-rose-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
