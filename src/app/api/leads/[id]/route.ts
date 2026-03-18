import { NextResponse } from "next/server";
import { mockLeads } from "@/lib/mockData";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const lead = mockLeads.find((l) => l.id === params.id);
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  return NextResponse.json(lead);
}
