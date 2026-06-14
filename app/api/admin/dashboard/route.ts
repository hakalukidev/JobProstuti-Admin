import { getDashboardOverview, parseTokenPayload } from '@/lib/admin-store';
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

  return NextResponse.json({
    success: true,
    ...getDashboardOverview(),
  });
}
