/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { AllUserModel, IAllUser } from './users.interface';
import config from '../../../config';

const allUsersSchema = new Schema<IAllUser, AllUserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },

    superAdmin: {
      type: Schema.Types.ObjectId,
      ref: 'SuperAdmin',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Check is user exit using instance method
allUsersSchema.methods.userExit = async function (
  email: string
): Promise<Partial<IAllUser> | null> {
  const user = await AllUser.findOne(
    { email },
    { email: 1, password: 1, role: 1 }
  );

  return user;
};

// Check match password using instance method
allUsersSchema.methods.matchPassword = async function (
  textPassword: string,
  hashPassword: string
): Promise<boolean> {
  const isMatchedPassword = await bcrypt.compare(textPassword, hashPassword);
  return isMatchedPassword;
};

allUsersSchema.pre('save', async function (next) {
  // hashing password
  const user = this;
  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_sald_rounds)
  );

  next();
});

const AllUser = model<IAllUser, AllUserModel>('AllUser', allUsersSchema);

export default AllUser;
