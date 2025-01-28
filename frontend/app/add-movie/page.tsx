"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiBaseUrl } from "@/components/const";
import axios from "axios";

export default function AddMovie() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    poster: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.year || !formData.poster) {
      toast({
        title: "Validation Error",
        description: "All fields are required!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token) {
        throw new Error("Authorization token is missing. Please log in.");
      }

      const uploadPayload = new FormData();
      uploadPayload.append("image", formData.poster);
      uploadPayload.append("text", "Movie poster upload");

      const uploadResponse = await axios.post(
        "http://localhost:8000/api/uploads",
        uploadPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const posterUrl = uploadResponse.data.image;

      const payload = {
        title: formData.title,
        year: formData.year,
        userId,
        poster: posterUrl,
        user: "",
      };

      await axios.post(`${apiBaseUrl}/api/movies`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Success!",
        description: "Movie created successfully.",
      });

      router.push("/movies");
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          error.message ||
          "An error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-[#022c40] px-8 pt-24">
      <div className="max-w-4xl w-full p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Create a new movie
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-[10rem] h-[50vh]"
        >
          <div className="w-[130%] border border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center p-6 bg-[#1e4254]">
            <Upload className="h-12 w-12 text-white/60 mb-4" />
            <p className="text-white/60">Drop an image here</p>
            <div className="mt-4">
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
            </div>
          </div>

          {/* Right Section: Form Inputs */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-white">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="bg-white/10 border-white/20 mt-2 text-white"
              />
            </div>
            <div>
              <Label htmlFor="year" className="text-white">
                Publishing year
              </Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="bg-white/10 border-white/20 mt-2 text-white w-[50%]"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/movies")}
                className="border-white/20 hover:bg-white/10 text-white bg-[hsl(199.05deg 96.92% 12.75%)] px-8"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="hover:bg-emerald-600 px-8 text-[#fff] bg-[#06b006]"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
