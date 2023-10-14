import { Model } from 'mongoose';

type IName = {
  firstName: string;
  lastName: string;
};

export type ISuperAdmin = {
  name: IName;
  email: string;
  contactNo?: string;
  profileImage?: string;
};

export type SuperAdminModel = Model<ISuperAdmin, Record<string, unknown>>;
