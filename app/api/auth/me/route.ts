import { getUsers, parseTokenPayload } from '@/lib/admin-store';
import { NextResponse } from 'next/server';

function getBearerToken(request: Request) {
  const header = request.headers.get('authorization');

  if (!header?.startsWith('Bearer ')) {
    return null;
  }

  return header.slice(7);
}

export async function GET(request: Request) {
  const token = getBearerToken(request);

  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const payload = parseTokenPayload(token);

  if (!payload?.email) {
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
  }

  const user = getUsers().find((item) => item.email === payload.email);

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, user });
}
