import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface UserDoc extends Document {
  name: string;
  email: string;
  image: string | null;
  favoriteGenres: string[];
  favoriteBooks: Types.ObjectId[];
  isProfilePublic: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: null },
    favoriteGenres: { type: [String], default: [] },
    favoriteBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    isProfilePublic: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const UserModel: Model<UserDoc> =
  (mongoose.models.User as Model<UserDoc> | undefined) ??
  mongoose.model<UserDoc>("User", UserSchema);
