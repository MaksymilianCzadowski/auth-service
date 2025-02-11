import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  googleId?: string;
  openIdSub?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    openIdSub: {
      type: String,
      sparse: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
    picture: String,
  },
  {
    timestamps: true,
  }
);

// Index pour optimiser les recherches
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ openIdSub: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
