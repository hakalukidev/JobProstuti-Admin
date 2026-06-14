import { createTokenPayload, getDemoAdminCredentials, getUsers } from '@/lib/admin-store';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const credentials = getDemoAdminCredentials();

  if (email !== credentials.email || password !== credentials.password) {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }

  const adminUser = getUsers().find((user) => user.email === credentials.email && user.role === 'admin');

  if (!adminUser) {
    return NextResponse.json({ success: false, message: 'Admin profile not found' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    token: createTokenPayload(adminUser),
    user: adminUser,
  });
}
