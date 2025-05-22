
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface FormDialogProps {
  title: string;
  description?: string;
  trigger: React.ReactNode;
  form: React.ReactNode;
  submitLabel?: string;
  onSubmit: () => void;
  isSubmitting?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function FormDialog({
  title,
  description,
  trigger,
  form,
  submitLabel = "Save",
  onSubmit,
  isSubmitting = false,
  isOpen,
  onOpenChange,
}: FormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </div>
          
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
}
