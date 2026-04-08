import mongoose, { Schema, Model, Document } from "mongoose";

export interface BookDoc extends Document {
  google_book_id: string;
  title: string;
  authors: string[];
  publisher: string;
  published_date: string;
  description: string;
  page_count: number;
  categories: string[];
  thumbnail: string;
  cover_image: string;
  preview_link: string;
}

const BookSchema = new Schema<BookDoc>(
  {
    google_book_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    authors: { type: [String], default: [] },
    publisher: { type: String, default: "" },
    published_date: { type: String, default: "" },
    description: { type: String, default: "" },
    page_count: { type: Number, default: 0 },
    categories: { type: [String], default: [] },
    thumbnail: { type: String, default: "" },
    cover_image: { type: String, default: "" },
    preview_link: { type: String, default: "" },
  },
  { timestamps: true },
);

export const BookModel: Model<BookDoc> =
  (mongoose.models.Book as Model<BookDoc> | undefined) ??
  mongoose.model<BookDoc>("Book", BookSchema);
