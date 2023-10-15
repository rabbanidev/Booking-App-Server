import { Schema, Types, model } from 'mongoose';
import { CartModel, ICart } from './cart.interface';

const cartSchema = new Schema<ICart, CartModel>(
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cart = model<ICart, CartModel>('Cart', cartSchema);
