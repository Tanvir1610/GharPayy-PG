import { Lead, Property, MatchResult } from "@/types";

function locationScore(
  leadLocation: string,
  propArea: string,
  propCity: string
): number {
  if (!leadLocation) return 20;
  const lead = leadLocation.toLowerCase().trim();
  const area = propArea.toLowerCase().trim();
  const city = propCity.toLowerCase().trim();

  if (area === lead || area.includes(lead) || lead.includes(area)) return 40;
  if (city.includes(lead) || lead.includes(city)) return 15;
  return 0;
}

function budgetScore(
  leadMin: number,
  leadMax: number,
  propPrice: number
): number {
  if (propPrice >= leadMin && propPrice <= leadMax) return 30;
  if (propPrice < leadMin) {
    // Under budget — partial credit
    const diff = (leadMin - propPrice) / leadMin;
    return diff < 0.2 ? 20 : diff < 0.4 ? 10 : 0;
  }
  // Over budget
  const diff = (propPrice - leadMax) / leadMax;
  return diff < 0.1 ? 20 : diff < 0.25 ? 10 : 0;
}

function roomTypeScore(
  leadRoom: Lead["roomType"],
  propRooms: Property["roomTypes"]
): number {
  return propRooms.includes(leadRoom) ? 20 : 0;
}

function genderScore(
  leadGender: Lead["genderPreference"],
  propGender: Property["genderAllowed"]
): number {
  if (propGender === "unisex") return 7;
  if (propGender === leadGender) return 10;
  return 0;
}

export function matchLeadToProperties(
  lead: Lead,
  properties: Property[]
): MatchResult[] {
  const results: MatchResult[] = properties
    .filter((p) => p.isActive && p.availableBeds > 0)
    .map((property) => {
      const loc = locationScore(
        lead.preferredLocation,
        property.area,
        property.city
      );
      const bud = budgetScore(lead.budgetMin, lead.budgetMax, property.pricePerMonth);
      const room = roomTypeScore(lead.roomType, property.roomTypes);
      const gender = genderScore(lead.genderPreference, property.genderAllowed);

      const score = loc + bud + room + gender;

      let matchLabel: MatchResult["matchLabel"];
      if (score >= 80) matchLabel = "Excellent";
      else if (score >= 55) matchLabel = "Good";
      else if (score >= 35) matchLabel = "Fair";
      else matchLabel = "Low";

      return {
        property,
        score,
        breakdown: { location: loc, budget: bud, roomType: room, gender },
        matchLabel,
      };
    });

  return results.sort((a, b) => b.score - a.score);
}
