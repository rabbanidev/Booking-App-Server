import { Schema, Types, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

const reviewSchema = new Schema<IReview, ReviewModel>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'AllUser',
      required: true,
    },
    service: {
      type: Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Review = model<IReview, ReviewModel>('Review', reviewSchema);
