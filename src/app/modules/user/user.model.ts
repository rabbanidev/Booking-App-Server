/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';

const usersSchema = new Schema<IUser, UserModel>(
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Check is user exit using instance method
usersSchema.methods.userExit = async function (
  email: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { email },
    { email: 1, password: 1, role: 1 }
  );
  return user;
};

// Check match password using instance method
usersSchema.methods.matchPassword = async function (
  textPassword: string,
  hashPassword: string
): Promise<boolean> {
  const isMatchedPassword = await bcrypt.compare(textPassword, hashPassword);
  return isMatchedPassword;
};

usersSchema.pre('save', async function (next) {
  // hashing password
  const user = this;
  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_sald_rounds)
  );

  next();
});

const User = model<IUser, UserModel>('User', usersSchema);

export default User;
