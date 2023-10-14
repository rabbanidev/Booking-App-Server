import { Model } from 'mongoose';
import { IGender } from '../../../interfaces/gender';

type IName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  name: IName;
  email: string;
  contactNo: string;
  dob?: string;
  gender?: IGender;
  profileImage?: string;
  active?: boolean;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
