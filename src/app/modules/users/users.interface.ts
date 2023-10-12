/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { ENUMS_USER_ROLE } from '../../../enum/enum';
import { ISuperAdmin } from '../superAdmin/superAdmin.interface';
import { IAdmin } from '../admin/admin.interface';

type IUserRole =
  | ENUMS_USER_ROLE.SUPER_ADMIN
  | ENUMS_USER_ROLE.ADMIN
  | ENUMS_USER_ROLE.USER;

export type IAllUser = {
  email: string;
  password: string;
  role: IUserRole;
  superAdmin?: Types.ObjectId | ISuperAdmin;
  admin?: Types.ObjectId | IAdmin;
  // user?: Types.ObjectId;
};

export type IAllUserMethods = {
  userExit(email: string): Promise<Partial<IAllUser> | null>;
  matchPassword(textPassword: string, hashPassword: string): Promise<boolean>;
};

export type AllUserModel = Model<
  IAllUser,
  Record<string, unknown>,
  IAllUserMethods
>;
