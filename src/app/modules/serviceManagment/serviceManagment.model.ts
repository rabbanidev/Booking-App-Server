/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IService } from './serviceManagment.interface';

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxSize: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isUpcoming: {
      type: String,
      default: false,
    },
    facilities: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    numOfReviews: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Service = model<IService>('Service', serviceSchema);

export default Service;
