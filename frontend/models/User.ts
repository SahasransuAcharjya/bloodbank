export type UserRole = "DONOR" | "HOSPITAL" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bloodType?: string | null;
  lastDonationDate?: string | null;
  totalDonations?: number;
  city?: string | null;
}
