/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { ISuperAdmin, SuperAdminModel } from './superAdmin.interface';

const superAdminSchema = new Schema<ISuperAdmin, SuperAdminModel>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
    },
    profileImage: {
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

const SuperAdmin = model<ISuperAdmin, SuperAdminModel>(
  'SuperAdmin',
  superAdminSchema
);

export default SuperAdmin;
