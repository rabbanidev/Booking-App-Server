import { Model, Types } from 'mongoose';
import { IAllUser } from '../users/users.interface';
import { IService } from '../service/service.interface';

export type IStatus =
  | 'pending'
  | 'cancelled'
  | 'accepted'
  | 'rejected'
  | 'adjust schedule';

export type ICustomer = {
  name: string;
  contactNo: string;
};

export type IBooking = {
  user: Types.ObjectId | IAllUser;
  service: Types.ObjectId | IService;
  checkIn: Date;
  checkOut: Date;
  status: IStatus;
  totalPerson: number;
  customer: ICustomer;
};

export type BookingModel = Model<IBooking, Record<string, unknown>>;
