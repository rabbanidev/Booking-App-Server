import { Model } from 'mongoose';
import { IGender } from '../../../interfaces/gender';

type IName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  name: IName;
  email: string;
  contactNo: string;
  dob?: string;
  gender?: IGender;
  profileImage?: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
