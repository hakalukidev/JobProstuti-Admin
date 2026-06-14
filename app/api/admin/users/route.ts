import { createUser, getUsers, parseTokenPayload } from '@/lib/admin-store';
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

  if (!token || !parseTokenPayload(token)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const search = url.searchParams.get('search')?.toLowerCase() ?? '';
  const page = Number(url.searchParams.get('page') ?? '1');
  const limit = Number(url.searchParams.get('limit') ?? '10');

  const filteredUsers = getUsers().filter((user) => {
    if (!search) {
      return true;
    }

    return [user.name, user.email, user.role].some((value) => value.toLowerCase().includes(search));
  });

  const startIndex = Math.max(page - 1, 0) * limit;

  return NextResponse.json({
    success: true,
    users: filteredUsers.slice(startIndex, startIndex + limit),
    pagination: {
      page,
      limit,
      total: filteredUsers.length,
    },
  });
}

export async function POST(request: Request) {
  const token = getBearerToken(request);

  if (!token || !parseTokenPayload(token)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const createdUser = createUser({
    name: body.name,
    email: body.email,
    role: body.role === 'admin' ? 'admin' : 'user',
  });

  return NextResponse.json({ success: true, user: createdUser }, { status: 201 });
}
