import { TokenStatus } from "./TokenStatus";

export interface CustomCardManagerProps {
  number?: Number;
  title: 'Approved' | 'Denied' | 'Pending' | 'Check-Ins' | 'Check-Out';
  text: string;
  onPress?: () => void;
}

export interface OutPassCardManagerProps {
  heading: string;
  name: string;
  startTime: Date;
  endTime: Date;
  email: string;
  onPressCard: ()=>void;
  profileImg?: string;
  value:string;
  status?:TokenStatus;
  phoneNumber:number;
  doRefetch?:any;
}