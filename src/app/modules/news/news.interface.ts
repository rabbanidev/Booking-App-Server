import { Model } from 'mongoose';

export type INews = {
  title: string;
  image: string;
  description: string;
};

export type NewsModel = Model<INews, Record<string, unknown>>;
