import mongoose from "mongoose";

/**
 * True when `id` can be used to look up a reading_list row by MongoDB book_id.
 * Rejects empty values, the literal "undefined", and invalid ObjectId strings.
 */
export function isValidReadingListLookupId(
  id: string | undefined | null
): boolean {
  if (!id || id === "undefined") return false;
  return mongoose.Types.ObjectId.isValid(id);
}
