import { Schema, model } from 'mongoose';
import { INews, NewsModel } from './news.interface';

const newsSchema = new Schema<INews, NewsModel>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const News = model<INews, NewsModel>('News', newsSchema);
