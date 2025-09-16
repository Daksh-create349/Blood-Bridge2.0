export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type ResourceStatus = 'Available' | 'Low' | 'Critical';
export type UrgencyLevel = 'Critical' | 'High' | 'Moderate';
export type RequestStatus = 'Fulfilled' | 'Expired' | 'Active';

export interface BloodResource {
  id: string;
  bloodType: BloodType;
  quantity: number;
  location: string;
  status: ResourceStatus;
}

export interface UrgentRequest {
  id: string;
  bloodType: BloodType;
  quantity: number;
  hospital: string;
  location: string;
  urgency: UrgencyLevel;
  timePosted: string; // ISO string
  status: RequestStatus;
  radius?: number;
}

export interface Donor {
  id: string;
  name: string;
  bloodType: BloodType;
  location: string;
  lastDonation: string; // ISO date string
  contact: string;
}

export interface RequestHistoryItem extends UrgentRequest {
  fulfilledBy?: string;
  date: string;
}

export interface BloodBank {
  id: string;
  name: string;
  location: string;
}

export interface BloodCamp {
    id: string;
    name: string;
    location: string;
    date: string;
    organizer: string;
    timings: string;
}
