
export type InquiryStatus = 'new' | 'assigned' | 'viewed' | 'responded';

export interface Inquiry {
  id: number;
  userEmail: string;
  serviceType: string;
  description: string;
  status: InquiryStatus;
  therapistEmail: string;
  response?: string;
  createdAt: Date;
}

export interface Service {
  key: string;
  label: string;
}

export type View = 'patient' | 'therapist' | 'admin';
