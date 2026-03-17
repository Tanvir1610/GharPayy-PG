import { NextResponse } from "next/server";
import { mockProperties } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(mockProperties);
}
