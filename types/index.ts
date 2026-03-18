export type RoomType = "single" | "double" | "triple" | "dormitory";
export type GenderPreference = "male" | "female" | "unisex";
export type LeadStatus =
  | "new"
  | "contacted"
  | "requirement_collected"
  | "property_suggested"
  | "visit_scheduled"
  | "visit_completed"
  | "booked"
  | "lost";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  preferredLocation: string;
  budget: string; // e.g. "8000-12000" or "under 15k"
  budgetMin: number;
  budgetMax: number;
  roomType: RoomType;
  genderPreference: GenderPreference;
  status: LeadStatus;
  source: string;
  moveInDate?: string;
  notes?: string;
  assignedPropertyId?: string;
  createdAt: string;
}

export interface Amenity {
  label: string;
  icon: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  area: string;
  city: string;
  address: string;
  pricePerMonth: number;
  roomTypes: RoomType[];
  genderAllowed: GenderPreference;
  totalBeds: number;
  availableBeds: number;
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  description: string;
  isActive: boolean;
}

export interface MatchResult {
  property: Property;
  score: number;
  breakdown: {
    location: number;
    budget: number;
    roomType: number;
    gender: number;
  };
  matchLabel: "Excellent" | "Good" | "Fair" | "Low";
}
