import { Model, Types } from 'mongoose';
import { IAllUser } from '../users/users.interface';
import { IService } from '../service/service.interface';

export type IReview = {
  user: Types.ObjectId | IAllUser;
  service: Types.ObjectId | IService;
  rating: number;
  description?: string;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
