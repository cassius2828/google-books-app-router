import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface UserDoc extends Document {
  username: string;
  email: string;
  avatar: string | null;
  favoriteGenres: string[];
  favoriteBooks: Types.ObjectId[];
  isProfilePublic: boolean;
}

const UserSchema = new Schema<UserDoc>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: null },
    favoriteGenres: { type: [String], default: [] },
    favoriteBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    isProfilePublic: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const UserModel: Model<UserDoc> =
  (mongoose.models.User as Model<UserDoc> | undefined) ??
  mongoose.model<UserDoc>("User", UserSchema);
