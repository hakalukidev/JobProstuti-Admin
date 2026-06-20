// lib/admin-store.ts
import { apiService } from '@/services/api';

export type AdminRole = 'admin' | 'user';

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  exam: string;
  score?: string;
  time: string;
  avatar: string;
  color: 'emerald' | 'violet' | 'blue' | 'amber' | 'cyan';
}

export interface DashboardOverview {
  stats: {
    totalUsers: number;
    totalQuestions: number;
    totalRevenue: string;
    activeSubscriptions: number;
    dailyActive: number;
    totalExams: number;
    totalJobs: number;
    averageScore: string;
  };
  recentActivities: ActivityItem[];
  users: AdminUser[];
}

export interface AdminCredentials {
  email: string;
  password: string;
}

// ✅ আসল API থেকে ডেটা আনুন
export async function getDashboardOverview(): Promise<DashboardOverview> {
  try {
    const response = await apiService.getDashboardOverview();
    if (response?.success && response?.data) {
      return response.data;
    }
    throw new Error('Failed to fetch dashboard data');
  } catch (error) {
    console.error('❌ Dashboard fetch error:', error);
    // Fallback data (শুধু error হলে)
    return {
      stats: {
        totalUsers: 0,
        totalQuestions: 0,
        totalRevenue: '৳০',
        activeSubscriptions: 0,
        dailyActive: 0,
        totalExams: 0,
        totalJobs: 0,
        averageScore: '০%',
      },
      recentActivities: [],
      users: [],
    };
  }
}

export async function getUsers() {
  try {
    const response = await apiService.getUsers();
    if (response?.success && response?.users) {
      return response.users;
    }
    return [];
  } catch (error) {
    console.error('❌ Users fetch error:', error);
    return [];
  }
}

export async function findUserById(userId: string) {
  try {
    const users = await getUsers();
    return users.find((user: AdminUser) => user._id === userId) ?? null;
  } catch (error) {
    console.error('❌ User find error:', error);
    return null;
  }
}

export async function updateUser(userId: string, updates: Partial<Pick<AdminUser, 'name' | 'email' | 'role' | 'isActive'>>) {
  try {
    const response = await apiService.updateUser(userId, updates);
    if (response?.success && response?.user) {
      return response.user;
    }
    return null;
  } catch (error) {
    console.error('❌ User update error:', error);
    return null;
  }
}

export async function deleteUser(userId: string) {
  try {
    const response = await apiService.deleteUser(userId);
    if (response?.success) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ User delete error:', error);
    return false;
  }
}

export async function createUser(data: Pick<AdminUser, 'name' | 'email' | 'role'>) {
  try {
    const response = await apiService.post('/api/admin/users', data);
    if (response?.success && response?.user) {
      return response.user;
    }
    return null;
  } catch (error) {
    console.error('❌ User create error:', error);
    return null;
  }
}

// ✅ ডেমো ক্রেডেনশিয়াল সরান
export function getDemoAdminCredentials(): AdminCredentials | null {
  // ডেমো ক্রেডেনশিয়াল সরিয়ে দেওয়া হয়েছে
  return null;
}

// ✅ সঠিক লগইন ব্যবহার করুন
export async function login(email: string, password: string) {
  try {
    const response = await apiService.login(email, password);
    return response;
  } catch (error) {
    console.error('❌ Login error:', error);
    return { success: false, message: 'লগইন ব্যর্থ হয়েছে' };
  }
}