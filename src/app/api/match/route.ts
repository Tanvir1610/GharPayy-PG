import { NextResponse } from "next/server";
import { mockLeads, mockProperties } from "@/lib/mockData";
import { matchLeadToProperties } from "@/lib/matchEngine";

// In-memory assignments: leadId -> propertyId
const assignments: Record<string, string> = {};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, action, propertyId } = body;

    // Handle assignment action
    if (action === "assign" && leadId && propertyId) {
      assignments[leadId] = propertyId;
      return NextResponse.json({ success: true, leadId, propertyId });
    }
    if (action === "unassign" && leadId) {
      delete assignments[leadId];
      return NextResponse.json({ success: true, leadId });
    }

    // Default: run matching
    const lead = mockLeads.find((l) => l.id === leadId);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const matches = matchLeadToProperties(lead, mockProperties);
    return NextResponse.json({
      lead,
      matches,
      assignedPropertyId: assignments[leadId] ?? null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ assignments });
}
