import { Schema, Types, model } from 'mongoose';
import { BookingModel, IBooking } from './booking.interface';
import { bookingStatus } from './booking.constant';

const bookingSchema = new Schema<IBooking, BookingModel>(
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
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: bookingStatus,
      default: 'pending',
    },
    totalPerson: {
      type: Number,
      required: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
      },
      contactNo: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Booking = model<IBooking, BookingModel>('Booking', bookingSchema);
