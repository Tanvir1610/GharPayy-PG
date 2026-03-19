import { NextResponse } from "next/server";
import { mockLeads } from "@/lib/mockData";

// In-memory store (resets on server restart — use DB for prod)
let leads = [...mockLeads];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const q = searchParams.get("q")?.toLowerCase();

  let result = leads;
  if (status && status !== "all") {
    result = result.filter((l) => l.status === status);
  }
  if (q) {
    result = result.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.preferredLocation.toLowerCase().includes(q) ||
        l.phone.includes(q)
    );
  }
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newLead = {
      ...body,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: body.status ?? "new",
    };
    leads = [newLead, ...leads];
    return NextResponse.json(newLead, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...updates } = await req.json();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    leads[idx] = { ...leads[idx], ...updates };
    return NextResponse.json(leads[idx]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
