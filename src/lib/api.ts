import { NextResponse } from 'next/server';

export function ok(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}
export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}
export function unauthorized() {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}
export function forbidden() {
  return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
}
export function notFound(entity = 'Resource') {
  return NextResponse.json({ success: false, message: `${entity} not found` }, { status: 404 });
}
