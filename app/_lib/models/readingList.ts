import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface ReadingListDoc extends Document {
  user_id: Types.ObjectId;
  book_id: Types.ObjectId;
  status: "to_read" | "reading" | "completed";
}

const ReadingListSchema = new Schema<ReadingListDoc>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book_id: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    status: {
      type: String,
      enum: ["to_read", "reading", "completed"],
      default: "reading",
    },
  },
  { timestamps: true },
);

ReadingListSchema.index({ user_id: 1, book_id: 1 }, { unique: true });

export const ReadingListModel: Model<ReadingListDoc> =
  (mongoose.models.ReadingList as Model<ReadingListDoc> | undefined) ??
  mongoose.model<ReadingListDoc>("ReadingList", ReadingListSchema);
