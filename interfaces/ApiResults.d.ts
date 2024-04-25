import { Role } from '@/constants/Role';
import { TokenStatus } from '@/constants/TokenStatus';

export type SearchResultsData = {
  id: string;
  name: string;
};

export type CheckedTokensData = {
  token: string;
  heading: string;
  status: TokenStatus;
  exitTime?: Date | null;
  returnedTime?: Date | null;
};

export type getTokenData = {
  token: string;
  reason?: string;
  heading: string;
  startTime: Date;
  endTime: Date;
  status: TokenStatus;
  acceptedBy?: string;
  phoneNumber?: number;
};

export type OutpassResultsData = {
  token: string;
  reason?: string;
  email?: string;
  heading: string;
  startTime: Date;
  endTime: Date;
  status: TokenStatus;
  acceptedBy: string;
  phoneNumber: number;
};

export type TokenData = {
  token: string;
};

export type UserData = {
  token: string;
  name: string;
  organizationId: String;
}

export type ProfileData = {
  name: string;
  email: string;
  organization: string;
  unrestrictedStartTime: Date;
  unrestrictedEndTime: Date;
  role: Role;
  phoneNumber: number;
  profileImg?: string;
};

export type getSupervisorData = {
  manager: Pick<ProfileData, 'name' | 'email' | 'phoneNumber' | 'profileImg'>[];
  checker: Pick<ProfileData, 'name' | 'email' | 'phoneNumber' | 'profileImg'>[];
};

export type TokenStats = {
  pending: number;
  approved: number;
  denied: number;
};


export type NotificaitonResultsData = {
  notificaitonId: string;
  title: string;
  description: string;
  organizationId: string;
  topic: string;
  notificationStatus: string;
  senderEmail: string;
  createdAt: string;
};
