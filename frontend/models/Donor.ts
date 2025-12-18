import type { User } from "./User";

export interface Donor extends User {
  role: "DONOR";
  bloodType: string;
}
