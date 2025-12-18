export type RequestUrgency = "NORMAL" | "URGENT" | "CRITICAL";
export type RequestStatus = "OPEN" | "MATCHED" | "FULFILLED" | "CANCELLED";

export interface Request {
  _id: string;
  hospitalId: string;
  bloodType: string;
  units: number;
  urgency: RequestUrgency;
  city?: string;
  note?: string;
  status: RequestStatus;
  createdAt: string;
}
