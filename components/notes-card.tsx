"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { addNote, deleteNote } from "@/lib/actions/actions";

type NotesProps = {
  notes: string[];
  id: string;
  model: "unit" | "tenant" | "property";
};

type NoteProps = {
  note: string;
  index: number;
  notes: string[];
  id: string;
  model: "unit" | "tenant" | "property";
};

const Note = ({ note, index, notes, id, model }: NoteProps) => {
  const [pending, setPending] = useState<boolean>(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setPending(true);
      const res = await deleteNote({ id, index, notes, model });

      toast({
        title: res.message,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div
      className={cn(
        pending && "text-muted-foreground",
        "flex items-start hover:bg-muted px-4"
      )}
    >
      <p className="flex-1">{`- ${note}`}</p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-lg"
            disabled={pending}
          >
            <RiDeleteBin5Fill />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this note?</AlertDialogTitle>
            <AlertDialogDescription>{note}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const Notes = ({ notes, id, model }: NotesProps) => {
  const [state, action, isPending] = useActionState(addNote, {
    success: false,
    message: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: state.message,
      });
    }
    state.success = false;
  }, [state.success, toast]);

  return (
    <Card
      className={cn(model === "tenant" ? "xl:col-span-3" : "lg:col-span-2")}
    >
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 gap-5">
        <form action={action}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="model" value={model} />
          <Textarea
            name="note"
            disabled={isPending}
            defaultValue={state.fields?.note || ""}
            placeholder="Add a note..."
            className="resize-none lg:h-52"
          />
          <div className="flex justify-end mt-2">
            <Button size="sm" disabled={isPending}>
              Add Note
            </Button>
          </div>
        </form>
        <ul className="h-52 overflow-y-auto py-2 border rounded-sm shadow-sm">
          {notes.length ? (
            notes.map((note, i) => (
              <li key={i}>
                <Note
                  note={note}
                  index={i}
                  notes={notes}
                  id={id}
                  model={model}
                />
              </li>
            ))
          ) : (
            <p className="text-sm text-muted-foreground pl-5">
              No notes available...
            </p>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};
