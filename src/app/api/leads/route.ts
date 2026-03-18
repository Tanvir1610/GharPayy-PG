import { NextResponse } from "next/server";
import { mockLeads } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(mockLeads);
}
