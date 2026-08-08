export type RoomType = "standard" | "deluxe" | "suite" | "presidential";
export type RoomStatus = "available" | "occupied" | "maintenance" | "cleaning";
export type BookingStatus = "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "refunded";

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  description: string;
  price: number;
  capacity: number;
  size: number;
  floor: number;
  amenities: string[];
  images: string[];
  status: RoomStatus;
  rating: number;
  reviewCount: number;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality?: string;
  loyaltyTier: "bronze" | "silver" | "gold" | "platinum";
  totalStays: number;
  createdAt: string;
}

export interface Booking {
  id: string;
  roomId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  specialRequests?: string;
  createdAt: string;
}

export interface BookingFormData {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  occupancyRate: number;
  totalBookings: number;
  activeGuests: number;
  availableRooms: number;
  pendingCheckIns: number;
}

export interface RoomFilters {
  type?: RoomType | "all";
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  search?: string;
}
