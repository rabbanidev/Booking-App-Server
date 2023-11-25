/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IService, ServiceModel } from './service.interface';

const serviceSchema = new Schema<IService, ServiceModel>(
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
      type: Boolean,
      default: false,
    },
    facilities: [
      {
        type: String,
      },
    ],

    // isAvailable: {
    //   type: Boolean,
    //   default: true,
    // },

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

const Service = model<IService, ServiceModel>('Service', serviceSchema);

export default Service;
