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

const now = new Date().toISOString();

const demoAdminCredentials: AdminCredentials = {
  email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL ?? 'admin@jobprostuti.com',
  password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD ?? 'admin123',
};

let users: AdminUser[] = [
  { _id: 'u-1001', name: 'Rakib Hasan', email: 'rakib@example.com', role: 'user', isActive: true, createdAt: now },
  { _id: 'u-1002', name: 'Sumaiya Akter', email: 'sumaiya@example.com', role: 'user', isActive: true, createdAt: now },
  { _id: 'u-1003', name: 'Tanvir Ahmed', email: 'tanvir@example.com', role: 'user', isActive: false, createdAt: now },
  { _id: 'u-1004', name: 'Nusrat Jahan', email: 'nusrat@example.com', role: 'user', isActive: true, createdAt: now },
  { _id: 'u-1005', name: 'Fahim Uddin', email: 'fahim@example.com', role: 'user', isActive: true, createdAt: now },
  { _id: 'u-1006', name: 'Admin User', email: demoAdminCredentials.email, role: 'admin', isActive: true, createdAt: now },
];

let activities: ActivityItem[] = [
  { id: 'a-1', user: 'Rakib Hasan', action: 'নতুন পরীক্ষা সম্পন্ন করেছে', exam: 'BCS Preliminary', score: '85%', time: '৫ মি. আগে', avatar: 'RH', color: 'emerald' },
  { id: 'a-2', user: 'Sumaiya Akter', action: 'সাবস্ক্রিপশন আপগ্রেড করেছে', exam: 'প্রিমিয়াম প্ল্যান', time: '১৫ মি. আগে', avatar: 'SA', color: 'violet' },
  { id: 'a-3', user: 'Tanvir Ahmed', action: 'প্রশ্ন সমাধান করেছে', exam: 'Bank Job Prep', score: '72%', time: '১ ঘ. আগে', avatar: 'TA', color: 'blue' },
  { id: 'a-4', user: 'Nusrat Jahan', action: 'রিভিউ দিয়েছে', exam: 'Govt. Job', score: '4.8★', time: '২ ঘ. আগে', avatar: 'NJ', color: 'amber' },
  { id: 'a-5', user: 'Fahim Uddin', action: 'লাইভ ক্লাসে যোগ দিয়েছে', exam: 'Math Special', time: '৩ ঘ. আগে', avatar: 'FU', color: 'cyan' },
];

const topExams = [
  { name: 'BCS Preliminary', participants: 3240, completion: 78, tag: 'ট্রেন্ডিং', tagColor: 'emerald', rank: 1 },
  { name: 'Bank Job Written', participants: 2850, completion: 65, tag: 'ট্রেন্ডিং', tagColor: 'blue', rank: 2 },
  { name: 'Govt. Job Prep', participants: 2100, completion: 91, tag: 'হট 🔥', tagColor: 'rose', rank: 3 },
];

export function getDashboardOverview(): DashboardOverview {
  return {
    stats: {
      totalUsers: users.length,
      totalQuestions: 18450,
      totalRevenue: '৳12,57,890',
      activeSubscriptions: 5420,
      dailyActive: 3450,
      totalExams: 256,
      totalJobs: 189,
      averageScore: '68.5%',
    },
    recentActivities: activities.slice(0, 5),
    users: users.filter((user) => user.role === 'user'),
  };
}

export function getTopExams() {
  return topExams;
}

export function getUsers() {
  return users;
}

export function findUserById(userId: string) {
  return users.find((user) => user._id === userId) ?? null;
}

export function updateUser(userId: string, updates: Partial<Pick<AdminUser, 'name' | 'email' | 'role' | 'isActive'>>) {
  const index = users.findIndex((user) => user._id === userId);

  if (index === -1) {
    return null;
  }

  const updatedUser = {
    ...users[index],
    ...updates,
  };

  users[index] = updatedUser;
  activities.unshift({
    id: `a-${Date.now()}`,
    user: updatedUser.name,
    action: updates.role ? 'রোল আপডেট করেছে' : 'প্রোফাইল আপডেট করেছে',
    exam: 'Admin Console',
    time: 'এইমাত্র',
    avatar: updatedUser.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
    color: 'emerald',
  });

  return updatedUser;
}

export function deleteUser(userId: string) {
  const existing = findUserById(userId);

  if (!existing) {
    return null;
  }

  users = users.filter((user) => user._id !== userId);

  return existing;
}

export function createUser(data: Pick<AdminUser, 'name' | 'email' | 'role'>) {
  const newUser: AdminUser = {
    _id: `u-${Date.now()}`,
    name: data.name,
    email: data.email,
    role: data.role,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  users = [newUser, ...users];

  return newUser;
}

export function getDemoAdminCredentials() {
  return demoAdminCredentials;
}

export function createTokenPayload(user: AdminUser) {
  return Buffer.from(JSON.stringify({
    sub: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
  })).toString('base64url');
}

export function parseTokenPayload(token: string) {
  try {
    return JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as {
      sub?: string;
      email?: string;
      role?: string;
      name?: string;
    };
  } catch {
    return null;
  }
}
