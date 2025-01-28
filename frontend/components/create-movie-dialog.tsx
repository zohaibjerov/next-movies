"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface CreateMovieDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateMovieDialog({ open, onOpenChange }: CreateMovieDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    poster: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement movie creation
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#003049] border-white/20">
        <DialogHeader>
          <DialogTitle>Create a new movie</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white/10 border-white/20"
              />
            </div>
            <div>
              <Label htmlFor="year">Publishing year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="bg-white/10 border-white/20"
              />
            </div>
            <div>
              <Label>Poster</Label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/20 px-6 py-10">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-white/60" />
                  <div className="mt-4 flex text-sm leading-6">
                    <label
                      htmlFor="poster-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 hover:text-emerald-600"
                    >
                      <span>Upload a file</span>
                      <input
                        id="poster-upload"
                        name="poster-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormData({ ...formData, poster: file });
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1 text-white/60">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-white/60">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/20 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}