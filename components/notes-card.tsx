"use client";

import { useActionState, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { addUnitNote, deleteUnitNote } from "@/lib/actions/unit-actions";
import { addTenantNote, deleteTenantNote } from "@/lib/actions/tenant-actions";
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

type NotesProps = {
  notes: string[];
  id: string;
  model: "unit" | "tenant";
};

type NoteProps = {
  note: string;
  index: number;
  notes: string[];
  id: string;
  model: "unit" | "tenant";
};

const Note = ({ note, index, notes, id, model }: NoteProps) => {
  const [pending, setPending] = useState<boolean>(false);

  const action = {
    unit: () => deleteUnitNote(id, index, notes),
    tenant: () => deleteTenantNote(id, index, notes),
  };

  const handleDelete = async () => {
    try {
      setPending(true);
      const res = await action[model]();
      if (res.success) {
        //do something
      } else {
        // do something
      }
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
        "flex items-start p-2 hover:bg-muted rounded-sm"
      )}
    >
      <p className="flex-1">{`- ${note}`}</p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={pending}
            className="ml-2 mt-1 bg-transparent p-0 h-4 w-4 shadow-none text-primary hover:text-primary-foreground"
          >
            <RiDeleteBin5Fill className="h-4 w-4" />
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
  const getAction = () => {
    return model === "unit" ? addUnitNote : addTenantNote;
  };

  const [state, action, isPending] = useActionState(getAction(), {
    message: "",
  });

  return (
    <Card className={cn(model === "unit" ? "lg:col-span-2" : "xl:col-span-3")}>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 gap-5">
        <form action={action}>
          <input type="hidden" name="id" value={id} />
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
        <ul className="max-h-52 overflow-y-auto p-2 border rounded-sm shadow-sm text-sm">
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
            <p className="text-sm text-muted-foreground">
              No notes available...
            </p>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};
