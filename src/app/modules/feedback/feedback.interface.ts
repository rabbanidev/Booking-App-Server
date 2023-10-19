import { Model } from 'mongoose';

export type IFeedBack = {
  name: string;
  email: string;
  description: string;
};

export type FeedBackModel = Model<IFeedBack, Record<string, unknown>>;
