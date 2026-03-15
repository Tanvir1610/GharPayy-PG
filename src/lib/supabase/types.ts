export type UserRole = 'tenant' | 'owner' | 'admin';
export type GenderPref = 'male' | 'female' | 'any';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type VisitStatus = 'scheduled' | 'completed' | 'cancelled';
export type RoomType = 'single' | 'double' | 'triple' | 'dormitory';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  name: string;
  slug: string | null;
  address: string;
  city: string;
  area: string | null;
  description: string | null;
  gender_preference: GenderPref;
  amenities: string[];
  rules: string | null;
  photos: string[];
  owner_id: string;
  is_verified: boolean;
  average_rating: number;
  total_reviews: number;
  highlights: string[];
  nearby_places: string[];
  tier: string | null;
  price_range: string | null;
  min_rent: number | null;
  max_rent: number | null;
  created_at: string;
  updated_at: string;
  // joined
  owner?: Pick<Profile, 'full_name' | 'email' | 'phone'>;
}

export interface Room {
  id: string;
  property_id: string;
  room_type: RoomType;
  total_beds: number;
  occupied_beds: number;
  rent: number;
  amenities: string[];
  photos: string[];
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  property_id: string;
  room_id: string;
  move_in_date: string;
  rent: number;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
  // joined
  property?: Pick<Property, 'id' | 'name' | 'city' | 'photos'>;
  room?: Pick<Room, 'id' | 'room_type' | 'rent'>;
  user?: Pick<Profile, 'id' | 'full_name' | 'email' | 'phone'>;
}

export interface Visit {
  id: string;
  user_id: string;
  property_id: string;
  visit_date: string;
  visit_time: string;
  status: VisitStatus;
  notes: string | null;
  created_at: string;
  property?: Pick<Property, 'id' | 'name' | 'city' | 'address'>;
  user?: Pick<Profile, 'id' | 'full_name' | 'email'>;
}

export interface Wishlist {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property?: Property;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  property_id: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
  sender?: Pick<Profile, 'id' | 'full_name' | 'avatar_url'>;
  receiver?: Pick<Profile, 'id' | 'full_name' | 'avatar_url'>;
  property?: Pick<Property, 'id' | 'name'>;
}
