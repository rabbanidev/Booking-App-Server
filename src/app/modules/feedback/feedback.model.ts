import { Schema, model } from 'mongoose';
import { FeedBackModel, IFeedBack } from './feedback.interface';

const feedbackSchema = new Schema<IFeedBack, FeedBackModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
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

export const FeedBack = model<IFeedBack, FeedBackModel>(
  'FeedBack',
  feedbackSchema
);
