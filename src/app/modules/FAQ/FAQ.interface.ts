import { Model } from 'mongoose';

export type IFAQ = {
  title: string;
  description: string;
};

export type FAQModel = Model<IFAQ, Record<string, unknown>>;
