import { Model, Types } from 'mongoose';
import { IService } from '../service/service.interface';
import { IAllUser } from '../users/users.interface';

export type ICart = {
  user: Types.ObjectId | IAllUser;
  service: Types.ObjectId | IService;
};

export type CartModel = Model<ICart, Record<string, unknown>>;
