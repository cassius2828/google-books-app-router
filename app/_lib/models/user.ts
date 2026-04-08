import mongoose, { Schema, Model, Document } from "mongoose";

export interface UserDoc extends Document {
  username: string;
  email: string;
  avatar: string | null;
}

const UserSchema = new Schema<UserDoc>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: null },
  },
  { timestamps: true },
);

export const UserModel: Model<UserDoc> =
  (mongoose.models.User as Model<UserDoc> | undefined) ??
  mongoose.model<UserDoc>("User", UserSchema);
