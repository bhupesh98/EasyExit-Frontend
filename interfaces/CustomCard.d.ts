import { TokenStatus } from '../constants/TokenStatus';

export interface CustomCardProps {
  value?: string;
  status?: TokenStatus;
  heading?: string;
  startTime?: Date;
  endTime?: Date;
  acceptedBy?: string;
  phoneNumber?: number;
  reason?: string;
  email?:string;
  requestedBy?:string;
}

export interface CustomCard2Props {
  reason?: string;
  email?: string;
  heading?: string;
  startTime?: Date;
  endTime?: Date;
  status?: TokenStatus;
  name?: string;
  phoneNumber?: number;
}
export interface AdminCardProps {
  name?: string;
  email?: string;
  heading?: string;
  exitTime?: Date;
  returnTime?: Date;
  phoneNumber?: number;
  profileImg?: string;
  status?: TokenStatus;
}