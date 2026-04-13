"use client";

import { ReadingListStatusAndId } from "@/app/_lib/types";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

interface BookNotesProps {
  readingListObj: ReadingListStatusAndId;
  note: string;
  draftNote: string;
  isEditingNote: boolean;
  isPendingNotes: boolean;
  isLoading: boolean;
  onSetDraftNote: (v: string) => void;
  onSetIsEditingNote: (v: boolean) => void;
  onSaveNotes: (formData: FormData) => void;
  onCancelEdit: () => void;
}

export default function BookNotes({
  readingListObj,
  note,
  draftNote,
  isEditingNote,
  isPendingNotes,
  isLoading,
  onSetDraftNote,
  onSetIsEditingNote,
  onSaveNotes,
  onCancelEdit,
}: BookNotesProps) {
  if (!isLoading && !readingListObj.id) return null;

  return (
    <section className="container mx-auto px-6 mt-12 md:mt-16">
      <div className="max-w-3xl mx-auto">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-lg">Your Notes</CardTitle>
            {!isLoading && !isEditingNote && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onSetDraftNote(note);
                  onSetIsEditingNote(true);
                }}
                className="text-muted-foreground hover:text-foreground gap-1.5"
              >
                <Pencil className="size-3.5" />
                {note ? "Edit" : "Add note"}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : isEditingNote ? (
              <form action={onSaveNotes}>
                <input
                  type="hidden"
                  name="readingListId"
                  value={readingListObj.id}
                />
                <Textarea
                  name="content"
                  id="content"
                  rows={6}
                  onChange={(e) => onSetDraftNote(e.target.value)}
                  value={draftNote}
                  placeholder="Write your thoughts, quotes, or reflections..."
                  className="resize-none mb-4"
                  autoFocus
                />
                <div className="flex items-center justify-end gap-3">
                  {draftNote !== note && (
                    <span className="text-xs text-muted-foreground mr-auto">
                      Unsaved changes
                    </span>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onCancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isPendingNotes || draftNote === note}
                  >
                    {isPendingNotes ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            ) : note ? (
              <p
                className="text-muted-foreground leading-relaxed whitespace-pre-wrap cursor-pointer rounded-lg p-3 -m-3 transition-colors hover:bg-accent/50"
                onClick={() => {
                  onSetDraftNote(note);
                  onSetIsEditingNote(true);
                }}
              >
                {note}
              </p>
            ) : (
              <p
                className="text-muted-foreground/50 italic cursor-pointer rounded-lg p-3 -m-3 transition-colors hover:bg-accent/50"
                onClick={() => {
                  onSetDraftNote("");
                  onSetIsEditingNote(true);
                }}
              >
                Click to add your thoughts, quotes, or reflections...
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
