import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface NoteDoc extends Document {
  reading_list_id: Types.ObjectId;
  content: string;
}

const NoteSchema = new Schema<NoteDoc>(
  {
    reading_list_id: {
      type: Schema.Types.ObjectId,
      ref: "ReadingList",
      required: true,
      unique: true,
    },
    content: { type: String, default: "" },
  },
  { timestamps: true },
);

export const NoteModel: Model<NoteDoc> =
  (mongoose.models.Note as Model<NoteDoc> | undefined) ??
  mongoose.model<NoteDoc>("Note", NoteSchema);
