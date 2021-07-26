export type User = {
  id: number;
  firstName: string;
  patronymic: string | null;
  lastName: string;
  type: string;
  department: string;
  email: string;
  phoneNumber: string;
  extraPhoneNumbers: string | null;
  nameTemp: string | null;
  startYear: number;
  degree: string;
  verified: boolean;
};

export type OccupiedInfo = {
  user: User;
  until: Date;
};

export type Comment = {
  id: number;
  user: User;
  body: string;
  date: Date;
};

export type InstrumentType = {
  id: number;
  type: string;
  name: string;
  rate: number;
  comments: Comment | null;
  classroom: ClassroomType;
};

export type DisabledInfo = {
  comment: string;
  until: Date;
};

export type ScheduleUnitType = {
  id: number;
  user: User;
  classroom: ClassroomType;
  dateStart: Date;
  dateEnd: Date;
  dayOfWeek: number;
  from: string;
  to: string;
  activity: string;
};

export type ClassroomType = {
  id: number;
  name: string;
  chair: Department | null;
  special: string | null;
  floor: number;
  isWing: boolean;
  isOperaStudio: boolean;
  description: string | null;
  occupied: OccupiedInfo | null;
  instruments: Array<InstrumentType>;
  disabled: DisabledInfo | null;
  schedule: Array<ScheduleUnitType>;
  isHidden: boolean;
};


export type Department = {
  id: number;
  name: string;
};