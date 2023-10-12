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
