import { deleteUser, parseTokenPayload, updateUser } from '@/lib/admin-store';
import { NextResponse } from 'next/server';

function getBearerToken(request: Request) {
  const header = request.headers.get('authorization');

  if (!header?.startsWith('Bearer ')) {
    return null;
  }

  return header.slice(7);
}

export async function PUT(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const token = getBearerToken(request);

  if (!token || !parseTokenPayload(token)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { userId } = await params;
  const body = await request.json();
  const updatedUser = updateUser(userId, {
    name: body.name,
    email: body.email,
    role: body.role,
    isActive: body.isActive,
  });

  if (!updatedUser) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, user: updatedUser });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const token = getBearerToken(request);

  if (!token || !parseTokenPayload(token)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const { userId } = await params;
  const removedUser = deleteUser(userId);

  if (!removedUser) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, user: removedUser });
}
