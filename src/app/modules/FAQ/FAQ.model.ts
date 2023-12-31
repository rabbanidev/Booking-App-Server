import { Schema, model } from 'mongoose';
import { IFAQ, FAQModel } from './FAQ.interface';

const FAQSchema = new Schema<IFAQ, FAQModel>(
  {
    title: {
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

export const FAQ = model<IFAQ, FAQModel>('FAQ', FAQSchema);
