/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import { ISuperAdmin } from '../superAdmin/superAdmin.interface';
import { IAdmin } from '../admin/admin.interface';

type IUserRole =
  | ENUMS_USER_ROLE.SUPER_ADMIN
  | ENUMS_USER_ROLE.ADMIN
  | ENUMS_USER_ROLE.USER;

export type IUser = {
  email: string;
  password: string;
  role: IUserRole;
  superAdmin?: Types.ObjectId | ISuperAdmin;
  admin?: Types.ObjectId | IAdmin;
  // user?: Types.ObjectId;
};

export type IUserMethods = {
  userExit(email: string): Promise<Partial<IUser> | null>;
  matchPassword(textPassword: string, hashPassword: string): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
