import { createTokenPayload, getDemoAdminCredentials, getUsers } from '@/lib/admin-store';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // ✅ credentials চেক করুন
    const credentials = getDemoAdminCredentials();
    
    // ✅ credentials null হলে error দিন
    if (!credentials) {
      return NextResponse.json(
        { success: false, message: 'Demo login not available in production' },
        { status: 401 }
      );
    }

    // ✅ credentials মিলিয়ে দেখুন
    if (email !== credentials.email || password !== credentials.password) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // ✅ await দিয়ে ইউজার খুঁজুন
    const users = await getUsers();
    const adminUser = users.find((user: any) => user.email === credentials.email && user.role === 'admin');

    if (!adminUser) {
      return NextResponse.json(
        { success: false, message: 'Admin profile not found' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      token: createTokenPayload(adminUser),
      user: adminUser,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}