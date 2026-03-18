import { NextResponse } from "next/server";
import { mockLeads, mockProperties } from "@/lib/mockData";
import { matchLeadToProperties } from "@/lib/matchEngine";

export async function POST(req: Request) {
  try {
    const { leadId } = await req.json();
    const lead = mockLeads.find((l) => l.id === leadId);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    const matches = matchLeadToProperties(lead, mockProperties);
    return NextResponse.json({ lead, matches });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
